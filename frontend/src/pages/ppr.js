import React, { useState, useEffect } from 'react';
import { useParams, useNavigate , useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, ExternalLink, Calendar, Tag, Send, Sparkles } from 'lucide-react';

import HorizontalScrollCards from './Horizontal_similar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';

const PaperDetail = ({paper}) => {
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [chatLoading, setChatLoading] = useState(false);
  

  console.log(paper);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    toast({
      description: newLikedState ? "Paper liked!" : "Paper unliked",
      duration: 1500,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Link copied to clipboard!",
      duration: 2000,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `c${Date.now()}`,
      author: "You",
      avatar: "YU",
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments(prev => [...prev, comment]);
    setNewComment('');
    
    toast({
      description: "Comment added!",
      duration: 1500,
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: `msg${Date.now()}`,
      type: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setChatLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `msg${Date.now() + 1}`,
        type: 'assistant',
        content: `Great question about "${newMessage.slice(0, 50)}${newMessage.length > 50 ? '...' : ''}"! Based on the paper's content, here's what I can explain:\n\nThis research addresses a complex topic that involves multiple interconnected concepts. Let me break it down in simpler terms...\n\n[This is a mock response - in the real app, this would be powered by Groq/DeepSeek AI]`,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setChatLoading(false);
    }, 1500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAuthorInitials = (author) => {
    return author.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  const SimilarPaperCard = ({ similarPaper }) => (
    <Card 
      className="hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200 bg-white"
      onClick={() => navigate(`/paper/${similarPaper.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 leading-tight hover:text-slate-700 transition-colors">
              {similarPaper.title}
            </h4>
            <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
              <span>{similarPaper.authors.slice(0, 2).join(', ')}</span>
              {similarPaper.authors.length > 2 && <span>+{similarPaper.authors.length - 2} more</span>}
            </div>
          </div>
          <div className="ml-3 text-xs text-gray-500">
            {(similarPaper.similarity * 100).toFixed(0)}% similar
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {similarPaper.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="outline" className="text-xs border-gray-300 text-gray-600">
              {category}
            </Badge>
          ))}
          {similarPaper.categories.length > 2 && (
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
              +{similarPaper.categories.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {new Date(similarPaper.published).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          <div className="text-xs text-gray-400">
            Score: {(similarPaper.score * 100).toFixed(0)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
       
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Paper not found</h3>
              <p className="text-gray-600 mb-4">The paper you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/')}>Go back home</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paper Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {paper.title}
                    </h1>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{formatDate(paper.published)}</span>
                      </div>
                      {paper.journal_ref && (
                        <span className="font-medium">{paper.journal_ref}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {paper.categories.map((category) => (
                        <Badge key={category} variant="outline" className="flex items-center space-x-1">
                          <Tag size={12} />
                          <span>{category}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={(e) => {
                e.stopPropagation();
                window.open(`https://arxiv.org/abs/${paper.id}`, '_blank');
              }}
                    className="ml-4 flex items-center space-x-2"
                  >
                    <ExternalLink size={16} />
                    <span>View PDF</span>
                  </Button>

                  
                </div>

                {/* Authors */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Authors</h3>
                  <div className="flex flex-wrap gap-3">
                    {paper.authors.map((author, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-600 text-white text-xs">
                            {author.split(' ').map(name => name[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-700">{author}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 pt-6 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={`flex items-center space-x-2 ${
                      isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                    <span className="font-medium">{likesCount}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
                  >
                    <MessageCircle size={20} />
                    <span className="font-medium">{comments.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
                  >
                    <Share2 size={20} />
                    <span className="font-medium">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Abstract */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Abstract</h2>
                <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
              </CardContent>
            </Card>

            {/* AI Summary */}
            {paper.summary && (
              <Card className="border-l-4 border-slate-400">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">AI Summary</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{paper.summary}</p>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card id="comments">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Discussion ({comments.length})
                </h2>

                {/* Add Comment */}
                <div className="mb-8">
                  <Textarea
                    placeholder="Share your thoughts about this paper..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle size={16} />
                    <span>Add Comment</span>
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-slate-600 text-white">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-gray-500 hover:text-red-600"
                        >
                          <Heart size={14} className="mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Similar Papers Section */}
            <HorizontalScrollCards id={paper.id} />

          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 h-[calc(100vh-8rem)]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Chat about this paper</h3>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                      <p className="text-sm">Ask questions about this paper!</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            message.type === 'user'
                              ? 'bg-slate-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                        <div className="flex space-x-1">
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.1s'}}></div>
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask a question..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || chatLoading}
                    size="sm"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetail;