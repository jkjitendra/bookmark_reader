import { X, Clock, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface NotificationPopupProps {
  isVisible: boolean
  title: string
  snippet: string
  onReadNow: () => void
  onSnooze: () => void
  onDismiss: () => void
}

export function NotificationPopup({
  isVisible,
  title,
  snippet,
  onReadNow,
  onSnooze,
  onDismiss
}: NotificationPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 100, x: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className="w-96 max-w-[calc(100vw-2rem)] shadow-lg border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">New Article</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 -mt-1 -mr-1"
                  onClick={onDismiss}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <h4 className="font-medium mb-2 leading-tight">
                {title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {snippet}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" onClick={onReadNow} className="h-9 px-4 text-sm font-medium flex-1">
                  <BookOpen className="w-3 h-3 mr-2 shrink-0" />
                  <span>Read Now</span>
                </Button>
                <div className="flex gap-2 flex-1">
                  <Button size="sm" variant="outline" onClick={onSnooze} className="h-9 px-3 text-sm font-medium flex-1">
                    <Clock className="w-3 h-3 mr-1 shrink-0" />
                    <span>Snooze</span>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={onDismiss} className="h-9 px-3 text-sm font-medium flex-1">
                    <span>Dismiss</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}