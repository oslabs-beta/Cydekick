import React from "react";
import ReactFlow, { Controls, ControlButton } from "react-flow-renderer";

import "react-flow-renderer/dist/style.css";

import "../../../tailwind.config";
import CustomNode from "./HtmlCustomNode";

const nodeTypes = {
  custom: CustomNode,
};

type HtmlFlowProps = {
  flowToggle:()=>void;
  onComponentFlow:boolean;
  data:string;
  currentHTML:string;
  setCurrentHTML:React.Dispatch<React.SetStateAction<string>>;
  currentTestId:string;
  setCurrentTestId:React.Dispatch<React.SetStateAction<string>>;
};

type NodeType = {
  id:string;
  type:string;
  data: {
    name:string;
    attributes:any;
    setCurrentHTML:React.Dispatch<React.SetStateAction<string>>;
    setCurrentTestId:React.Dispatch<React.SetStateAction<string>>;
    isSelected:boolean;
  }
  position: {x:number, y:number}
}

type EdgeType = {
  id:string;
  target:string;
  source:string;
}

const HtmlFlow = ({ flowToggle, onComponentFlow, data, currentHTML, setCurrentHTML, setCurrentTestId, currentTestId }:HtmlFlowProps) => {
  
  const [edges, setEdges] = React.useState([]);
  const [nodes, setNodes] = React.useState([]);
  
  React.useEffect(() => {
    const parsedHtml = new DOMParser().parseFromString(data, "text/html");
      let counter = 0;
      const nodesArr:NodeType[] = [];
      const edgesArr:EdgeType[] = [];
      let maxDepth = 0;

      const createNodeFromElement = (
        element:any,
        depth: number,
        parent: any = null
      ) => {
        if (depth > maxDepth) maxDepth = depth;
        const node = {
          id: `node-${counter++}`,
          type: "custom",
          data: {
            name: element.nodeName,
            attributes: element.attributes,
            setCurrentHTML: setCurrentHTML,
            setCurrentTestId: setCurrentTestId,
            isSelected: false
          },
          position: { x: 0, y: depth * 150 },
        };
        if (parent) {
          const edge = {
            id: `${parent.id}-${node.id}`,
            source: parent.id,
            target: node.id,
          };
          edgesArr.push(edge);
        }
        nodesArr.push(node);
        return node;
      };

      const connectParentToChildren = (
        element:any,
        depth: number,
        parent: any = null
      ) => {
        const node = createNodeFromElement(element, depth, parent);
        const children = Array.from(element.children);
        children.forEach((childElement) => {
          // Recursively connect the child's children
          connectParentToChildren(childElement, depth + 1, node);
        });
      };

      connectParentToChildren(parsedHtml.body, 0);
      // depth is correct, need to fix horizonatl positioning of the nodes arr.
      const newNodesArr = [];
      for (let i = 0; i <= maxDepth; i++) {
        // grab all nodes on the same y level;
        const temp:NodeType[] = nodesArr.filter((el) => el.position.y === i * 150);
        if (temp.length !== 0) {
          const totalWidth = temp.length * 300; // Assuming node width is 176px
          // Calculate the initial x position for the first node
          const initialX = -totalWidth / 2;
          // Calculate the spacing between nodes
          const spacingX = 300; // Assuming node width is 176px
          temp.forEach((node, index) => {
            const newX = initialX + index * spacingX;
            node.position.x = newX;
          });
          newNodesArr.push(...temp);
        }
      }
      setNodes(newNodesArr);
      setEdges(edgesArr);
  }, [data]);
  React.useEffect(() => {
    const temp:NodeType[] = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isSelected: (
          currentHTML === node.data.name &&
          (
            (node.data.attributes["id"] && currentTestId === `id = ${node.data.attributes["id"].value}`) ||
            (node.data.attributes["data-cy"] && currentTestId === `data-cy = ${node.data.attributes["data-cy"].value}`)
          )
        )
      }
    }));
    setNodes(temp);
  }, [currentHTML, currentTestId]);

  return (
    <div className={`relative w-1/2 p-2 ${onComponentFlow ? "hidden" : ""} z-0`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
      >
        <Controls>
        <ControlButton
          onClick={flowToggle}
          style={{ fontSize: '10px' }}
        >
          COMP
        </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default HtmlFlow;
