"use client";

import { Users, MessageCircle, Share2, Plus, MoreHorizontal, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { useState } from "react"

interface CollaborationPanelProps {
  isOpen: boolean
  onClose?: () => void
}

export function CollaborationPanel({ isOpen, onClose }: CollaborationPanelProps) {
  const [newComment, setNewComment] = useState("")

  const sharedGroups = [
    {
      id: "1",
      name: "Design Team",
      members: 5,
      avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"]
    },
    {
      id: "2", 
      name: "Frontend Devs",
      members: 8,
      avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
    },
    {
      id: "3",
      name: "Product Research",
      members: 3,
      avatars: ["/api/placeholder/32/32"]
    }
  ]

  const sharedBookmarks = [
    {
      id: "1",
      title: "The Future of Web Design",
      sharedBy: "Alice Johnson",
      sharedAt: "2024-01-15T10:30:00Z",
      comments: 3
    },
    {
      id: "2",
      title: "React Performance Tips",
      sharedBy: "Bob Smith", 
      sharedAt: "2024-01-14T15:45:00Z",
      comments: 7
    },
    {
      id: "3",
      title: "UX Research Methods",
      sharedBy: "Carol Davis",
      sharedAt: "2024-01-14T09:20:00Z", 
      comments: 2
    }
  ]

  const comments = [
    {
      id: "1",
      author: "Alice Johnson",
      avatar: "/api/placeholder/32/32",
      content: "This is a great resource for understanding modern design principles. The section on accessibility is particularly insightful.",
      timestamp: "2024-01-15T14:30:00Z",
      replies: [
        {
          id: "1-1",
          author: "Bob Smith", 
          avatar: "/api/placeholder/32/32",
          content: "I agree! Have you seen their follow-up article on implementation strategies?",
          timestamp: "2024-01-15T15:00:00Z"
        }
      ]
    },
    {
      id: "2",
      author: "Carol Davis",
      avatar: "/api/placeholder/32/32", 
      content: "We should definitely apply these concepts to our current project. I'll add this to our design system documentation.",
      timestamp: "2024-01-15T16:15:00Z",
      replies: []
    }
  ]

  if (!isOpen) return null

  return (
    <div className={`${onClose ? 'w-full h-full' : 'w-96 h-full'} bg-card ${onClose ? '' : 'border-l'} border-border flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
            <Users className="w-4 h-4" />
            Collaboration
          </h2>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Plus className="w-3 h-3 mr-1" />
              Invite
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scroll-smooth touch-pan-y">
          <div className="flex flex-col">
            {/* Shared Groups */}
            <div className="p-3 sm:p-4 border-b border-border">
              <h3 className="font-medium mb-3 text-sm sm:text-base">Shared Groups</h3>
              <div className="max-h-24 xs:max-h-28 sm:max-h-32 md:max-h-40 lg:max-h-48 overflow-y-auto scrollbar-thin scroll-smooth touch-pan-y">
                <div className="space-y-2 pr-1 sm:pr-2">
                {sharedGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer focus-within:ring-2 focus-within:ring-ring transition-all"
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        console.log(`Selected group: ${group.name}`)
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex -space-x-2">
                        {group.avatars.slice(0, 3).map((avatar, index) => (
                          <Avatar key={index} className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-background">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="text-xs">U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium truncate">{group.name}</div>
                        <div className="text-xs text-muted-foreground">{group.members} members</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                {/* Add more mock groups for scrolling demo */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={`extra-${i}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex -space-x-2">
                        <Avatar className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-background">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback className="text-xs">U</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium truncate">Team {i + 4}</div>
                        <div className="text-xs text-muted-foreground">{2 + i} members</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Recent Searches/Shared Bookmarks */}
            <div className="p-3 sm:p-4 border-b border-border">
              <h3 className="font-medium mb-3 text-sm sm:text-base">Recent Searches</h3>
              <div className="max-h-28 xs:max-h-32 sm:max-h-36 md:max-h-44 lg:max-h-52 overflow-y-auto scrollbar-thin scroll-smooth touch-pan-y">
                <div className="space-y-2 pr-1 sm:pr-2">
                {sharedBookmarks.map((bookmark) => (
                  <div 
                    key={bookmark.id} 
                    className="p-2 rounded-lg hover:bg-muted cursor-pointer focus:ring-2 focus:ring-ring transition-all"
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        console.log(`Selected bookmark: ${bookmark.title}`)
                      }
                    }}
                  >
                    <div className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{bookmark.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground truncate min-w-0 flex-1 mr-2">
                        by {bookmark.sharedBy}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{bookmark.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Add more mock searches for scrolling demo */}
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`search-${i}`} className="p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <div className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">Search Result {i + 1}: Advanced JavaScript Techniques</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground truncate min-w-0 flex-1 mr-2">
                        by User {i + 1}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{i + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Comments Section */}
            <div className="flex-1">
              <div className="p-3 sm:p-4 border-b border-border">
                <h3 className="font-medium text-sm sm:text-base">Comments</h3>
              </div>
              
              <div className="p-3 sm:p-4 pb-16 sm:pb-20 md:pb-24">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback className="text-xs">{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 wrap-break-word">{comment.content}</p>
                          
                          {/* Replies */}
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2 mt-3 ml-4">
                              <Avatar className="w-6 h-6 shrink-0">
                                <AvatarImage src={reply.avatar} />
                                <AvatarFallback className="text-xs">{reply.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-medium">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(reply.timestamp).toLocaleTimeString()}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground wrap-break-word">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                          
                          <Button variant="ghost" size="sm" className="h-6 text-xs mt-2">
                            Reply
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                  {/* Add more mock comments for scrolling demo */}
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={`mock-comment-${i}`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-medium">User {i + 3}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date().toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 wrap-break-word">
                            This is a sample comment to demonstrate scrolling functionality. {i % 2 === 0 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Great insights shared here!'}
                          </p>
                          <Button variant="ghost" size="sm" className="h-6 text-xs mt-2">
                            Reply
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Comment Input - Fixed at bottom */}
      <div className="p-3 sm:p-4 border-t border-border shrink-0 bg-card">
        <div className="flex gap-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-10 sm:min-h-[50px] text-sm resize-none"
            rows={2}
          />
        </div>
        <div className="flex justify-end mt-2 mr-2 mb-2 sm:mr-4 sm:mb-3 md:mr-6 md:mb-4">
          <Button size="sm" disabled={!newComment.trim()} className="text-xs h-8 px-4">
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}