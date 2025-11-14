"use client";

import { X, Wand2, Save, Clock, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { useState } from "react"

interface SummaryEditorProps {
  isOpen: boolean
  onClose: () => void
  article: {
    title: string
    summary?: string
  }
  onSave: (summary: string) => void
}

export function SummaryEditor({ isOpen, onClose, article, onSave }: SummaryEditorProps) {
  const [summary, setSummary] = useState(article.summary || "")
  const [isGenerating, setIsGenerating] = useState(false)
  const [versions, setVersions] = useState([
    {
      id: 1,
      content: "Initial AI-generated summary highlighting key points about the article's main topics and conclusions.",
      createdAt: "2024-01-15T10:30:00Z",
      type: "AI Generated"
    },
    {
      id: 2,
      content: "Personal notes added: This relates to our current project on user experience design patterns.",
      createdAt: "2024-01-15T14:45:00Z",
      type: "Manual Edit"
    }
  ])

  const handleGenerateAISummary = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const aiSummary = "AI-generated summary: This article discusses modern web development practices, focusing on responsive design patterns and user experience optimization. Key takeaways include the importance of mobile-first design, accessibility considerations, and performance optimization techniques. The author emphasizes the role of user research in creating effective interfaces and provides practical examples of successful implementations."
      setSummary(aiSummary)
      setVersions(prev => [...prev, {
        id: prev.length + 1,
        content: aiSummary,
        createdAt: new Date().toISOString(),
        type: "AI Generated"
      }])
      setIsGenerating(false)
    }, 2000)
  }

  const handleSave = () => {
    onSave(summary)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-5xl lg:max-w-6xl h-[95vh] sm:h-[90vh] lg:h-[85vh] p-0 flex flex-col m-2 sm:m-4">
        <DialogHeader className="p-3 sm:p-4 lg:p-6 pb-3 sm:pb-4 shrink-0 border-b border-border">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-semibold">Edit Summary</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Create or edit a summary for this article. You can write your own or generate one using AI.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Main Editor */}
          <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 pt-0 min-h-0">
            <div className="mb-3 sm:mb-4 shrink-0">
              <h3 className="font-medium mb-2 text-sm sm:text-base line-clamp-2">
                Article: {article.title}
              </h3>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Button 
                  onClick={handleGenerateAISummary}
                  disabled={isGenerating}
                  className="h-7 sm:h-8 text-xs px-3"
                  size="sm"
                >
                  <Wand2 className="w-3 h-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {isGenerating ? "Generating..." : "Generate AI Summary"}
                  </span>
                  <span className="sm:hidden">
                    {isGenerating ? "AI..." : "AI Summary"}
                  </span>
                </Button>
              </div>
            </div>

            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter your summary or generate one using AI..."
              className="flex-1 resize-none min-h-[180px] sm:min-h-[250px] lg:min-h-[300px] text-sm border-border"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-4 gap-2 sm:gap-3 shrink-0">
              <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                {summary.length} characters
              </div>
              <div className="flex gap-2 order-1 sm:order-2">
                <Button variant="outline" onClick={onClose} size="sm" className="h-7 sm:h-8 text-xs px-3">
                  Cancel
                </Button>
                <Button onClick={handleSave} size="sm" className="h-7 sm:h-8 text-xs px-3">
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Save Summary
                </Button>
              </div>
            </div>
          </div>

          {/* Version History Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border flex flex-col min-h-0">
            <div className="p-3 sm:p-4 flex-1 flex flex-col min-h-0">
              <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Version History</h4>
              <ScrollArea className="flex-1 min-h-0">
                <div className="space-y-3 pb-4">
                  {versions.map((version) => (
                    <div key={version.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {version.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground shrink-0">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(version.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-3">
                        {version.content}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 text-xs w-full justify-center"
                        onClick={() => setSummary(version.content)}
                      >
                        Restore
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}