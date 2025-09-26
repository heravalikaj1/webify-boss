import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, Calendar, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const News = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState("all")
  
  // Mock data - in real app this would come from API
  const [content, setContent] = useState([
    {
      id: 1,
      title: "New Product Launch: Wireless Earbuds Pro",
      type: "news",
      excerpt: "Introducing our latest wireless earbuds with advanced noise cancellation...",
      content: "We're excited to announce the launch of our new Wireless Earbuds Pro, featuring cutting-edge noise cancellation technology and 30-hour battery life.",
      date: "2024-01-15",
      status: "published",
      author: "Admin"
    },
    {
      id: 2,
      title: "Gaming Mechanical Keyboard",
      type: "product_description",
      excerpt: "Professional gaming keyboard with RGB lighting and mechanical switches...",
      content: "Our premium gaming keyboard features Cherry MX switches, customizable RGB lighting, and programmable macro keys for the ultimate gaming experience.",
      date: "2024-01-14",
      status: "published",
      author: "Admin"
    },
    {
      id: 3,
      title: "Holiday Sale Announcement",
      type: "news",
      excerpt: "Big discounts on all electronics this holiday season...",
      content: "Don't miss our biggest sale of the year! Get up to 50% off on selected electronics, including headphones, keyboards, and accessories.",
      date: "2024-01-13",
      status: "draft",
      author: "Admin"
    },
    {
      id: 4,
      title: "Ultra HD Monitor Series",
      type: "product_description",
      excerpt: "Professional monitors for designers and gamers...",
      content: "Experience crystal-clear visuals with our new Ultra HD monitor series, featuring 4K resolution, HDR support, and 144Hz refresh rate.",
      date: "2024-01-12",
      status: "published",
      author: "Admin"
    }
  ])

  const [newContent, setNewContent] = useState({
    title: "",
    type: "news",
    excerpt: "",
    content: "",
    status: "draft"
  })

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesType
  })

  const handleAddContent = () => {
    if (!newContent.title || !newContent.excerpt || !newContent.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const contentItem = {
      id: content.length + 1,
      ...newContent,
      date: new Date().toISOString().split('T')[0],
      author: "Admin"
    }

    setContent([contentItem, ...content])
    setNewContent({ title: "", type: "news", excerpt: "", content: "", status: "draft" })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Success",
      description: "Content added successfully"
    })
  }

  const handleDeleteContent = (id: number) => {
    setContent(content.filter(c => c.id !== id))
    toast({
      title: "Success",
      description: "Content deleted successfully"
    })
  }

  const handleToggleStatus = (id: number) => {
    setContent(content.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
        : item
    ))
    toast({
      title: "Success",
      description: "Content status updated"
    })
  }

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'success' : 'warning'
  }

  const getTypeColor = (type: string) => {
    return type === 'news' ? 'info' : 'success'
  }

  const getTypeLabel = (type: string) => {
    return type === 'news' ? 'News' : 'Product Description'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">News & Content Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                  placeholder="Enter content title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Content Type *</Label>
                  <Select 
                    value={newContent.type} 
                    onValueChange={(value) => setNewContent({ ...newContent, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News Article</SelectItem>
                      <SelectItem value="product_description">Product Description</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newContent.status} 
                    onValueChange={(value) => setNewContent({ ...newContent, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={newContent.excerpt}
                  onChange={(e) => setNewContent({ ...newContent, excerpt: e.target.value })}
                  placeholder="Brief description or excerpt..."
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={newContent.content}
                  onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  placeholder="Full content..."
                  rows={6}
                />
              </div>
              <Button onClick={handleAddContent} className="w-full bg-gradient-primary">
                Add Content
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search content by title or excerpt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="news">News Articles</SelectItem>
                <SelectItem value="product_description">Product Descriptions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                <p className="text-2xl font-bold">{content.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{content.filter(c => c.status === 'published').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{content.filter(c => c.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Content ({filteredContent.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.excerpt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(item.type)}>
                      {getTypeLabel(item.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusColor(item.status)}
                      className="cursor-pointer"
                      onClick={() => handleToggleStatus(item.id)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteContent(item.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default News