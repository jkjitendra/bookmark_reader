"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Users } from "lucide-react";
import {BlogReader} from "@/components/BlogReader";
import {TopNavigation} from "@/components/TopNavigation";
import {Button} from "@/components/ui/button";
import {CollaborationPanel} from "@/components/CollaborationPanel";
import {MainContent} from "@/components/MainContent";
import {NotificationPopup} from "@/components/NotificationPopup";
import {SettingsPage} from "@/components/SettingsPage";
import {SummaryEditor} from "@/components/SummaryEditor";


const mockBookmarks = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    url: "https://techblog.example.com/web-dev-2024",
    snippet: "Exploring the latest trends in web development including AI integration, WebAssembly adoption, and the evolution of JavaScript frameworks. This comprehensive guide covers what developers need to know...",
    isRead: false,
    tags: ["Web Development", "JavaScript", "AI", "Trends"],
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    title: "Advanced React Patterns and Performance Optimization",
    url: "https://reactguide.dev/advanced-patterns",
    snippet: "Learn about advanced React patterns including render props, compound components, and custom hooks. Discover performance optimization techniques that can dramatically improve your app's speed...",
    isRead: true,
    tags: ["React", "JavaScript", "Performance"],
    createdAt: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    title: "UX Research Methods: A Comprehensive Guide",
    url: "https://uxdesign.com/research-methods-guide",
    snippet: "Understanding user behavior through effective research methods. This guide covers user interviews, usability testing, A/B testing, and analytics-driven insights for better product decisions...",
    isRead: false,
    tags: ["UX", "Research", "Design"],
    createdAt: "2024-01-14T09:20:00Z"
  },
  {
    id: "4",
    title: "Building Scalable APIs with Node.js and TypeScript",
    url: "https://backend.dev/scalable-apis",
    snippet: "Best practices for building robust, scalable APIs using Node.js and TypeScript. Covers architecture patterns, error handling, authentication, and deployment strategies for enterprise applications...",
    isRead: true,
    tags: ["Node.js", "TypeScript", "API", "Backend"],
    createdAt: "2024-01-13T14:15:00Z"
  },
  {
    id: "5",
    title: "CSS Grid vs Flexbox: When to Use Which",
    url: "https://cssmastery.com/grid-vs-flexbox",
    snippet: "A detailed comparison of CSS Grid and Flexbox layouts. Learn when to use each approach, practical examples, and how to combine them effectively for responsive designs...",
    isRead: false,
    tags: ["CSS", "Layout", "Design"],
    createdAt: "2024-01-12T11:30:00Z"
  },
  {
    id: "6",
    title: "Machine Learning for Frontend Developers",
    url: "https://mldev.guide/frontend-ml",
    snippet: "Introduction to machine learning concepts for frontend developers. Learn about TensorFlow.js, model integration, and practical applications in web applications...",
    isRead: false,
    tags: ["Machine Learning", "JavaScript", "AI"],
    createdAt: "2024-01-11T16:45:00Z"
  }
]

const mockArticle = {
  id: "1",
  title: "The Future of Web Development: Trends to Watch in 2024",
  content: `The landscape of web development continues to evolve at a rapid pace, driven by technological advancements, changing user expectations, and the constant push for better performance and user experience.

In 2024, we're witnessing several key trends that are reshaping how we build and think about web applications. From the integration of artificial intelligence to the mainstream adoption of WebAssembly, developers have more tools and opportunities than ever before.

One of the most significant trends is the rise of AI-powered development tools. These tools are not just changing how we write code, but also how we debug, optimize, and even design our applications. AI assistants can now help generate boilerplate code, suggest optimizations, and even predict potential issues before they occur.

WebAssembly (WASM) is another technology that's gaining significant traction. Originally designed to run high-performance applications in the browser, WASM is now being used for everything from image processing to complex calculations, offering near-native performance for web applications.

The JavaScript ecosystem continues to mature, with frameworks like React, Vue, and Angular introducing new patterns and optimizations. Server-side rendering and static site generation have become mainstream, offering better performance and SEO benefits.

Performance optimization has become more critical than ever, with Core Web Vitals becoming a ranking factor for search engines. Developers are focusing on metrics like Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) to ensure their applications provide excellent user experiences.

Another trend worth noting is the increased focus on accessibility and inclusive design. With legal requirements becoming more stringent and awareness growing, developers are prioritizing accessible design patterns and testing methodologies.

The rise of edge computing and Content Delivery Networks (CDNs) is also changing how we deploy and scale applications. Services like Vercel Edge Functions and Cloudflare Workers allow developers to run code closer to users, reducing latency and improving performance.

Looking ahead, these trends will likely continue to shape the web development landscape, offering new opportunities and challenges for developers worldwide.`,
  url: "https://techblog.example.com/web-dev-2024",
  isBookmarked: true
}

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentView, setCurrentView] = useState<"dashboard" | "reader">("dashboard");
  const [showNotification, setShowNotification] = useState(true);
  const [showSummaryEditor, setShowSummaryEditor] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(mockArticle);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(
        (width === 768 && window.innerHeight === 1024) ||
          (width === 820 && window.innerHeight === 1180) ||
          (width === 1024 && window.innerHeight === 1366) ||
          (width === 700 && window.innerHeight === 840) ||
          (width >= 700 && width <= 1024)
      );
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  if (currentView === "reader") {
    return (
      <BlogReader
        article={selectedArticle}
        onBack={() => setCurrentView("dashboard")}
        onBookmark={() => console.log("Toggle bookmark")}
        onShare={() => console.log("Share article")}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopNavigation
        onSettingsClick={() => setShowSettings(true)}
        isDarkMode={isDarkMode}
        onDarkModeToggle={setIsDarkMode}
      />

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {isMobile && (
            <div className="border-b border-border bg-card px-2 py-2">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {["all", "unread", "read", "tags", "shared"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap text-xs px-2 h-6 shrink-0"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <MainContent
            bookmarks={mockBookmarks}
            activeFilter={activeFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onBookmarkRead={(id: string) => setCurrentView("reader")}
            onBookmarkMarkRead={(id: string) => console.log("mark read", id)}
            onBookmarkSummary={(id: string) => setShowSummaryEditor(true)}
            onBookmarkDelete={(id: string) => console.log("delete", id)}
            onBookmarkShare={(id: string) => console.log("share", id)}
            onBookmarkArchive={(id: string) => console.log("archive", id)}
            onBookmarkNotInterested={(id: string) => console.log("not interested", id)}
            onBookmarkMarkNext={(id: string) => console.log("mark next", id)}
            isMobile={isMobile}
          />
        </div>

        {showCollaboration && !isMobile && !isTablet && (
          <CollaborationPanel isOpen={showCollaboration} />
        )}
      </div>

      <Button
        className={`fixed ${showCollaboration && !isMobile && !isTablet ? "bottom-6 right-100" : "bottom-6 right-6"} h-12 w-12 rounded-full shadow-lg z-40 transition-all duration-300`}
        onClick={() => setShowCollaboration(!showCollaboration)}
      >
        <Users className="w-5 h-5" />
      </Button>

      {showCollaboration && (isMobile || isTablet) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCollaboration(false)} />
          <div className={`relative w-full ${isMobile ? "max-w-[95vw] h-[95vh]" : "max-w-2xl h-[90vh]"} bg-card rounded-lg shadow-xl border border-border overflow-hidden`}>
            <CollaborationPanel isOpen={true} onClose={() => setShowCollaboration(false)} />
          </div>
        </div>
      )}

      <NotificationPopup
        isVisible={showNotification}
        title="New article from TechBlog"
        snippet="The Ultimate Guide to React Server Components: Everything you need to know about the future of React development..."
        onReadNow={() => {
          setShowNotification(false);
          setCurrentView("reader");
        }}
        onSnooze={() => {
          setShowNotification(false);
          setTimeout(() => setShowNotification(true), 30000);
        }}
        onDismiss={() => setShowNotification(false)}
      />

      <SummaryEditor
        isOpen={showSummaryEditor}
        onClose={() => setShowSummaryEditor(false)}
        article={{
          title: "The Future of Web Development: Trends to Watch in 2024",
          summary:
            "This article explores key web development trends for 2024, including AI integration, WebAssembly adoption, and JavaScript framework evolution. Key takeaways include the importance of performance optimization, accessibility, and edge computing.",
        }}
        onSave={(summary: string) => console.log("save summary", summary)}
      />

      <SettingsPage isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
