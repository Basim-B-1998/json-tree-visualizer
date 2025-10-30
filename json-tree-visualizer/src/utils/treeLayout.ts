import type { Node, Edge } from 'reactflow';
import type { TreeNode } from '../types';

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 100;

interface LayoutNode {
  node: TreeNode;
  x: number;
  y: number;
  width: number;
}

const calculateSubtreeWidth = (node: TreeNode): number => {
  if (!node.children || node.children.length === 0) {
    return HORIZONTAL_SPACING;
  }

  return node.children.reduce((sum, child) => sum + calculateSubtreeWidth(child), 0);
};

const layoutTree = (
  node: TreeNode,
  x: number,
  y: number,
  result: LayoutNode[]
): void => {
  result.push({ node, x, y, width: calculateSubtreeWidth(node) });

  if (node.children && node.children.length > 0) {
    let currentX = x - calculateSubtreeWidth(node) / 2;

    node.children.forEach((child) => {
      const childWidth = calculateSubtreeWidth(child);
      layoutTree(child, currentX + childWidth / 2, y + VERTICAL_SPACING, result);
      currentX += childWidth;
    });
  }
};

export const convertToReactFlow = (
  root: TreeNode | null,
  highlightedNodeId?: string
): { nodes: Node[]; edges: Edge[] } => {
  if (!root) return { nodes: [], edges: [] };

  const layoutNodes: LayoutNode[] = [];
  layoutTree(root, 0, 0, layoutNodes);

  const nodes: Node[] = layoutNodes.map(({ node, x, y }) => ({
    id: node.id,
    type: 'custom',
    position: { x, y },
    data: {
      label: node.label,
      nodeType: node.type,
      value: node.value,
      path: node.path,
      isHighlighted: node.id === highlightedNodeId
    }
  }));

  const edges: Edge[] = [];
  const addEdges = (node: TreeNode) => {
    if (node.children) {
      node.children.forEach((child) => {
        edges.push({
          id: `${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          type: 'smoothstep',
          animated: false
        });
        addEdges(child);
      });
    }
  };

  addEdges(root);

  return { nodes, edges };
};
