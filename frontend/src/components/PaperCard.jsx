import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Bookmark, Eye, MessageCircle, Share, ExternalLink } from 'lucide-react';
import { mockPapers } from '../mock/mockData';

const PaperCard = ({ paper, onLike, onBookmark, onView, onChat, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(paper.id);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    onBookmark(paper.id);
  };

  const handleChat = (e) => {
    e.stopPropagation();
    onChat(paper.id);
  };

  const handleView = () => {
    onView(paper.id);
  };

  return (
    <Card 
      className={`w-full bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 ${
        compact ? 'mb-4' : 'mb-6'
      }`}
      onClick={handleView}
    >
      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 leading-tight ${
              compact ? 'text-base' : 'text-lg'
            }`}>
              {paper.title}
            </h3>
            <p className={`text-gray-600 mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
              {paper.authors.join(', ')}
            </p>
            <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'} mt-1`}>
              {formatDate(paper.published)} • {paper.journal_ref || 'arXiv preprint'}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Badge variant="outline" className="text-xs">
              Score: {paper.score.toFixed(2)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className={compact ? 'pt-0' : 'pt-2'}>
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {paper.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        {/* Abstract */}
        <div className="mb-4">
          <p className={`text-gray-700 leading-relaxed ${compact ? 'text-sm' : 'text-base'}`}>
            {isExpanded || compact ? 
              paper.abstract : 
              truncateText(paper.abstract, 200)
            }
          </p>
          {!compact && paper.abstract.length > 200 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Summary */}
        {paper.summary && !compact && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-blue-900 text-sm mb-1">AI Summary</h4>
            <p className="text-blue-800 text-sm leading-relaxed">{paper.summary}</p>
          </div>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{paper.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{paper.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bookmark size={16} />
              <span>{paper.bookmarks}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover:bg-red-50 ${paper.isLiked ? 'text-red-600' : 'text-gray-600'}`}
            >
              <Heart 
                size={16} 
                className={paper.isLiked ? 'fill-current' : ''} 
              />
            </Button>
            
            <Button
              variant="ghost"
              size="sm" 
              onClick={handleBookmark}
              className={`hover:bg-blue-50 ${paper.isBookmarked ? 'text-blue-600' : 'text-gray-600'}`}
            >
              <Bookmark 
                size={16}
                className={paper.isBookmarked ? 'fill-current' : ''}
              />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChat}
              className="hover:bg-green-50 text-gray-600"
            >
              <MessageCircle size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://arxiv.org/abs/${paper.arxiv_id}`, '_blank');
              }}
              className="hover:bg-gray-50 text-gray-600"
            >
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaperCard;