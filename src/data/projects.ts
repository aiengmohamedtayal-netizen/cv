import { type LucideIcon, Brain, Code2, Database, Layers, Layout, LineChart, Network, Server, Settings, Zap } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  gradient: string;
  href: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    architecture: { title: string; description: string; icon: LucideIcon }[];
    performance: { metric: string; value: string }[];
    future: string[];
  };
};

export const projectsData: Project[] = [
  {
    id: "image-classification",
    title: "Image Classification System",
    tag: "Artificial Intelligence",
    desc: "TensorFlow-based image classification workflow with a clean inference pipeline and deployable web integration.",
    tech: ["Python", "TensorFlow", "CNN", "Keras"],
    gradient: "from-primary/40 via-violet/20 to-transparent",
    href: "/project/image-classification",
    githubUrl: "https://github.com/mohamedtayal/Image-Classification-System",
    caseStudy: {
      overview: "A scalable deep learning pipeline designed to accurately classify high-resolution images across diverse datasets using Convolutional Neural Networks (CNNs). Built for production inference.",
      problem: "Traditional rule-based image classification systems fail to adapt to complex, varied real-world data, leading to low accuracy and rigid architectures that cannot scale.",
      solution: "Engineered a custom CNN architecture using TensorFlow and Keras. Designed an automated ingestion pipeline with data augmentation and transfer learning, achieving production-grade accuracy.",
      architecture: [
        { title: "Ingestion Pipeline", description: "Automated preprocessing, tensor normalization, and dynamic batch augmentation.", icon: Layers },
        { title: "Neural Architecture", description: "Multi-layer CNN with targeted dropout and batch normalization to prevent overfitting.", icon: Brain },
        { title: "Inference Engine", description: "Optimized model serving layer achieving sub-50ms prediction latencies.", icon: Zap },
      ],
      performance: [
        { metric: "Validation Accuracy", value: "94.5%" },
        { metric: "P99 Inference", value: "< 45ms" },
        { metric: "Artifact Size", value: "12MB" },
      ],
      future: ["Implement Vision Transformers (ViT) for improved spatial context understanding.", "Deploy edge-optimized weights via TensorFlow Lite.", "Build a real-time web interface for live camera feeds."],
    }
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    tag: "Web Development",
    desc: "Responsive storefront with product management, payments, and the backend flows needed to keep orders moving.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    gradient: "from-violet/40 via-pink/20 to-transparent",
    href: "/project/ecommerce-store",
    caseStudy: {
      overview: "A modern, full-stack e-commerce architecture built from the ground up to support seamless shopping experiences, secure stateful transactions, and robust inventory management.",
      problem: "Legacy monolithic e-commerce platforms suffer from poor developer experience, sluggish client-side rendering, and rigid API structures that hinder rapid feature iteration.",
      solution: "Architected a decoupled Single Page Application (SPA) using the MERN stack. Engineered a secure JWT-based authentication flow, instant optimistic UI updates, and a normalized Redux store.",
      architecture: [
        { title: "Client Layer", description: "React SPA with Redux Toolkit for predictable global state mutation.", icon: Layout },
        { title: "API Gateway", description: "RESTful Node/Express server handling complex business logic and secure routing.", icon: Server },
        { title: "Data Persistence", description: "MongoDB clusters utilizing aggregate pipelines for high-performance querying.", icon: Database },
      ],
      performance: [
        { metric: "Lighthouse CI", value: "98/100" },
        { metric: "API P95 Latency", value: "< 120ms" },
        { metric: "System Uptime", value: "99.99%" },
      ],
      future: ["Integrate Stripe webhooks for asynchronous payment processing.", "Implement vector-based semantic product search.", "Migrate critical paths to Next.js for server-side rendering."],
    }
  },
  {
    id: "sales-analysis",
    title: "Sales Data Analysis",
    tag: "Data Analysis",
    desc: "Sales analytics dashboard that turns raw data into clear trends, visual reports, and decision-ready summaries.",
    tech: ["Python", "Pandas", "Plotly", "Jupyter"],
    gradient: "from-pink/40 via-primary/20 to-transparent",
    href: "/project/sales-analysis",
    caseStudy: {
      overview: "An enterprise-grade sales analytics dashboard that processes raw transactional data into actionable strategic insights using Python and interactive data visualization.",
      problem: "Business stakeholders often lack real-time visibility into sales metrics, relying on static, disconnected spreadsheets that delay critical decision-making.",
      solution: "Engineered a robust ETL pipeline and interactive dashboard using Python, Pandas, and Plotly. The system cleans, aggregates, and visualizes complex datasets instantly.",
      architecture: [
        { title: "ETL Pipeline", description: "Automated data extraction, cleaning, and normalization using Pandas.", icon: Database },
        { title: "Analytics Engine", description: "Statistical modeling and trend forecasting algorithms.", icon: Brain },
        { title: "Interactive Dashboard", description: "Dynamic, filterable UI built with Plotly and integrated into a Jupyter environment.", icon: LineChart },
      ],
      performance: [
        { metric: "Data Processed", value: "2M+ Rows" },
        { metric: "Query Speed", value: "< 2s" },
        { metric: "Visualizations", value: "15+ Types" },
      ],
      future: ["Deploy the dashboard as a standalone web application using Streamlit or Dash.", "Integrate predictive AI models for sales forecasting.", "Connect live SQL databases for real-time ingestion."],
    }
  },
  {
    id: "smart-chatbot",
    title: "Smart Chatbot",
    tag: "Artificial Intelligence",
    desc: "Arabic-friendly conversational assistant using NLP techniques and web integration for support use cases.",
    tech: ["Python", "NLP", "Flask", "NLTK"],
    gradient: "from-primary/40 via-pink/20 to-transparent",
    href: "/project/smart-chatbot",
    caseStudy: {
      overview: "An intelligent, context-aware chatbot specifically trained to handle customer support inquiries in both Arabic and English using Natural Language Processing.",
      problem: "Customer support teams were overwhelmed with repetitive queries, and existing bot solutions struggled with Arabic dialects and context retention.",
      solution: "Engineered a custom NLP pipeline utilizing NLTK and deep learning to understand intent and extract entities, served via a fast Flask API to the frontend.",
      architecture: [
        { title: "NLP Engine", description: "Intent classification and entity extraction using custom trained models.", icon: Brain },
        { title: "API Gateway", description: "Flask server handling WebSocket connections for real-time chat.", icon: Network },
        { title: "Integration", description: "Easily embeddable chat widget for any web application.", icon: Layout },
      ],
      performance: [
        { metric: "Intent Accuracy", value: "92%" },
        { metric: "Response Latency", value: "< 200ms" },
        { metric: "Languages Supported", value: "EN, AR" },
      ],
      future: ["Integrate Large Language Models (LLMs) via API for open-ended conversation fallback.", "Add voice-to-text recognition for audio inputs.", "Implement a dashboard for administrators to view chat analytics."],
    }
  },
  {
    id: "task-management",
    title: "Task Management System",
    tag: "Web Development",
    desc: "Project tracking app focused on team visibility, task ownership, and a faster workflow from backlog to completion.",
    tech: ["React", "Express", "PostgreSQL", "Prisma"],
    gradient: "from-violet/40 via-primary/20 to-transparent",
    href: "/project/task-management",
    caseStudy: {
      overview: "A robust, multi-tenant SaaS application designed to help teams organize projects, assign tasks, and track progress using Kanban boards and timeline views.",
      problem: "Teams suffer from fragmented communication and clunky legacy software that hinders productivity rather than helping it.",
      solution: "Developed a modern React frontend paired with a heavily optimized PostgreSQL database using Prisma ORM, featuring real-time updates and an intuitive drag-and-drop interface.",
      architecture: [
        { title: "Client Application", description: "React with drag-and-drop functionality and optimistic UI updates.", icon: Layout },
        { title: "Relational Database", description: "PostgreSQL schema optimized for complex relational queries.", icon: Database },
        { title: "Type-Safe ORM", description: "Prisma providing strict typing from database to frontend.", icon: Code2 },
      ],
      performance: [
        { metric: "Lighthouse", value: "100/100" },
        { metric: "Database Queries", value: "Optimized < 50ms" },
        { metric: "State Updates", value: "Instant (Optimistic)" },
      ],
      future: ["Implement WebSockets for live collaboration cursors and instant board updates.", "Add comprehensive role-based access control (RBAC).", "Integrate AI to suggest task breakdowns and time estimates."],
    }
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    tag: "Artificial Intelligence",
    desc: "Recommendation engine using collaborative filtering to improve relevance, discovery, and retention.",
    tech: ["Python", "Scikit-learn", "Flask", "Matrix Factorization"],
    gradient: "from-pink/40 via-violet/20 to-transparent",
    href: "/project/recommendation-system",
    caseStudy: {
      overview: "A personalized recommendation engine built to increase user engagement by analyzing behavioral patterns and suggesting highly relevant content/products.",
      problem: "Generic product listings result in low conversion rates and poor user discovery of long-tail items.",
      solution: "Implemented a hybrid recommendation system combining collaborative filtering (Matrix Factorization) and content-based filtering using Scikit-learn.",
      architecture: [
        { title: "Data Matrix", description: "Construction of user-item interaction matrices.", icon: Database },
        { title: "Algorithm", description: "Singular Value Decomposition (SVD) for dimensionality reduction.", icon: Brain },
        { title: "Serving Layer", description: "Flask API providing sub-second recommendation serving.", icon: Zap },
      ],
      performance: [
        { metric: "Precision@k", value: "0.85" },
        { metric: "Serving Latency", value: "< 80ms" },
        { metric: "Scalability", value: "High" },
      ],
      future: ["Transition to Deep Learning-based recommendation architectures (e.g., NCF).", "Incorporate real-time session-based recommendations.", "Build A/B testing infrastructure to measure algorithm ROI live."],
    }
  },
];
