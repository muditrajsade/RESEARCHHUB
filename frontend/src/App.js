import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import PaperDetailPage from "./pages/PaperDetailPage";
// Components
import Header from "./components/Header";
import FeedView from "./components/FeedView";
import SearchView from "./components/SearchView";
import ChatBot from "./components/ChatBot";
import UserProfile from "./components/UserProfile";
import PaperCard from "./components/PaperCard";

// Mock data
import { mockPapers } from "./mock/mockData";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username);
      navigate("/"); // redirect back to main page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [papers, setPapers] = useState(mockPapers);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPaperId, setChatPaperId] = useState(null);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const { toast } = useToast();

  const handlePaperLike = (paperId) => {
    setPapers(
      papers.map((paper) =>
        paper.id === paperId
          ? {
              ...paper,
              isLiked: !paper.isLiked,
              likes: paper.isLiked ? paper.likes - 1 : paper.likes + 1,
            }
          : paper
      )
    );

    const paper = papers.find((p) => p.id === paperId);
    toast({
      title: paper?.isLiked
        ? "Removed from liked papers"
        : "Added to liked papers",
      description: paper?.title.slice(0, 60) + "...",
      duration: 3000,
    });
  };

  const handlePaperBookmark = (paperId) => {
    setPapers(
      papers.map((paper) =>
        paper.id === paperId
          ? {
              ...paper,
              isBookmarked: !paper.isBookmarked,
              bookmarks: paper.isBookmarked
                ? paper.bookmarks - 1
                : paper.bookmarks + 1,
            }
          : paper
      )
    );

    const paper = papers.find((p) => p.id === paperId);
    toast({
      title: paper?.isBookmarked
        ? "Removed from bookmarks"
        : "Added to bookmarks",
      description: paper?.title.slice(0, 60) + "...",
      duration: 3000,
    });
  };

  const handlePaperView = (paperId) => {
    setPapers(
      papers.map((paper) =>
        paper.id === paperId ? { ...paper, views: paper.views + 1 } : paper
      )
    );

    const paper = papers.find((p) => p.id === paperId);
    toast({
      title: "Opening paper details",
      description: paper?.title.slice(0, 60) + "...",
      duration: 2000,
    });
  };

  const handlePaperChat = (paperId) => {
    setChatPaperId(paperId);
    setChatOpen(true);
    setChatMinimized(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <FeedView
            onPaperLike={handlePaperLike}
            onPaperBookmark={handlePaperBookmark}
            onPaperView={handlePaperView}
            onPaperChat={handlePaperChat}
          />
        );
      case "search":
        return (
          <SearchView
            onPaperLike={handlePaperLike}
            onPaperBookmark={handlePaperBookmark}
            onPaperView={handlePaperView}
            onPaperChat={handlePaperChat}
          />
        );
      case "trending":
        return (
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trending Papers
            </h2>
            <div className="space-y-6">
              {papers
                .sort((a, b) => b.views + b.likes - (a.views + a.likes))
                .map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onLike={handlePaperLike}
                    onBookmark={handlePaperBookmark}
                    onView={handlePaperView}
                    onChat={handlePaperChat}
                  />
                ))}
            </div>
          </div>
        );
      case "liked":
        const likedPapers = papers.filter((paper) => paper.isLiked);
        return (
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Liked Papers
            </h2>
            {likedPapers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No liked papers yet. Start exploring!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {likedPapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onLike={handlePaperLike}
                    onBookmark={handlePaperBookmark}
                    onView={handlePaperView}
                    onChat={handlePaperChat}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case "bookmarks":
        const bookmarkedPapers = papers.filter((paper) => paper.isBookmarked);
        return (
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bookmarked Papers
            </h2>
            {bookmarkedPapers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No bookmarked papers yet. Save some for later!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookmarkedPapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onLike={handlePaperLike}
                    onBookmark={handlePaperBookmark}
                    onView={handlePaperView}
                    onChat={handlePaperChat}
                  />
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onUserProfileClick={() =>
                    loggedInUser
                      ? setUserProfileOpen(true)
                      : (window.location.href = "/login")
                  }
                />

                {/* Login/Signup Button in Header Right Corner */}
                <div className="absolute top-4 right-6">
                  {!loggedInUser ? (
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                    >
                      Login / Signup
                    </button>
                  ) : (
                    <span
                      onClick={() => setUserProfileOpen(true)}
                      className="cursor-pointer font-medium text-gray-700"
                    >
                      Hi, {loggedInUser}
                    </span>
                  )}
                </div>

                <main className="pb-20">{renderContent()}</main>

                {/* Chat Bot */}
                <ChatBot
                  paperId={chatPaperId}
                  isOpen={chatOpen}
                  onClose={() => setChatOpen(false)}
                  onMinimize={() => setChatMinimized(!chatMinimized)}
                  isMinimized={chatMinimized}
                />

                {/* User Profile Modal */}
                <UserProfile
                  isOpen={userProfileOpen}
                  onClose={() => setUserProfileOpen(false)}
                  username={loggedInUser}
                />

                {/* Toast Notifications */}
                <Toaster />
              </>
            }
          />
          <Route path="/paper" element={<PaperDetailPage />} />
          <Route
            path="/login"
            element={<LoginPage onLogin={(username) => setLoggedInUser(username)} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
