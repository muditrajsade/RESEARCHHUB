// Mock data for research paper recommendation app
export const mockPapers = [
  {
    id: "2301.1234",
    arxiv_id: "2301.1234",
    title: "Attention Is All You Need: A Comprehensive Survey of Transformer Architectures",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
    abstract: "The Transformer architecture has revolutionized natural language processing and has shown remarkable success across various domains. This paper provides a comprehensive survey of Transformer variants, analyzing their architectural innovations, computational efficiency, and performance across different tasks. We examine recent developments in attention mechanisms, positional encodings, and scaling laws that have led to breakthroughs in large language models.",
    summary: "This paper surveys Transformer architectures, covering recent innovations in attention mechanisms and their impact on large language models. Key findings include improved efficiency through sparse attention patterns and better positional encoding methods.",
    published: "2023-01-15T10:30:00Z",
    categories: ["cs.AI", "cs.LG", "cs.CL"],
    doi: "10.1000/xyz123",
    journal_ref: "Nature Machine Intelligence 2023",
    score: 0.95,
    likes: 124,
    bookmarks: 89,
    views: 1520,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "2302.5678",
    arxiv_id: "2302.5678", 
    title: "Retrieval-Augmented Generation for Large Language Models: A Comprehensive Study",
    authors: ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus", "Fabio Petroni"],
    abstract: "Retrieval-Augmented Generation (RAG) combines the parametric knowledge of large language models with non-parametric knowledge from external sources. This study investigates various RAG architectures, retrieval strategies, and their impact on downstream tasks. We propose novel evaluation metrics and conduct extensive experiments across multiple domains to assess the effectiveness of different RAG implementations.",
    summary: "A comprehensive study of RAG systems that combine language models with external knowledge retrieval. The paper introduces new evaluation methods and shows significant improvements in factual accuracy and knowledge-intensive tasks.",
    published: "2023-02-20T14:45:00Z",
    categories: ["cs.CL", "cs.AI", "cs.IR"],
    doi: null,
    journal_ref: null,
    score: 0.87,
    likes: 98,
    bookmarks: 76,
    views: 1240,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: "2303.9012",
    arxiv_id: "2303.9012",
    title: "Diffusion Models Beat GANs on Image Synthesis",
    authors: ["Prafulla Dhariwal", "Alex Nichol"],
    abstract: "We show that diffusion models can achieve better image synthesis quality than state-of-the-art GANs. Through careful architecture design and classifier guidance, we demonstrate that diffusion models produce more diverse and higher-quality samples. Our findings challenge the dominance of GANs in image generation and establish diffusion models as a promising alternative for high-fidelity image synthesis.",
    summary: "This breakthrough paper demonstrates that diffusion models outperform GANs in image generation quality and diversity. The work introduces classifier guidance techniques that significantly improve sample quality.",
    published: "2023-03-10T09:15:00Z",
    categories: ["cs.CV", "cs.LG", "stat.ML"],
    doi: "10.1000/abc456",
    journal_ref: "ICLR 2023",
    score: 0.91,
    likes: 156,
    bookmarks: 112,
    views: 1890,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "2304.3456",
    arxiv_id: "2304.3456",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: ["Yuntao Bai", "Andy Jones", "Kamal Ndousse", "Amanda Askell"],
    abstract: "We propose Constitutional AI (CAI), a method for training AI systems to be harmless without sacrificing helpfulness. CAI uses a constitution of principles to guide AI behavior and employs AI feedback to iteratively improve the model's adherence to these principles. Our approach significantly reduces harmful outputs while maintaining performance on useful tasks.",
    summary: "Constitutional AI introduces a novel training method that uses AI feedback and constitutional principles to reduce harmful outputs while maintaining helpfulness. This approach shows promise for safer AI deployment.",
    published: "2023-04-05T16:20:00Z",
    categories: ["cs.AI", "cs.CY", "cs.LG"],
    doi: null,
    journal_ref: null,
    score: 0.83,
    likes: 87,
    bookmarks: 65,
    views: 980,
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "2305.7890",
    arxiv_id: "2305.7890",
    title: "PaLM: Scaling Language Modeling with Pathways",
    authors: ["Aakanksha Chowdhery", "Sharan Narang", "Jacob Devlin", "Maarten Bosma"],
    abstract: "We introduce PaLM (Pathways Language Model), a 540-billion parameter autoregressive language model trained on a high-quality corpus of diverse text. PaLM demonstrates breakthrough performance on a wide range of natural language tasks, from reasoning to code generation. We analyze scaling laws and emergent capabilities that arise at large scales.",
    summary: "PaLM is a 540B parameter language model that achieves state-of-the-art performance across numerous NLP tasks. The paper provides insights into scaling laws and emergent capabilities at unprecedented model sizes.",
    published: "2023-05-12T11:30:00Z",
    categories: ["cs.CL", "cs.AI", "cs.LG"],
    doi: "10.1000/palm2023",
    journal_ref: "JMLR 2023",
    score: 0.94,
    likes: 203,
    bookmarks: 145,
    views: 2340,
    isLiked: false,
    isBookmarked: false
  }
];

