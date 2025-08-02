import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Send, Bot, User, X, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { mockChatHistory, mockPapers } from '../mock/mockData';

const ChatBot = ({ paperId, isOpen, onClose, onMinimize, isMinimized }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPaper, setCurrentPaper] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (paperId) {
      const paper = mockPapers.find(p => p.id === paperId);
      setCurrentPaper(paper);
      
      // Load existing chat history or start fresh
      const existingChat = mockChatHistory.find(chat => chat.paper_id === paperId);
      if (existingChat) {
        setMessages(existingChat.messages);
      } else {
        setMessages([
          {
            role: "assistant",
            content: `Hi! I'm here to help you understand "${paper?.title}". Feel free to ask me anything about this paper - from basic concepts to detailed technical questions. I'll adjust my explanations based on what you need to know!`,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    }
  }, [paperId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual Groq API call)
    setTimeout(() => {
      const aiResponse = generateMockResponse(input.trim(), currentPaper);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query, paper) => {
    // Mock responses based on common question patterns
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('explain') || lowercaseQuery.includes('what is')) {
      return `Based on "${paper?.title}", let me break this down in simple terms:\n\nThe main concept here involves ${paper?.categories[0]} techniques that focus on improving how we process and understand data. Think of it like teaching a computer to read and understand text the way humans do, but much faster and with the ability to find patterns across millions of documents.\n\nWould you like me to dive deeper into any specific aspect?`;
    }
    
    if (lowercaseQuery.includes('method') || lowercaseQuery.includes('approach')) {
      return `The methodology in this paper follows several key steps:\n\n1. **Data Preparation**: The researchers collected and processed large datasets\n2. **Model Architecture**: They designed a specific neural network structure\n3. **Training Process**: The model was trained using advanced optimization techniques\n4. **Evaluation**: Results were tested against standard benchmarks\n\nThe innovative part is how they combined these elements to achieve better performance than previous approaches. What aspect would you like me to elaborate on?`;
    }
    
    if (lowercaseQuery.includes('result') || lowercaseQuery.includes('performance')) {
      return `The results are quite impressive! Here's what the paper achieved:\n\n• **Accuracy**: Significant improvement over baseline methods\n• **Efficiency**: Faster processing while maintaining quality\n• **Generalization**: Works well across different types of data\n\nThe paper demonstrates that their approach outperforms previous state-of-the-art methods by a considerable margin. This is particularly important because it shows the method is practical for real-world applications.\n\nWould you like me to explain what these improvements mean in practical terms?`;
    }
    
    if (lowercaseQuery.includes('beginner') || lowercaseQuery.includes('simple')) {
      return `Let me explain this in the simplest way possible:\n\nImagine you're trying to teach a computer to understand research papers, just like you're doing right now. This paper presents a new way to do that more effectively.\n\nThink of it like this: instead of the computer reading word by word, it learns to understand the meaning and context of entire sentences and paragraphs. This helps it make better connections and provide more useful insights.\n\nThe breakthrough here is making this process faster and more accurate than before. It's like upgrading from a regular calculator to a smart calculator that understands what you're trying to solve.\n\nDoes this help? Feel free to ask for more details about any part!`;
    }
    
    return `That's a great question about "${paper?.title}"! This paper explores ${paper?.categories.join(', ')} concepts that are quite fascinating.\n\nThe key insight is that ${paper?.summary}\n\nThis work is significant because it advances our understanding of how to build better AI systems. The authors' approach shows promise for solving real-world problems more effectively.\n\nWhat specific aspect would you like me to dive deeper into? I can explain the technical details, practical applications, or help you understand how this fits into the broader research landscape.`;
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm here to help you understand "${currentPaper?.title}". Feel free to ask me anything about this paper - from basic concepts to detailed technical questions. I'll adjust my explanations based on what you need to know!`,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <Card className={`fixed bottom-4 right-4 bg-white shadow-2xl border z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot size={20} className="text-blue-600" />
            <CardTitle className="text-lg">Research Assistant</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            {!isMinimized && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="hover:bg-gray-100"
              >
                <RefreshCw size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMinimize}
              className="hover:bg-gray-100"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        {!isMinimized && currentPaper && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              Discussing: {currentPaper.title.slice(0, 40)}...
            </Badge>
          </div>
        )}
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-100px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      {message.role === 'user' ? 
                        <User size={16} className="text-white" /> : 
                        <Bot size={16} className="text-gray-600" />
                      }
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot size={16} className="text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this paper..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                size="sm"
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ChatBot;