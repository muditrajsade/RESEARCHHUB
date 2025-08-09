import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RefreshCw, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import PaperCard from './PaperCard';
import { mockPapers, mockUser, mockRecommendations } from '../mock/mockData';


const FeedView = ({ onPaperLike, onPaperBookmark, onPaperView, onPaperChat }) => {
  const [papers, setPapers] = useState(mockPapers);
  const [sortBy, setSortBy] = useState('relevance');
  const [feedType, setFeedType] = useState('personalized');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const sortPapers = (papers, sortType) => {
    const sorted = [...papers];
    switch (sortType) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.published) - new Date(a.published));
      case 'popular':
        return sorted.sort((a, b) => (b.likes + b.bookmarks) - (a.likes + a.bookmarks));
      case 'relevance':
        return sorted.sort((a, b) => b.score - a.score);
      default:
        return sorted;
    }
  };

  const filteredPapers = sortPapers(papers, sortBy);

  const RecommendationSection = ({ recommendation }) => {
    const recPapers = recommendation.papers.map(id => papers.find(p => p.id === id)).filter(Boolean);
    
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <Star size={20} className="mr-2 text-blue-600" />
              {recommendation.title}
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {recPapers.length} papers
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recPapers.slice(0, 2).map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onLike={onPaperLike}
                onBookmark={onPaperBookmark}
                onView={onPaperView}
                onChat={onPaperChat}
                compact={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Feed Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Research Feed</h2>
          <Badge variant="outline" className="text-sm">
            {filteredPapers.length} papers
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <Filter size={16} className="mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">
                <div className="flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Relevance
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center">
                  <Star size={16} className="mr-2" />
                  Popular
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Feed Type Tabs */}
      <Tabs value={feedType} onValueChange={setFeedType} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personalized">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="personalized" className="mt-6">
          {/* User's Interests Summary */}
          <Card className="mb-6 bg-gray-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Your Research Interests</h3>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Update
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(mockUser.subjects).map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-sm">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {mockRecommendations.map((recommendation, index) => (
            <RecommendationSection key={index} recommendation={recommendation} />
          ))}

          {/* Regular Feed */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Recommended Papers
            </h3>
            {filteredPapers.map((paper) => (
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

        <TabsContent value="following" className="mt-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Star size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Followed Authors Yet</h3>
            <p className="text-gray-600 mb-4">
              Start following your favorite researchers to see their latest papers here.
            </p>
            <Button variant="outline">Browse Authors</Button>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Latest Papers
            </h3>
            {sortPapers(papers, 'newest').map((paper) => (
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
      </Tabs>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Papers
        </Button>
      </div>
    </div>
  );
};

export default FeedView;