"use client";

import { ArrowLeft, Bookmark, Share2, Sun, Moon, Type, Plus, Minus } from "lucide-react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { useState, useEffect } from "react"

interface BlogReaderProps {
  article: {
    id: string
    title: string
    content: string
    url: string
    isBookmarked: boolean
  }
  onBack: () => void
  onBookmark: () => void
  onShare: () => void
}

export function BlogReader({ article, onBack, onBookmark, onShare }: BlogReaderProps) {
  const [readProgress, setReadProgress] = useState(0)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDarkMode = document.documentElement.classList.contains('dark')

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={onBack} className="text-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8"
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Type className="w-4 h-4 text-muted-foreground" />
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8"
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <Separator orientation="vertical" className="h-6" />

            <Button 
              variant="outline" 
              size="icon"
              onClick={onBookmark}
              className={article.isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="w-4 h-4" fill={article.isBookmarked ? "currentColor" : "none"} />
            </Button>

            <Button variant="outline" size="icon" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={readProgress} className="h-1" />
      </div>

      {/* Content */}
      <ScrollArea className="h-full">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ fontSize: `${Math.max(fontSize + 8, 24)}px` }}>
              {article.title}
            </h1>
            <div className="text-sm text-muted-foreground mb-4">
              Source: {new URL(article.url).hostname}
            </div>
          </div>

          <div 
            className="prose prose-neutral dark:prose-invert max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
          >
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}