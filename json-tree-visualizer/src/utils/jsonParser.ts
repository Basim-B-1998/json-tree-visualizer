import type { TreeNode, NodeType } from '../types';

export const parseJSON = (data: any, path: string = '$', key?: string): TreeNode | null => {
  if (data === null || data === undefined) {
    return {
      id: path,
      type: 'primitive',
      label: key ? `${key}: null` : 'null',
      value: null,
      path,
      children: []
    };
  }

 const type: NodeType =
  Array.isArray(data)
    ? 'array'
    : typeof data === 'object'
    ? 'object'
    : 'primitive';


  if (type === 'primitive') {
    return {
      id: path,
      type,
      label: key ? `${key}: ${JSON.stringify(data)}` : JSON.stringify(data),
      value: data,
      path,
      children: []
    };
  }

  if (type === 'array') {
    const children: TreeNode[] = [];
    data.forEach((item: any, index: number) => {
      const childPath = `${path}[${index}]`;
      const childNode = parseJSON(item, childPath, `[${index}]`);
      if (childNode) children.push(childNode);
    });

    return {
      id: path,
      type,
      label: key || `Array[${data.length}]`,
      value: data,
      path,
      children
    };
  }

  if (type === 'object') {
    const children: TreeNode[] = [];
    Object.entries(data).forEach(([k, v]) => {
      const childPath = path === '$' ? `$.${k}` : `${path}.${k}`;
      const childNode = parseJSON(v, childPath, k);
      if (childNode) children.push(childNode);
    });

    return {
      id: path,
      type,
      label: key || 'Object',
      value: data,
      path,
      children
    };
  }

  return null;
};