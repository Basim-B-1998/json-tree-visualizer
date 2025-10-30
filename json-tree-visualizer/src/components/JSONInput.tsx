import { useState } from 'react';

interface JSONInputProps {
  onGenerate: (data: any) => void;
  onClear: () => void;
}

const sampleJSON = {
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    { "name": "item1" },
    { "name": "item2" }
  ]
};

const JSONInput = ({ onGenerate,onClear }: JSONInputProps) => {
  const [input, setInput] = useState(JSON.stringify(sampleJSON, null, 2));
  const [error, setError] = useState('');

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(input);
      setError('');
      onGenerate(parsed);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

const handleClear = () => {
    setInput('');
    setError('');
    onClear();
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
          Paste or type JSON data
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter JSON here..."
        />
      </div>
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default JSONInput;
