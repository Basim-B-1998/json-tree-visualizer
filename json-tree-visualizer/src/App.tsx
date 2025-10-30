import { useState } from 'react';
import JSONInput from './components/JSONInput';
import TreeVisualizer from './components/TreeVisualizer';
import type { TreeNode } from './types';
import { parseJSON } from './utils/jsonParser';

function App() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string>();
  const [showInput, setShowInput] = useState(true);

  const handleGenerate = (data: any) => {
    const tree = parseJSON(data);
    setTreeData(tree);
    setHighlightedNodeId(undefined);
    setShowInput(false);
  };

  const handleClear = () => {
    setTreeData(null);
    setHighlightedNodeId(undefined);
    setShowInput(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            JSON Tree Visualizer
          </h1>
        </div>

        {showInput && (
          <div className="mb-8 flex justify-center">
            <JSONInput onGenerate={handleGenerate} onClear={handleClear} />
          </div>
        )}

        {!showInput && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowInput(true)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Edit JSON
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] border border-gray-200 dark:border-gray-700">
              <TreeVisualizer treeData={treeData} highlightedNodeId={highlightedNodeId} />
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Legend:
              </h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-blue-900 dark:text-blue-100">Object</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-blue-900 dark:text-blue-100">Array</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-blue-900 dark:text-blue-100">Primitive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
                  <span className="text-blue-900 dark:text-blue-100">Highlighted</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
