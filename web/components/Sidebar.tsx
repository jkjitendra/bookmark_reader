"use client";
import { Bookmark, Eye, EyeOff, Tag, Users, Filter } from "lucide-react"
// import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface SidebarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = [
  { id: "all", label: "All", icon: Bookmark, count: 142 },
  { id: "unread", label: "Unread", icon: EyeOff, count: 24 },
  { id: "read", label: "Read", icon: Eye, count: 118 },
  { id: "tags", label: "Tags", icon: Tag, count: 38 },
  { id: "shared", label: "Shared", icon: Users, count: 12 }
]

export function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
  const filters = ["all", "unread", "read", "tags", "shared"];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-sidebar-foreground" />
          <span className="font-medium text-sidebar-foreground">Filters</span>
        </div>
        
        <div className="space-y-1">
          {filters.map((filter) => {
            // const Icon = filter.icon
            // const isActive = activeFilter === filter.id
            
            return (
              // <Button
              //   key={filter.id}
              //   variant={isActive ? "secondary" : "ghost"}
              //   className={`w-full justify-start h-10 px-3 ${
              //     isActive 
              //       ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary" 
              //       : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              //   }`}
              //   onClick={() => onFilterChange(filter.id)}
              // >
              //   <Icon className="h-4 w-4 mr-3" />
              //   <span className="flex-1 text-left">{filter.label}</span>
              //   <Badge variant="secondary" className="ml-2 text-xs">
              //     {filter.count}
              //   </Badge>
              // </Button>
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`block w-full text-left px-3 py-2 rounded ${
                  activeFilter === filter ? "bg-foreground text-background" : "text-slate-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "React", "Design", "AI", "Tech News"].map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-sidebar-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}