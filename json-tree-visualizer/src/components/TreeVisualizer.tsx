import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import type { TreeNode } from '../types';
import { convertToReactFlow } from '../utils/treeLayout';
import type { Node } from 'reactflow';

interface TreeVisualizerProps {
  treeData: TreeNode | null;
  highlightedNodeId?: string;
}

const nodeTypes = {
  custom: CustomNode
};

const TreeVisualizerContent = ({ treeData, highlightedNodeId }: TreeVisualizerProps) => {
  const { fitView, setCenter } = useReactFlow();

  const { nodes, edges } = useMemo(
    () => convertToReactFlow(treeData, highlightedNodeId),
    [treeData, highlightedNodeId]
  );

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
    }
  }, [nodes, fitView]);

  useEffect(() => {
    if (highlightedNodeId) {
      const highlightedNode = nodes.find(n => n.id === highlightedNodeId);
      if (highlightedNode) {
        setTimeout(() => {
          setCenter(highlightedNode.position.x, highlightedNode.position.y, {
            zoom: 1,
            duration: 800
          });
        }, 100);
      }
    }
  }, [highlightedNodeId, nodes, setCenter]);

  const onInit = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);

  if (!treeData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Generate a tree to visualize JSON structure
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      fitView
      minZoom={0.1}
      maxZoom={2}
      defaultEdgeOptions={{
        type: 'smoothstep',
        animated: false
      }}
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor={(node: Node) => {
          const nodeType = node.data.nodeType;
          switch (nodeType) {
            case 'object':
              return '#3b82f6';
            case 'array':
              return '#10b981';
            case 'primitive':
              return '#f59e0b';
            default:
              return '#6b7280';
          }
        }}
        className="dark:bg-gray-800"
      />
    </ReactFlow>
  );
};

const TreeVisualizer = (props: TreeVisualizerProps) => {
  return (
    <ReactFlowProvider>
      <TreeVisualizerContent {...props} />
    </ReactFlowProvider>
  );
};

export default TreeVisualizer;
