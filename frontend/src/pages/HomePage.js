import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar'
import PaperCard from '../components/PaperCard';

import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, TrendingUp, Filter } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const HomePage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'trending', 'interests'

  

  const handleLike = (paperId, liked) => {
    setPapers(prev => prev.map(paper => 
      paper.id === paperId 
        ? { ...paper, isLiked: liked, likes: liked ? paper.likes + 1 : paper.likes - 1 }
        : paper
    ));
  };

  const FilterButtons = () => (
    <div className="flex space-x-2 mb-6">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('all')}
        className="flex items-center space-x-2"
      >
        <Filter size={16} />
        <span>All Papers</span>
      </Button>
      <Button
        variant={filter === 'trending' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('trending')}
        className="flex items-center space-x-2"
      >
        <TrendingUp size={16} />
        <span>Trending</span>
      </Button>
      <Button
        variant={filter === 'interests' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('interests')}
        className="flex items-center space-x-2"
      >
        <Sparkles size={16} />
        <span>For You</span>
      </Button>
    </div>
  );

  const UserInterestsCard = () => (
    <Card className="mb-6 bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="text-slate-600" size={20} />
          <h3 className="font-semibold text-gray-900">Your Interests</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {mockUserProfile.interests.map((interest) => (
            <Badge 
              key={interest} 
              variant="secondary" 
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {interest}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Papers are personalized based on your research interests and reading history.
        </p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {mockUserProfile.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Discover the latest research papers tailored to your interests.
          </p>
        </div>

        {/* User Interests */}
        <UserInterestsCard />

        {/* Filter Buttons */}
        <FilterButtons />

        {/* Papers Feed */}
        <div className="space-y-6">
          {papers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or check back later for new papers.
                </p>
              </CardContent>
            </Card>
          ) : (
            papers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onLike={handleLike}
              />
            ))
          )}
        </div>

        {/* Load More Button */}
        {papers.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              Load More Papers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;