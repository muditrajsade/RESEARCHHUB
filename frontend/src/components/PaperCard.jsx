import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useNavigate , createSearchParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import PaperDetailPage from '@/pages/PaperDetailPage';
const PaperCard = ({ paper, onLike, onComment, b}) => {
  const [isLiked, setIsLiked] = useState(paper.isLiked);
  const [likesCount, setLikesCount] = useState(paper.likes);
  const navigate = useNavigate();
  const { toast } = useToast();
  

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    onLike && onLike(paper.id, newLikedState);
    
    toast({
      description: newLikedState ? "Paper liked!" : "Paper unliked",
      duration: 1500,
    });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/paper/${paper.id}`);
    toast({
      description: "Link copied to clipboard!",
      duration: 2000,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getAuthorInitials = (author) => {
    return author.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  

  

  

  return (
    <Card 
      className="mb-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white"
      onClick={()=> { 

        /*const query = createSearchParams({
      paper: JSON.stringify(paper)
    }).toString();

    navigate({
      pathname: '/paper',
      search: `?${query}`
    });*/
    b(paper);


    // ✅ Pass string with ?
    }}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-slate-800 text-white text-sm">
                {getAuthorInitials(paper.authors[0])}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{paper.authors[0]}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <Calendar size={14} />
                <span>{formatDate(paper.published)}</span>
                {paper.trending && (
                  <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                    Trending
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(paper.pdf_url, '_blank');
            }}
            className="text-gray-500 hover:text-slate-900"
          >
            <ExternalLink size={16} />
          </Button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-slate-700 transition-colors">
          {paper.title}
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {paper.categories.slice(0, 3).map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Tag size={12} className="mr-1" />
              {category}
            </Badge>
          ))}
          {paper.categories.length > 3 && (
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
              +{paper.categories.length - 3} more
            </Badge>
          )}
        </div>

        {/* Abstract Preview */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {paper.abstract.length > 280 
            ? `${paper.abstract.substring(0, 280)}...` 
            : paper.abstract
          }
        </p>

        {/* Summary */}
        {paper.summary && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4 border-l-4 border-slate-400">
            <p className="text-sm font-medium text-slate-700 mb-1">AI Summary</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {paper.summary.length > 200 
                ? `${paper.summary.substring(0, 200)}...` 
                : paper.summary
              }
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart 
                size={18} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span className="text-sm font-medium">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/paper/${paper.id}#comments`);
              }}
              className="flex items-center space-x-2 text-gray-500 hover:text-slate-900 transition-colors"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">{paper.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-500 hover:text-slate-900 transition-colors"
            >
              <Share2 size={18} />
              <span className="text-sm font-medium">Share</span>
            </Button>
          </div>

          <div className="text-xs text-gray-400">
            Score: {(paper.score * 100).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaperCard;