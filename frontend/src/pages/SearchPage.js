import React, { useState, useEffect } from 'react';
import { Search, Filter, SortDesc, X } from 'lucide-react';

import PaperCard from '../components/PaperCard';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [...new Set(mockPapers.flatMap(paper => paper.categories))];
  const recentSearches = mockUserProfile.recent_searches;

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [searchQuery, sortBy, selectedCategories]);

  const performSearch = () => {
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      let filteredResults = mockPapers.filter(paper => {
        const matchesQuery = 
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          paper.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategories = selectedCategories.length === 0 || 
          paper.categories.some(cat => selectedCategories.includes(cat));
        
        return matchesQuery && matchesCategories;
      });

      // Sort results
      if (sortBy === 'relevance') {
        filteredResults.sort((a, b) => b.score - a.score);
      } else if (sortBy === 'date') {
        filteredResults.sort((a, b) => new Date(b.published) - new Date(a.published));
      } else if (sortBy === 'popularity') {
        filteredResults.sort((a, b) => b.likes - a.likes);
      }

      setResults(filteredResults);
      setLoading(false);
    }, 100);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy('relevance');
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Research Papers</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search papers, authors, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-slate-400 rounded-lg"
            />
          </div>

          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Recent Searches</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleRecentSearchClick(query)}
                    className="text-gray-700 hover:bg-slate-50"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter size={16} />
                <span>Filters</span>
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SortDesc size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Latest</SelectItem>
                  <SelectItem value="popularity">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(selectedCategories.length > 0 || sortBy !== 'relevance') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} className="mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6 border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Filter by Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                      className="text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Results Column */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchQuery && results.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
                  <p className="text-gray-600">
                    Try different keywords or adjust your filters.
                  </p>
                </CardContent>
              </Card>
            ) : searchQuery ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Found {results.length} papers for "{searchQuery}"
                  </p>
                </div>
                {results.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onLike={(paperId, liked) => {
                      setResults(prev => prev.map(p => 
                        p.id === paperId 
                          ? { ...p, isLiked: liked, likes: liked ? p.likes + 1 : p.likes - 1 }
                          : p
                      ));
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
                  <p className="text-gray-600">
                    Enter keywords, author names, or topics to find relevant research papers.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Interests</h3>
                <div className="space-y-2">
                  {mockUserProfile.interests.map((interest) => (
                    <Button
                      key={interest}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery(interest.toLowerCase())}
                      className="w-full justify-start text-sm text-gray-700 hover:bg-slate-50"
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;