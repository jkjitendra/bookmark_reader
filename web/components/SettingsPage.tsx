import {
  Settings,
  RefreshCw,
  Bell,
  User,
  Palette,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPage({
  isOpen,
  onClose,
}: SettingsPageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Manage your bookmark application preferences, sync settings, notifications, account details, and appearance.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="sync" className="flex h-full">
            <TabsList className="flex flex-col h-full w-48 p-2 bg-muted/50">
              <TabsTrigger
                value="sync"
                className="w-full justify-start"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="w-full justify-start"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="w-full justify-start"
              >
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {/* Sync Tab */}
              <TabsContent
                value="sync"
                className="p-6 m-0 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Sync Settings
                  </h3>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cloud Sync</CardTitle>
                      <CardDescription>
                        Automatically sync your bookmarks across
                        all devices
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync">
                          Enable automatic sync
                        </Label>
                        <Switch id="auto-sync" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-tags">
                          Sync tags and folders
                        </Label>
                        <Switch id="sync-tags" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-summaries">
                          Sync summaries
                        </Label>
                        <Switch
                          id="sync-summaries"
                          defaultChecked
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Sync frequency</Label>
                        <Select defaultValue="realtime">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">
                              Real-time
                            </SelectItem>
                            <SelectItem value="hourly">
                              Every hour
                            </SelectItem>
                            <SelectItem value="daily">
                              Daily
                            </SelectItem>
                            <SelectItem value="manual">
                              Manual only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full">
                        Force Sync Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent
                value="notifications"
                className="p-6 m-0 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Notification Preferences
                  </h3>

                  <Card>
                    <CardHeader>
                      <CardTitle>Push Notifications</CardTitle>
                      <CardDescription>
                        Get notified about new articles and
                        updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-articles">
                          New articles from subscriptions
                        </Label>
                        <Switch
                          id="new-articles"
                          defaultChecked
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="shared-bookmarks">
                          Shared bookmarks
                        </Label>
                        <Switch
                          id="shared-bookmarks"
                          defaultChecked
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="comments">
                          Comments and replies
                        </Label>
                        <Switch id="comments" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="weekly-digest">
                          Weekly digest
                        </Label>
                        <Switch id="weekly-digest" />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Quiet hours</Label>
                        <div className="flex gap-2">
                          <Select defaultValue="22:00">
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="From" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 24 },
                                (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={`${i}:00`}
                                  >
                                    {String(i).padStart(2, "0")}
                                    :00
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <Select defaultValue="08:00">
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="To" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 24 },
                                (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={`${i}:00`}
                                  >
                                    {String(i).padStart(2, "0")}
                                    :00
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent
                value="account"
                className="p-6 m-0 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Account Settings
                  </h3>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">
                          Full Name
                        </Label>
                        <Input
                          id="full-name"
                          defaultValue="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="johndoe"
                        />
                      </div>

                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>
                        Manage your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Change Password
                      </Button>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor">
                          Two-factor authentication
                        </Label>
                        <Switch id="two-factor" />
                      </div>

                      <Button
                        variant="destructive"
                        className="w-full"
                      >
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent
                value="appearance"
                className="p-6 m-0 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Appearance Settings
                  </h3>

                  <Card>
                    <CardHeader>
                      <CardTitle>Theme</CardTitle>
                      <CardDescription>
                        Choose your preferred theme
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme mode</Label>
                        <Select defaultValue="system">
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              Light
                            </SelectItem>
                            <SelectItem value="dark">
                              Dark
                            </SelectItem>
                            <SelectItem value="system">
                              System
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Accent color</Label>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-ring cursor-pointer"></div>
                          <div className="w-8 h-8 rounded-full bg-green-500 border cursor-pointer"></div>
                          <div className="w-8 h-8 rounded-full bg-purple-500 border cursor-pointer"></div>
                          <div className="w-8 h-8 rounded-full bg-red-500 border cursor-pointer"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Layout</CardTitle>
                      <CardDescription>
                        Customize the layout of your dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default view</Label>
                        <Select defaultValue="grid">
                          <SelectTrigger>
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">
                              Grid
                            </SelectItem>
                            <SelectItem value="list">
                              List
                            </SelectItem>
                            <SelectItem value="compact">
                              Compact
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-sidebar">
                          Show sidebar by default
                        </Label>
                        <Switch
                          id="show-sidebar"
                          defaultChecked
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="compact-mode">
                          Compact mode
                        </Label>
                        <Switch id="compact-mode" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}