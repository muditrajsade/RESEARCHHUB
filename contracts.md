# Research Paper Recommendation App - Integration Contracts

## Overview
This document outlines the integration plan between the frontend React app and the provided Python FastAPI backend with SPECTER2 search capabilities and Groq LLM integration.

## Current Frontend Implementation (Mock Data)
The frontend currently uses mock data from `/src/mock/mockData.js` including:
- Research papers with metadata, abstracts, summaries
- User profile and interaction history
- Search history and trending topics
- Chat conversation history

## Backend API Integration Points

### 1. Search Endpoints
**Frontend Usage**: SearchView.jsx, SearchBar.jsx
**Backend Endpoints**:
- `POST /api/search` - Standard SPECTER2 search
- `POST /api/personalized-search` - User-based personalized search
- `POST /api/auto-search` - Automatic search mode selection  
- `POST /api/title-search` - Title-only search
- `POST /api/similar` - Find similar papers by ArXiv ID

**Data Flow**:
- Replace mockPapers filtering with actual API calls
- Map backend SearchResult format to frontend paper objects
- Handle search loading states and error handling

### 2. User Management
**Frontend Usage**: UserProfile.jsx, Header.jsx, App.js
**Backend Endpoints**:
- `POST /api/users` - Create user profile
- `GET /api/users/{user_id}` - Get user profile  
- `POST /api/users/{user_id}/onboard` - User onboarding with interests
- `POST /api/users/{user_id}/interactions` - Track paper interactions

**Data Flow**:
- Replace mockUser with actual user data from backend
- Implement user onboarding flow for research interests
- Track like, bookmark, view interactions with papers

### 3. AI Chat Integration (Groq + DeepSeek)
**Frontend Usage**: ChatBot.jsx
**Current**: Mock chat responses based on question patterns
**Backend Integration Needed**:
- New endpoint: `POST /api/chat` - Chat with AI about papers
- Integrate Groq API with DeepSeek Llama Distil model
- Context-aware responses based on paper content

**Proposed Chat Endpoint**:
```json
POST /api/chat
{
  "paper_id": "2301.1234",
  "message": "Explain the key innovation",
  "conversation_history": [...],
  "user_level": "beginner|intermediate|advanced"
}
```

### 4. Paper Data Enhancement
**Current Mock Fields to Replace**:
- `summary` - Generate using LLM from abstract
- `isLiked`, `isBookmarked` - From user interaction data
- `likes`, `bookmarks`, `views` - Aggregate interaction stats

## Implementation Strategy

### Phase 1: Basic Search Integration
1. Replace search mock data with actual API calls
2. Update paper card component to handle backend data format
3. Implement error handling and loading states

### Phase 2: User Management Integration  
1. Implement user authentication/identification
2. Connect user profile with backend user data
3. Track user interactions (likes, bookmarks, views)

### Phase 3: AI Chat Integration
1. Create new backend endpoint for chat functionality
2. Integrate Groq API with DeepSeek model
3. Implement context-aware responses
4. Add conversation history persistence

### Phase 4: Advanced Features
1. Implement paper summary generation using LLM
2. Add real-time recommendation updates
3. Integrate similarity-based recommendations
4. Add notification system for new papers

## Technical Considerations

### Frontend Changes Required:
- Replace mock data imports with API service layer
- Add axios configuration for backend communication
- Implement proper error boundaries and loading states
- Add user authentication context
- Update state management for real-time data

### Backend Extensions Needed:
- Chat endpoint with Groq/DeepSeek integration
- Paper summary generation endpoint
- Real-time interaction tracking
- WebSocket for live updates (optional)

### Data Transformation:
- Map backend PaperMetadata to frontend paper objects
- Transform user interaction data to UI-friendly format
- Handle missing optional fields (DOI, journal_ref)

## Environment Variables Required:
- `GROQ_API_KEY` - For LLM chat functionality
- `DEEPSEEK_MODEL` - Model configuration
- Backend URL already configured as `REACT_APP_BACKEND_URL`

## Testing Strategy:
1. Unit tests for API service layer
2. Integration tests for user flows
3. End-to-end testing for chat functionality
4. Performance testing for search operations

## Error Handling:
- Graceful fallbacks when API is unavailable
- User-friendly error messages
- Retry mechanisms for failed requests
- Offline mode considerations

This contracts document will guide the seamless integration between the Instagram-like frontend and the powerful SPECTER2 + LLM backend system.