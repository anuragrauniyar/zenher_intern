import React from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles, topics..."
        className="border p-2 rounded w-full"
      />
      {value && (
        <button onClick={onClear} className="px-3 py-2 bg-gray-200 rounded">
          Clear
        </button>
      )}
    </div>
  );
};