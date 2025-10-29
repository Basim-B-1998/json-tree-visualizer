export type NodeType = 'object' | 'array' | 'primitive';

export interface TreeNode {
  id: string;
  type: NodeType;
  label: string;
  value?: any;
  path: string;
  children?: TreeNode[];
}
