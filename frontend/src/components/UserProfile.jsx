import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  Bookmark, 
  TrendingUp, 
  Edit3,
  Plus,
  X
} from 'lucide-react';
import { mockUser } from '../mock/mockData';

const UserProfile = ({ isOpen, onClose }) => {
  const [editingInterests, setEditingInterests] = useState(false);
  const [interests, setInterests] = useState(Object.keys(mockUser.subjects));
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const stats = [
    { label: 'Papers Viewed', value: '1,234', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Papers Liked', value: '89', icon: Heart, color: 'text-red-600' },
    { label: 'Papers Bookmarked', value: '156', icon: Bookmark, color: 'text-green-600' },
    { label: 'Total Interactions', value: mockUser.total_interactions, icon: TrendingUp, color: 'text-purple-600' }
  ];

  const interactionHistory = [
    { action: 'Liked', paper: 'Attention Is All You Need', time: '2 hours ago' },
    { action: 'Bookmarked', paper: 'Retrieval-Augmented Generation', time: '5 hours ago' },
    { action: 'Viewed', paper: 'Constitutional AI: Harmlessness', time: '1 day ago' },
    { action: 'Liked', paper: 'PaLM: Scaling Language Modeling', time: '2 days ago' },
    { action: 'Bookmarked', paper: 'Diffusion Models Beat GANs', time: '3 days ago' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <User size={24} className="mr-2" />
            User Profile
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">User ID</label>
                    <p className="text-gray-900">{mockUser.user_id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="text-gray-900">
                      {new Date(mockUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Active</label>
                    <p className="text-gray-900">
                      {new Date(mockUser.last_active).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={mockUser.is_onboarded ? "default" : "secondary"}>
                        {mockUser.is_onboarded ? "Onboarded" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                          <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Research Interests Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Research Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockUser.subjects).map(([subject, data]) => (
                    <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{subject}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {data.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{data.interactions}</p>
                        <p className="text-xs text-gray-600">interactions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Research Interests</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setEditingInterests(!editingInterests)}
                  >
                    <Edit3 size={16} className="mr-2" />
                    {editingInterests ? 'Done' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {editingInterests ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add new research interest..."
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      />
                      <Button onClick={addInterest}>
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <span className="text-sm">{interest}</span>
                          <button
                            onClick={() => removeInterest(interest)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(mockUser.subjects).map(([subject, data]) => (
                      <div key={subject}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{subject}</h4>
                          <Badge variant="secondary">{data.interactions} interactions</Badge>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 mb-1">Interest Level</p>
                          <Progress value={(data.interactions / 50) * 100} className="h-2" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Keywords</p>
                          <div className="flex flex-wrap gap-1">
                            {data.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactionHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={
                            item.action === 'Liked' ? 'destructive' : 
                            item.action === 'Bookmarked' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {item.action}
                        </Badge>
                        <span className="font-medium text-gray-900">{item.paper}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feed Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-generate summaries</p>
                      <p className="text-sm text-gray-600">Show AI-generated summaries for papers</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {mockUser.preferences.auto_summary ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Feed Algorithm</p>
                      <p className="text-sm text-gray-600">How papers are ordered in your feed</p>
                    </div>
                    <Badge variant="outline">{mockUser.preferences.feed_algorithm}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Paper Density</p>
                      <p className="text-sm text-gray-600">How much information to show per paper</p>
                    </div>
                    <Badge variant="outline">{mockUser.preferences.paper_density}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Like Notifications</p>
                      <p className="text-sm text-gray-600">Get notified when someone likes your bookmarks</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {mockUser.preferences.notification_likes ? 'On' : 'Off'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Bookmark Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about bookmark activity</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {mockUser.preferences.notification_bookmarks ? 'On' : 'Off'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;