import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (path: string) => void;
  matchFound: boolean | null;
}

const SearchBar = ({ onSearch, matchFound }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="$.user.address.city or items[0].name"
          className="w-full px-4 py-2 pr-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Search
      </button>
            {matchFound !== null && (
        <div
          className={`px-4 py-2 rounded-lg font-medium ${
            matchFound
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {matchFound ? 'Match found' : 'No match found'}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
