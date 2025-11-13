"use client";

import { Search, Bell, Settings, User, Sun, Moon, LogOut, UserCircle, CreditCard, HelpCircle, Users, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import { useState } from "react"

interface TopNavigationProps {
  onSettingsClick: () => void
  isDarkMode: boolean
  onDarkModeToggle: (isDark: boolean) => void
}

export function TopNavigation({ onSettingsClick, isDarkMode, onDarkModeToggle }: TopNavigationProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleProfileClick = () => {
    console.log('Profile clicked')
    setIsUserMenuOpen(false)
    // In a real app, this would navigate to profile page
  }

  const handleTeamClick = () => {
    console.log('Team clicked')
    setIsUserMenuOpen(false)
    // In a real app, this would navigate to team page
  }

  const handleMyBookmarksClick = () => {
    console.log('My Bookmarks clicked')
    setIsUserMenuOpen(false)
    // In a real app, this would filter to user's bookmarks
  }

  const handleBillingClick = () => {
    console.log('Billing clicked')
    setIsUserMenuOpen(false)
    // In a real app, this would navigate to billing page
  }

  const handleHelpClick = () => {
    console.log('Help & Support clicked')
    setIsUserMenuOpen(false)
    // In a real app, this would open help center
  }

  const handleLogoutClick = () => {
    console.log('Logout clicked')
    // In a real app, this would handle user logout
    if (confirm('Are you sure you want to log out?')) {
      console.log('User logged out')
    }
    setIsUserMenuOpen(false)
  }

  const handleUserMenuTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('User menu trigger clicked, current state:', isUserMenuOpen)
    setIsUserMenuOpen(!isUserMenuOpen)
  }
  return (
    <div className="bg-card border-b border-border h-16 px-4 md:px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold">B</span>
        </div>
        <h1 className="font-semibold hidden sm:block">BookmarkHub</h1>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4 md:mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search bookmarks..."
            className="pl-10 bg-input-background border-0"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDarkModeToggle(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        {/* Custom User Dropdown */}
        <div className="relative">
          <Button 
            variant="ghost" 
            className="relative h-8 w-8 rounded-full"
            onClick={handleUserMenuTriggerClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="@user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>

          {isUserMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-90" 
                onClick={() => setIsUserMenuOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 z-100 w-56 bg-popover text-popover-foreground rounded-md border shadow-md p-1">
                {/* User Info */}
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                
                {/* Separator */}
                <div className="bg-border h-px -mx-1 my-1"></div>
                
                {/* Menu Items */}
                <div 
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </div>
                <div 
                  onClick={handleTeamClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Users className="h-4 w-4" />
                  Team
                </div>
                <div 
                  onClick={handleMyBookmarksClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <FileText className="h-4 w-4" />
                  My Bookmarks
                </div>
                
                {/* Separator */}
                <div className="bg-border h-px -mx-1 my-1"></div>
                
                <div 
                  onClick={() => {
                    onSettingsClick()
                    setIsUserMenuOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </div>
                <div 
                  onClick={handleBillingClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <CreditCard className="h-4 w-4" />
                  Billing
                </div>
                <div 
                  onClick={handleHelpClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </div>
                
                {/* Separator */}
                <div className="bg-border h-px -mx-1 my-1"></div>
                
                <div 
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-950 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}