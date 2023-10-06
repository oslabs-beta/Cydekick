import React from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";
import dagre from "@dagrejs/dagre";
import { Tree as TreeType } from "../../types/Tree";

import "react-flow-renderer/dist/style.css";

import "../../../tailwind.config";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

type FlowProps = {
  fileTree: TreeType;
  currentComponent: TreeType,
  setCurrentComponent: React.Dispatch<React.SetStateAction<TreeType>>
  onComponentFlow: boolean
};

const Flow = ({ onComponentFlow, fileTree, currentComponent, setCurrentComponent}: FlowProps) => {
  const nodesArr = [];
  const edgesArr = [];

  (function treeParser(tree: TreeType) {
    if (!tree.reactRouter && !tree.reduxConnect) {
      nodesArr.push({
        id: tree.name,
        type: "custom",
        data: {
          name: tree.name,
          testid: tree.htmlChildrenTestIds,
          props: tree.props,
          filePath: tree.filePath,
          setCurrentComponent: setCurrentComponent,
          nodeData: tree,
          isSelected:false,
        },
        position: { x: 0, y: 0 },
      });
      if (tree.parentList.length > 0) {
        // find the name of the first parent in the list
        // find the index in the ndoes Arr whos data.filePath === tree.parentList[0]
        const index = nodesArr.findIndex(
          (node) => node.data.filePath === tree.parentList[0]
        );
        if (index !== -1) {
          edgesArr.push({
            id: `${tree.name}-${nodesArr[index].id}`,
            target: tree.name,
            source: nodesArr[index].id,
          });
        }
      }
    }
    if (tree.children.length > 0)
      tree.children.forEach((child) => treeParser(child));
  })(fileTree);

  React.useEffect(() => {
    nodes.forEach((node) =>{
      if (node.data.nodeData === currentComponent) node.data.isSelected = true;
      else node.data.isSelected = false;
    })
  }, [currentComponent])




  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 176;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = direction === "TB" ? "top" : "left"; // Swap 'top' and 'left'
      node.sourcePosition = direction === "TB" ? "bottom" : "right"; // Swap 'bottom' and 'right'

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodesArr,
    edgesArr
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div className={`h-1/2 ${onComponentFlow ? '' : 'hidden'}`}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            key: node.id, // Use the node's ID as the key prop
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-teal-50"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
