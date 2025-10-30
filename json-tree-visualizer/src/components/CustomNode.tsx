import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeType } from '../types';

interface CustomNodeProps {
  data: {
    label: string;
    nodeType: NodeType;
    value: any;
    path: string;
    isHighlighted: boolean;
  };
}

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const getNodeColor = () => {
    switch (data.nodeType) {
      case 'object':
        return 'bg-blue-500';
      case 'array':
        return 'bg-emerald-500';
      case 'primitive':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleClick = () => {
    navigator.clipboard.writeText(data.path)
      .then(() => {
        alert("Path copied to clipboard!"); 
      })
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Failed to copy path.");
      });
  };

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg shadow-lg border-2 cursor-pointer transition-all hover:scale-105 ${
        data.isHighlighted
          ? 'border-red-500 ring-4 ring-red-300'
          : 'border-white'
      } ${getNodeColor()} text-white font-medium min-w-[120px] text-center`}
      title={`Path: ${data.path}\nValue: ${JSON.stringify(data.value)}\nClick to copy path`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-sm">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
