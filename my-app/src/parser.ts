import * as babelParser from "@babel/parser";
import * as fs from "fs";
import * as path from "path";
import { Tree } from "./types/Tree";
import { ImportObj } from "./types/ImportObj";
import { File } from "@babel/types";
import { getNonce } from "./getNonce";

export class Parser {
  entryFile: string;
  tree: Tree | undefined;

  constructor(filePath: string) {
    // Fix when selecting files in WSL file system
    this.entryFile = filePath;
    if (process.platform === "linux" && this.entryFile.includes("wsl$")) {
      this.entryFile = path.resolve(
        filePath.split(path.win32.sep).join(path.posix.sep)
      );
      this.entryFile = "/" + this.entryFile.split("/").slice(3).join("/");
      // Fix for when running WSL but selecting files held on Windows file system
    } else if (
      process.platform === "linux" &&
      /[a-zA-Z]/.test(this.entryFile[0])
    ) {
      const root = `/mnt/${this.entryFile[0].toLowerCase()}`;
      this.entryFile = path.join(
        root,
        filePath.split(path.win32.sep).slice(1).join(path.posix.sep)
      );
    }

    this.tree = undefined;
  }

  // Public method to generate component tree based on current entryFile
  public parse(): Tree {
    // Create root Tree node
    const root: Tree = {
      id: getNonce(),
      name: path.basename(this.entryFile).replace(/\.(t|j)sx?$/, ""),
      fileName: path.basename(this.entryFile),
      filePath: this.entryFile,
      importPath: "/", // this.entryFile here breaks windows file path on root e.g. C:\\ is detected as third party
      expanded: false,
      depth: 0,
      count: 1,
      thirdParty: false,
      reactRouter: false,
      reduxConnect: false,
      htmlChildrenTestIds: "",
      children: [],
      parentList: [],
      props: {},
      error: "",
    };

    this.tree = root;
    this.parser(root);
    return this.tree;
  }

  public getTree(): Tree {
    return this.tree!;
  }

  // Set Sapling Parser with a specific Data Tree (from workspace state)
  public setTree(tree: Tree): void {
    this.entryFile = tree.filePath;
    this.tree = tree;
  }

  public updateTree(filePath: string): Tree {
    let children: any[] = [];

    const getChildNodes = (node: Tree): void => {
      const { depth, filePath, expanded } = node;
      children.push({ depth, filePath, expanded });
    };

    const matchExpand = (node: Tree): void => {
      for (let i = 0; i < children.length; i += 1) {
        const oldNode = children[i];
        if (
          oldNode.depth === node.depth &&
          oldNode.filePath === node.filePath &&
          oldNode.expanded
        ) {
          node.expanded = true;
        }
      }
    };

    const callback = (node: Tree): void => {
      if (node.filePath === filePath) {
        node.children.forEach((child: Tree) => {
          this.traverseTree(getChildNodes, child);
        });

        const newNode = this.parser(node);

        this.traverseTree(matchExpand, newNode);

        children = [];
      }
    };

    this.traverseTree(callback, this.tree);

    return this.tree!;
  }

  // Traverses the tree and changes expanded property of node whose id matches provided id
  public toggleNode(id: string, expanded: boolean): Tree {
    const callback = (node: { id: string; expanded: boolean }) => {
      if (node.id === id) {
        node.expanded = expanded;
      }
    };

    this.traverseTree(callback, this.tree);

    return this.tree!;
  }

  // Traverses all nodes of the current component tree and applies callback to each node
  private traverseTree(
    callback: (node: Tree) => void,
    node: Tree | undefined = this.tree
  ): void {
    if (!node) {
      return;
    }

    callback(node);

    node.children.forEach((childNode) => {
      this.traverseTree(callback, childNode);
    });
  }

