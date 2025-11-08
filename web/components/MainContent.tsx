"use client";

import { BookmarkCard } from "./BookmarkCard"
import { Button } from "./ui/button"
import { Pagination } from "./ui/pagination"
import { Grid, List, Plus, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

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

interface MainContentProps {
  bookmarks: Bookmark[]
  activeFilter: string
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onBookmarkRead: (id: string) => void
  onBookmarkMarkRead: (id: string) => void
  onBookmarkSummary: (id: string) => void
  onBookmarkDelete: (id: string) => void
  onBookmarkShare: (id: string) => void
  onBookmarkArchive?: (id: string) => void
  onBookmarkNotInterested?: (id: string) => void
  onBookmarkMarkNext?: (id: string) => void
  isMobile?: boolean
}

export function MainContent({
  bookmarks,
  activeFilter,
  viewMode,
  onViewModeChange,
  onBookmarkRead,
  onBookmarkMarkRead,
  onBookmarkSummary,
  onBookmarkDelete,
  onBookmarkShare,
  onBookmarkArchive = () => {},
  onBookmarkNotInterested = () => {},
  onBookmarkMarkNext = () => {},
  isMobile = false
}: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredBookmarks = useMemo(() => {
    let filtered = bookmarks

    // Apply filter
    switch (activeFilter) {
      case "unread":
        filtered = filtered.filter(b => !b.isRead)
        break
      case "read":
        filtered = filtered.filter(b => b.isRead)
        break
      case "tags":
        filtered = filtered.filter(b => b.tags.length > 0)
        break
      case "shared":
        // Mock shared filter - in real app this would be actual shared bookmarks
        filtered = filtered.slice(0, Math.floor(filtered.length * 0.3))
        break
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [bookmarks, activeFilter, searchQuery, sortBy])

  const totalPages = Math.ceil(filteredBookmarks.length / itemsPerPage)
  const paginatedBookmarks = filteredBookmarks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold capitalize">
                {activeFilter === "all" ? "All Bookmarks" : activeFilter}
              </h2>
              <p className="text-muted-foreground">
                {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button className="self-start sm:self-auto">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Bookmark</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>

              {!isMobile && (
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-l-md"
                    onClick={() => onViewModeChange('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-r-md"
                    onClick={() => onViewModeChange('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        {paginatedBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No bookmarks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No bookmarks match "${searchQuery}"`
                : "No bookmarks in this category"
              }
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className={
              viewMode === 'grid' || isMobile
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-4"
            }>
              {paginatedBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onRead={onBookmarkRead}
                  onMarkRead={onBookmarkMarkRead}
                  onSummary={onBookmarkSummary}
                  onDelete={onBookmarkDelete}
                  onShare={onBookmarkShare}
                  onArchive={onBookmarkArchive}
                  onNotInterested={onBookmarkNotInterested}
                  onMarkNext={onBookmarkMarkNext}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 text-muted-foreground">...</span>
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}