export const mockUser = {
  user_id: "user_123",
  is_onboarded: true,
  subjects: {
    "Natural Language Processing": {
      name: "Natural Language Processing",
      keywords: ["transformers", "attention", "language models", "NLP"],
      interactions: 45
    },
    "Computer Vision": {
      name: "Computer Vision", 
      keywords: ["diffusion models", "GANs", "image synthesis", "CNN"],
      interactions: 32
    },
    "AI Safety": {
      name: "AI Safety",
      keywords: ["alignment", "constitutional AI", "safety", "ethics"],
      interactions: 18
    }
  },
  total_interactions: 95,
  created_at: "2023-01-01T00:00:00Z",
  last_active: "2023-07-15T10:30:00Z",
  preferences: {
    feed_algorithm: "personalized", // "chronological", "trending", "personalized"
    paper_density: "comfortable", // "compact", "comfortable", "spacious"
    auto_summary: true,
    notification_likes: true,
    notification_bookmarks: false
  }
};

export const mockSearchHistory = [
  "transformer attention mechanisms",
  "diffusion models vs GANs", 
  "retrieval augmented generation",
  "constitutional AI safety",
  "large language model scaling"
];

export const mockChatHistory = [
  {
    id: "chat_1",
    paper_id: "2301.1234",
    messages: [
      {
        role: "user",
        content: "Can you explain the key innovation in the Transformer architecture?",
        timestamp: "2023-07-15T10:30:00Z"
      },
      {
        role: "assistant", 
        content: "The key innovation in the Transformer architecture is the self-attention mechanism that allows the model to weigh the importance of different parts of the input sequence when processing each element. Unlike RNNs that process sequences step by step, Transformers can process all positions in parallel, making them much more efficient to train. The attention mechanism helps the model understand relationships between words regardless of their distance in the sequence.",
        timestamp: "2023-07-15T10:30:15Z"
      },
      {
        role: "user",
        content: "How does this compare to previous approaches like RNNs and CNNs?",
        timestamp: "2023-07-15T10:31:00Z"
      },
      {
        role: "assistant",
        content: "Great question! Here are the key differences:\n\n**RNNs**: Process sequences step-by-step, which creates bottlenecks and makes parallel training difficult. They also struggle with long-range dependencies due to vanishing gradients.\n\n**CNNs**: Use local convolutions with fixed-size windows, making it hard to capture long-range relationships without many layers.\n\n**Transformers**: Use self-attention to directly connect any two positions in the sequence, enabling parallel processing and better long-range dependency modeling. This makes them both faster to train and more effective at understanding context.",
        timestamp: "2023-07-15T10:31:20Z"
      }
    ]
  }
];

export const mockTrendingTopics = [
  { topic: "Large Language Models", papers: 234, growth: "+15%" },
  { topic: "Diffusion Models", papers: 189, growth: "+23%" },
  { topic: "Retrieval-Augmented Generation", papers: 156, growth: "+31%" },
  { topic: "AI Safety", papers: 98, growth: "+18%" },
  { topic: "Vision Transformers", papers: 145, growth: "+12%" }
];

export const mockRecommendations = [
  {
    type: "similar_papers",
    title: "Papers similar to your recent likes",
    papers: ["2301.1234", "2302.5678", "2304.3456"]
  },
  {
    type: "trending_in_subject", 
    title: "Trending in Natural Language Processing",
    papers: ["2305.7890", "2303.9012"]
  },
  {
    type: "authors_you_follow",
    title: "New papers from authors you follow", 
    papers: ["2301.1234"]
  }
];