  // Recursively builds the React component tree structure starting from the root node
  private parser(componentTree: Tree): Tree | undefined {
    // If import is a node module, do not parse any deeper
    if (!["\\", "/", "."].includes(componentTree.importPath[0])) {
      componentTree.thirdParty = true;
      if (
        componentTree.fileName === "react-router-dom" ||
        componentTree.fileName === "react-router"
      ) {
        componentTree.reactRouter = true;
      }
      return;
    }

    // Check that file has a valid fileName/Path, if not found, add an error to the node and halt
    const fileName = this.getFileName(componentTree);
    if (!fileName) {
      componentTree.error = "File not found.";
      return;
    }

    // If the current node recursively calls itself, do not parse any deeper:
    if (componentTree.parentList.includes(componentTree.filePath)) {
      return;
    }

    // Create an abstract syntax tree of the current component tree file
    let ast: babelParser.ParseResult<File>;
    try {
      ast = babelParser.parse(
        fs.readFileSync(path.resolve(componentTree.filePath), "utf-8"),
        {
          sourceType: "module",
          tokens: true,
          plugins: ["jsx", "typescript"],
        }
      );
    } catch (err) {
      componentTree.error = "Error while processing this file/node";
      return componentTree;
    }

    // Find imports in the current file, then find child components in the current file
    const imports = this.getImports(ast.program.body);
    // Get any JSX Children of the current file:
    if (ast.tokens) {
      componentTree.htmlChildrenTestIds = this.findTestIds(
        ast.tokens,
        imports,
        componentTree
      );
    }
    if (ast.tokens) {
      componentTree.children = this.getJSXChildren(
        ast.tokens,
        imports,
        componentTree
      );
    }

    // Check if the current node is connected to the Redux store
    if (ast.tokens) {
      componentTree.reduxConnect = this.checkForRedux(ast.tokens, imports);
    }

    // Recursively parse all child components
    componentTree.children.forEach((child) => this.parser(child));
    return componentTree;
  }

  // Finds files where the import string does not include a file extension
  private getFileName(componentTree: Tree): string | undefined {
    const ext = path.extname(componentTree.filePath);
    let fileName: string | undefined = componentTree.fileName;

    if (!ext) {
      // Try and find a file extension that exists in the directory:
      const fileArray = fs.readdirSync(path.dirname(componentTree.filePath));
      const regEx = new RegExp(`${componentTree.fileName}.(j|t)sx?$`);
      fileName = fileArray.find((fileStr) => fileStr.match(regEx));
      fileName ? (componentTree.filePath += path.extname(fileName)) : null;
    }

    return fileName;
  }

  // Extracts Imports from the current file
  // const Page1 = lazy(() => import('./page1')); -> is parsed as 'ImportDeclaration'
  // import Page2 from './page2'; -> is parsed as 'VariableDeclaration'
  private getImports(body: { [key: string]: any }[]): ImportObj {
    const bodyImports = body.filter(
      (item) =>
        item.type === "ImportDeclaration" || item.type === "VariableDeclaration"
    );

    return bodyImports.reduce((accum, curr) => {
      // Import Declarations:
      if (curr.type === "ImportDeclaration") {
        curr.specifiers.forEach(
          (i: {
            local: { name: string | number };
            imported: { name: any };
          }) => {
            accum[i.local.name] = {
              importPath: curr.source.value,
              importName: i.imported ? i.imported.name : i.local.name,
            };
          }
        );
      }
      // Imports Inside Variable Declarations: // Not easy to deal with nested objects
      if (curr.type === "VariableDeclaration") {
        const importPath = this.findVarDecImports(curr.declarations[0]);
        if (importPath) {
          const importName = curr.declarations[0].id.name;
          accum[curr.declarations[0].id.name] = {
            importPath,
            importName,
          };
        }
      }
      return accum;
    }, {});
  }

  // Recursive helper method to find the import path in Variable Declaration
  private findVarDecImports(ast: { [key: string]: any }): string | boolean {
    // Base Case, find the import path in the variable declaration and return it,
    if (
      Object.prototype.hasOwnProperty.call(ast, "callee") &&
      ast.callee.type === "Import"
    ) {
      return ast.arguments[0].value;
    }

    // Otherwise look for imports in any other non-null/undefined objects in the tree:
    for (const key in ast) {
      if (
        Object.prototype.hasOwnProperty.call(ast, key) &&
        typeof ast[key] === "object" &&
        ast[key]
      ) {
        const importPath = this.findVarDecImports(ast[key]);
        if (importPath) {
          return importPath;
        }
      }
    }

    return false;
  }

