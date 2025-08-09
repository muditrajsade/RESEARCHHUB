import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, TrendingUp, Clock, Star, Filter } from 'lucide-react';
import SearchBar from './SearchBar';
import PaperCard from './PaperCard';
import { mockPapers, mockTrendingTopics, mockSearchHistory } from '../mock/mockData';
import PaperDetailPage from '@/pages/PaperDetailPage';

const SearchView = ({ onPaperLike, onPaperBookmark, onPaperView, onPaperChat }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('auto');
  const [hasSearched, setHasSearched] = useState(false);

  let [load,set_load] = useState(0);
  let [item,set_item] = useState(null);

  const handleSearch = async (query, mode) => {
    setIsSearching(true);
    setSearchQuery(query);
    setSearchMode(mode);
    setHasSearched(true);

    // Simulate search API call
    
      // Mock search results based on query
      const results = mockPapers.filter(paper => 
        paper.title.toLowerCase().includes(query.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(query.toLowerCase()) ||
        paper.authors.some(author => author.toLowerCase().includes(query.toLowerCase())) ||
        paper.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );

      let rfd = await fetch('http://localhost:8000/auto-search',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      });
      let data = await rfd.json();
      let rfs = data.results;
    

    console.log(rfs);
      
      // Add relevance scores based on search mode
      let plm = [];
      for(let j = 0;j<rfs.length;j++){
        let rft = rfs[j];
        let rf = rft.metadata;
        if( rf != null){
          let title = rf.title;
          let abstract = rf.abstract;
          let pl = {title:title,abstract:abstract,id:rft.arxiv_id,authors:rf.authors,categories:rf.categories,score:rft.score,published:rf.published};
          plm.push(pl);
        }
      }
      
      setSearchResults(plm);
      setIsSearching(false);
    
  };

  const handleFilterChange = (filters) => {
    setSearchMode(filters.searchMode);
  };

  const front = (item)=>{
    set_load(1);
    set_item(item);
  }

  const back = ()=>{
    set_load(0);
    set_item(null);
  }

  if(load == 1){

    return (
      <PaperDetailPage paperd={item} f={back} />
    );

  }

  const SearchResults = () => (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results for "{searchQuery}"
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Found {searchResults.length} papers using {searchMode} search
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {searchResults.length} results
        </Badge>
      </div>
      
      {searchResults.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or using a different search mode.
          </p>
        </Card>
      ) : (
        searchResults.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            onLike={onPaperLike}
            onBookmark={onPaperBookmark}
            onView={onPaperView}
            onChat={onPaperChat}
            
            b={front}
          />
        ))
      )}
    </div>
  );

  const LoadingResults = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Searching for "{searchQuery}"...
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Using {searchMode} search mode
          </p>
        </div>
      </div>
      
      {/* Loading skeletons */}
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Research Papers
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search through millions of research papers using AI-powered semantic search, 
          title matching, or personalized recommendations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          searchMode={searchMode}
        />
      </div>

      {/* Search Content */}
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-6">
          {isSearching ? (
            <LoadingResults />
          ) : hasSearched ? (
            <SearchResults />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Search Categories */}
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp size={20} className="mr-2 text-blue-600" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockTrendingTopics.slice(0, 3).map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(topic.topic, 'auto')}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{topic.topic}</span>
                          <Badge variant="secondary" className="text-xs">
                            {topic.papers}
                          </Badge>
                        </div>
                        <span className="text-xs text-green-600">{topic.growth}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Star size={20} className="mr-2 text-yellow-600" />
                    Popular Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['cs.AI', 'cs.LG', 'cs.CV', 'cs.CL', 'stat.ML'].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleSearch(category, 'auto')}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <Badge variant="outline" className="text-sm">
                          {category}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock size={20} className="mr-2 text-gray-600" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockSearchHistory.slice(0, 4).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search, 'auto')}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors text-sm text-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Trending Papers</h3>
            {mockPapers
              .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
              .slice(0, 5)
              .map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  onLike={onPaperLike}
                  onBookmark={onPaperBookmark}
                  onView={onPaperView}
                  onChat={onPaperChat}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Search History</h3>
            {mockSearchHistory.map((search, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{search}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSearch(search, 'auto')}
                    >
                      Search Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter size={20} className="mr-2" />
                Advanced Search Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
                <p className="text-gray-600">
                  Advanced filtering by date ranges, citation counts, journals, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchView;