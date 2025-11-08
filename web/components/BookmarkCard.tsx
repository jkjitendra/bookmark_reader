"use client";


import { ExternalLink, BookOpen, Check, Trash2, FileText, Share2, MoreHorizontal, Archive, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

import { useState } from "react"

interface Bookmark {
  id: string
  title: string
  url: string
  snippet: string
  isRead: boolean
  tags: string[]
  createdAt: string
  favicon?: string
}

interface BookmarkCardProps {
  bookmark: Bookmark
  onRead: (id: string) => void
  onMarkRead: (id: string) => void
  onSummary: (id: string) => void
  onDelete: (id: string) => void
  onShare: (id: string) => void
  onArchive?: (id: string) => void
  onNotInterested?: (id: string) => void
  onMarkNext?: (id: string) => void
  isMobile?: boolean
}

export function BookmarkCard({ 
  bookmark, 
  onRead, 
  onMarkRead, 
  onSummary, 
  onDelete, 
  onShare,
  onArchive = () => {},
  onNotInterested = () => {},
  onMarkNext = () => {},
  isMobile = false
}: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownClick = (action: () => void) => {
    console.log('Dropdown menu item clicked')
    action()
    setIsDropdownOpen(false)
  }

  const handleDropdownTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Dropdown trigger clicked, current state:', isDropdownOpen)
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <Card 
      className="group cursor-pointer transition-all hover:shadow-lg border-border relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRead(bookmark.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="w-4 h-4 bg-muted rounded-sm flex items-center justify-center shrink-0">
                <ExternalLink className="w-2 h-2 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground truncate flex-1 min-w-0">
                {new URL(bookmark.url).hostname}
              </span>
              <Badge variant={bookmark.isRead ? "secondary" : "default"} className="text-xs shrink-0">
                {bookmark.isRead ? "Read" : "Unread"}
              </Badge>
            </div>
            <h3 className="font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
              {bookmark.title}
            </h3>
          </div>
          
          {/* Custom Dropdown */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 shrink-0 ${
                isMobile 
                  ? 'opacity-100' 
                  : `opacity-0 group-hover:opacity-100 transition-opacity ${isHovered || isDropdownOpen ? 'opacity-100' : ''}`
              }`}
              onClick={handleDropdownTriggerClick}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {isDropdownOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-90" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 z-100 min-w-44 bg-popover text-popover-foreground rounded-md border shadow-md p-1">
                  <div 
                    onClick={() => handleDropdownClick(() => onRead(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read Now
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onMarkRead(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <Check className="h-4 w-4" />
                    {bookmark.isRead ? "Mark Unread" : "Mark Read"}
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onSummary(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileText className="h-4 w-4" />
                    Summary
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onMarkNext(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <Star className="h-4 w-4" />
                    Mark as Next to Read
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onShare(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onArchive(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    <Archive className="h-4 w-4" />
                    Archive
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onNotInterested(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                  >
                    <Clock className="h-4 w-4" />
                    Not Interested
                  </div>
                  <div 
                    onClick={() => handleDropdownClick(() => onDelete(bookmark.id))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {bookmark.snippet}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex flex-wrap gap-1 min-w-0">
            {bookmark.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {bookmark.tags.length > (isMobile ? 2 : 3) && (
              <Badge variant="outline" className="text-xs">
                +{bookmark.tags.length - (isMobile ? 2 : 3)}
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {new Date(bookmark.createdAt).toISOString().slice(0, 10)}
          </span>
        </div>

        {/* Action buttons - shown on hover or always on mobile */}
        <div className={`flex items-center gap-1 mt-4 transition-opacity overflow-hidden ${
          isMobile ? 'opacity-100' : (isHovered ? 'opacity-100' : 'opacity-0')
        }`}>
          <Button 
            size="sm" 
            onClick={(e) => { e.stopPropagation(); onRead(bookmark.id) }}
            className="h-6 sm:h-7 text-xs flex-1 min-w-0 px-1 sm:px-2"
          >
            <BookOpen className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" />
            <span className="truncate text-xs">Read</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => { e.stopPropagation(); onMarkRead(bookmark.id) }}
            className="h-6 sm:h-7 text-xs min-w-0 shrink-0 px-1 sm:px-2"
          >
            <Check className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" />
            <span className="truncate hidden sm:inline text-xs">{bookmark.isRead ? "Unread" : "Read"}</span>
            <span className="truncate sm:hidden text-xs">{bookmark.isRead ? "❌" : "✓"}</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => { e.stopPropagation(); onSummary(bookmark.id) }}
            className="h-6 sm:h-7 text-xs min-w-0 shrink-0 px-1 sm:px-2"
          >
            <FileText className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" />
            <span className="truncate hidden sm:inline text-xs">Summary</span>
            <span className="truncate sm:hidden text-xs">Sum</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}