  // Finds html components that have a test-id
  private findTestIds(
    astTokens: any[],
    importsObj: ImportObj,
    parentNode: Tree
  ): any {
    const childNodes: { [key: string]: Tree } = {};
    const props: { [key: string]: boolean } = {};
    let token: { [key: string]: any };
    const validTestId = [];
    const differentTestIds = ["data-cy", "data-test", "data-testid"];

    for (let i = 0; i < astTokens.length; i++) {
      if (
        astTokens[i].type.label === "jsxTagStart" &&
        astTokens[i + 1].type.label === "jsxName" &&
        !importsObj[astTokens[i + 1].value]
      ) {
        while (astTokens[i].type.label !== "jsxTagEnd") {
          if (
            astTokens[i].type.label === "jsxName" &&
            differentTestIds.includes(astTokens[i].value) &&
            astTokens[i + 1].value === "="
          ) {
            validTestId.push(
              `[${astTokens[i].value}${astTokens[i + 1].value}${
                astTokens[i + 2].value
              }]`
            );
          }
          i += 1;
        }
      }
    }
    return validTestId;
  }

  // Finds JSX React Components in the current file
  private getJSXChildren(
    astTokens: any[],
    importsObj: ImportObj,
    parentNode: Tree
  ): Tree[] {
    let childNodes: { [key: string]: Tree } = {};
    let props: { [key: string]: boolean } = {};
    let token: { [key: string]: any };

    for (let i = 0; i < astTokens.length; i++) {
      // Case for finding JSX tags eg <App .../>
      if (
        astTokens[i].type.label === "jsxTagStart" &&
        astTokens[i + 1].type.label === "jsxName" &&
        importsObj[astTokens[i + 1].value]
      ) {
        token = astTokens[i + 1];
        props = this.getJSXProps(astTokens, i + 2);
        childNodes = this.getChildNodes(
          importsObj,
          token,
          props,
          parentNode,
          childNodes
        );

        // Case for finding components passed in as props e.g. <Route component={App} />
      } else if (
        astTokens[i].type.label === "jsxName" &&
        (astTokens[i].value === "component" ||
          astTokens[i].value === "children") &&
        importsObj[astTokens[i + 3].value]
      ) {
        token = astTokens[i + 3];
        childNodes = this.getChildNodes(
          importsObj,
          token,
          props,
          parentNode,
          childNodes
        );
      }
    }

    return Object.values(childNodes);
  }

  private getChildNodes(
    imports: ImportObj,
    astToken: { [key: string]: any },
    props: { [key: string]: boolean },
    parent: Tree,
    children: { [key: string]: Tree }
  ): { [key: string]: Tree } {
    if (children[astToken.value]) {
      children[astToken.value].count += 1;
      children[astToken.value].props = {
        ...children[astToken.value].props,
        ...props,
      };
    } else {
      // Add tree node to childNodes if one does not exist
      children[astToken.value] = {
        id: getNonce(),
        name: imports[astToken.value]["importName"],
        fileName: path.basename(imports[astToken.value]["importPath"]),
        filePath: path.resolve(
          path.dirname(parent.filePath),
          imports[astToken.value]["importPath"]
        ),
        importPath: imports[astToken.value]["importPath"],
        expanded: false,
        depth: parent.depth + 1,
        thirdParty: false,
        reactRouter: false,
        reduxConnect: false,
        count: 1,
        htmlChildrenTestIds: "",
        props: props,
        children: [],
        parentList: [parent.filePath].concat(parent.parentList),
        error: "",
      };
    }

    return children;
  }

  // Extracts prop names from a JSX element
  private getJSXProps(
    astTokens: { [key: string]: any }[],
    j: number
  ): { [key: string]: boolean } {
    const props: any = {};
    while (astTokens[j].type.label !== "jsxTagEnd") {
      if (
        astTokens[j].type.label === "jsxName" &&
        astTokens[j + 1].value === "="
      ) {
        props[astTokens[j].value] = true;
      }
      j += 1;
    }
    return props;
  }

  // Checks if the current Node is connected to the React-Redux Store
  private checkForRedux(astTokens: any[], importsObj: ImportObj): boolean {
    // Check that react-redux is imported in this file (and we have a connect method or otherwise)
    let reduxImported = false;
    let connectAlias;
    Object.keys(importsObj).forEach((key) => {
      if (
        importsObj[key].importPath === "react-redux" &&
        importsObj[key].importName === "connect"
      ) {
        reduxImported = true;
        connectAlias = key;
      }
    });

    if (!reduxImported) {
      return false;
    }

    // Check that connect method is invoked and exported in the file
    for (let i = 0; i < astTokens.length; i += 1) {
      if (
        astTokens[i].type.label === "export" &&
        astTokens[i + 1].type.label === "default" &&
        astTokens[i + 2].value === connectAlias
      ) {
        return true;
      }
    }
    return false;
  }
}
