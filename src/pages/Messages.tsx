import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Reply, Search, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Messages = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState("")
  
  // Mock data - in real app this would come from API
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Product Inquiry - Wireless Headphones",
      message: "Hi, I'm interested in the wireless headphones. Do they have noise cancellation? Also, what's the battery life like?",
      date: "2024-01-15 14:30",
      status: "unread",
      category: "product_inquiry"
    },
    {
      id: 2,
      name: "David Miller",
      email: "david@example.com",
      subject: "Order Issue",
      message: "I placed an order last week (#ORD-2024-001) but haven't received any updates. Could you please check the status?",
      date: "2024-01-14 09:15",
      status: "replied",
      category: "order_support"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      subject: "Return Request",
      message: "I received the gaming mouse but it's not working properly. The left click seems to be malfunctioning. I'd like to return it.",
      date: "2024-01-13 16:45",
      status: "unread",
      category: "return_request"
    },
    {
      id: 4,
      name: "Alex Brown",
      email: "alex@example.com",
      subject: "Partnership Proposal",
      message: "Hello, I represent a tech review blog and would like to discuss potential partnership opportunities. Could we schedule a call?",
      date: "2024-01-12 11:20",
      status: "unread",
      category: "business"
    }
  ])

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive'
      case 'replied': return 'success'
      case 'pending': return 'warning'
      default: return 'secondary'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product_inquiry': return 'info'
      case 'order_support': return 'warning'
      case 'return_request': return 'destructive'
      case 'business': return 'success'
      default: return 'secondary'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'product_inquiry': return 'Product Inquiry'
      case 'order_support': return 'Order Support'
      case 'return_request': return 'Return Request'
      case 'business': return 'Business'
      default: return 'General'
    }
  }

  const handleReply = (messageId: number) => {
    if (!replyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive"
      })
      return
    }

    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'replied' }
        : msg
    ))

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully"
    })
    
    setReplyMessage("")
    setSelectedMessage(null)
  }

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId && msg.status === 'unread'
        ? { ...msg, status: 'pending' }
        : msg
    ))
  }

  const unreadCount = messages.filter(m => m.status === 'unread').length

  return (
    <div className="space-y-6 p-6 bg-gradient-light min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Contact Messages</h1>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-sm">
            Total Messages: {messages.length}
          </Badge>
          {unreadCount > 0 && (
            <Badge variant="destructive">
              Unread: {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search messages by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className={message.status === 'unread' ? 'bg-muted/30' : ''}>
                  <TableCell>
                    <div>
                      <div className={`font-medium ${message.status === 'unread' ? 'font-bold' : ''}`}>
                        {message.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{message.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className={message.status === 'unread' ? 'font-semibold' : ''}>
                    {message.subject}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryColor(message.category)}>
                      {getCategoryLabel(message.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{message.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(message)
                              handleMarkAsRead(message.id)
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-4">
                              <div className="border-b pb-4">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <strong>From:</strong> {selectedMessage.name}
                                    <br />
                                    <strong>Email:</strong> {selectedMessage.email}
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {selectedMessage.date}
                                    <br />
                                    <strong>Category:</strong> {getCategoryLabel(selectedMessage.category)}
                                  </div>
                                </div>
                                <div>
                                  <strong>Subject:</strong> {selectedMessage.subject}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Message:</h4>
                                <div className="bg-muted p-4 rounded-lg">
                                  {selectedMessage.message}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Reply:</h4>
                                <Textarea
                                  placeholder="Type your reply here..."
                                  value={replyMessage}
                                  onChange={(e) => setReplyMessage(e.target.value)}
                                  rows={6}
                                />
                                <Button 
                                  onClick={() => handleReply(selectedMessage.id)}
                                  className="mt-4 bg-gradient-primary"
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Reply
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Quick Reply to {message.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-sm">
                              <strong>Subject:</strong> Re: {message.subject}
                            </div>
                            <Textarea
                              placeholder="Type your reply here..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              rows={6}
                            />
                            <Button 
                              onClick={() => handleReply(message.id)}
                              className="w-full bg-gradient-primary"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default Messages