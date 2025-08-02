import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, X, Clock, TrendingUp, Filter } from 'lucide-react';
import { mockSearchHistory, mockTrendingTopics } from '../mock/mockData';

const SearchBar = ({ onSearch, onFilterChange, searchMode = "auto" }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMode, setSelectedMode] = useState(searchMode);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), selectedMode);
      setShowSuggestions(false);
      setIsExpanded(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion, selectedMode);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onFilterChange({ searchMode: mode });
  };

  const searchModes = [
    { value: "auto", label: "Auto", description: "Smart search selection" },
    { value: "semantic", label: "Semantic", description: "Meaning-based search" },
    { value: "title", label: "Title", description: "Title matching" },
    { value: "personalized", label: "Personal", description: "Based on your interests" }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-300 ${
          isExpanded ? 'transform scale-105' : ''
        }`}>
          <div className="relative flex-1">
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search research papers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              className="pl-12 pr-12 h-12 text-lg bg-white border-2 border-gray-200 focus:border-blue-500 rounded-full shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <Button 
            type="submit"
            size="lg"
            className="ml-3 h-12 px-6 rounded-full bg-blue-600 hover:bg-blue-700"
          >
            Search
          </Button>
        </div>

        {/* Search Mode Selector */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          {searchModes.map((mode) => (
            <Button
              key={mode.value}
              type="button"
              variant={selectedMode === mode.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange(mode.value)}
              className={`text-xs ${
                selectedMode === mode.value 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white border shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            {/* Recent Searches */}
            {mockSearchHistory.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                </div>
                <div className="space-y-2">
                  {mockSearchHistory.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Topics */}
            <div>
              <div className="flex items-center mb-3">
                <TrendingUp size={16} className="text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Trending Topics</span>
              </div>
              <div className="space-y-2">
                {mockTrendingTopics.slice(0, 4).map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(topic.topic)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <span>{topic.topic}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {topic.papers}
                      </Badge>
                      <span className="text-xs text-green-600 font-medium">
                        {topic.growth}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;