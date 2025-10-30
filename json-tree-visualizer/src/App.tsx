import { useState } from 'react';
import JSONInput from './components/JSONInput';
import type { TreeNode } from './types';
import { parseJSON } from './utils/jsonParser';

function App() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [showInput, setShowInput] = useState(true);

  const handleGenerate = (data: any) => {
    const tree = parseJSON(data);
    setTreeData(tree);
    setShowInput(false);
  };

  const handleClear = () => {
    setTreeData(null);
    setShowInput(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          JSON Tree Visualizer
        </h1>

        {showInput && (
          <div className="flex justify-center">
            <JSONInput onGenerate={handleGenerate} onClear={handleClear} />
          </div>
        )}

        {!showInput && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>JSON parsed successfully!</p>
           
            <button
              onClick={() => setShowInput(true)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Edit JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
