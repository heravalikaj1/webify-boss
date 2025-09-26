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
import { Eye, CheckCircle, XCircle, Search, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Orders = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [responseMessage, setResponseMessage] = useState("")
  
  // Mock data - in real app this would come from API
  const [orders, setOrders] = useState([
    {
      id: "#ORD-2024-001",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      total: 156.90,
      status: "pending",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "USB Cable", quantity: 2, price: 28.45 }
      ],
      shippingAddress: "123 Main St, City, State 12345"
    },
    {
      id: "#ORD-2024-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      total: 89.50,
      status: "completed",
      items: [
        { name: "Gaming Mouse", quantity: 1, price: 49.99 },
        { name: "Mouse Pad", quantity: 1, price: 39.51 }
      ],
      shippingAddress: "456 Oak Ave, Another City, State 67890"
    },
    {
      id: "#ORD-2024-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-01-13",
      total: 234.00,
      status: "rejected",
      items: [
        { name: "Mechanical Keyboard", quantity: 1, price: 234.00 }
      ],
      shippingAddress: "789 Pine Rd, Different City, State 54321"
    }
  ])

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'processing': return 'info'
      case 'rejected': return 'destructive'
      default: return 'secondary'
    }
  }

  const handleOrderAction = (orderId: string, action: 'approve' | 'reject') => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: action === 'approve' ? 'completed' : 'rejected' }
        : order
    ))

    toast({
      title: "Success",
      description: `Order ${action === 'approve' ? 'approved' : 'rejected'} successfully`
    })

    // Here you would also send the response message to the customer
    if (responseMessage.trim()) {
      toast({
        title: "Response Sent",
        description: "Your message has been sent to the customer"
      })
      setResponseMessage("")
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-light min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Order Management</h1>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-sm">
            Total Orders: {orders.length}
          </Badge>
          <Badge className="bg-warning text-warning-foreground">
            Pending: {orders.filter(o => o.status === 'pending').length}
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders by ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Customer Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <div><strong>Name:</strong> {selectedOrder.customer}</div>
                                    <div><strong>Email:</strong> {selectedOrder.email}</div>
                                    <div><strong>Date:</strong> {selectedOrder.date}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                                  <div className="text-sm">{selectedOrder.shippingAddress}</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Order Items</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Product</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead>Price</TableHead>
                                      <TableHead>Subtotal</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedOrder.items.map((item: any, index: number) => (
                                      <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <div className="text-right mt-4">
                                  <strong>Total: ${selectedOrder.total.toFixed(2)}</strong>
                                </div>
                              </div>

                              {selectedOrder.status === 'pending' && (
                                <div>
                                  <h4 className="font-semibold mb-2">Response to Customer</h4>
                                  <Textarea
                                    placeholder="Optional message to send to customer..."
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                  />
                                  <div className="flex gap-2 mt-4">
                                    <Button 
                                      onClick={() => handleOrderAction(selectedOrder.id, 'approve')}
                                      className="bg-gradient-success"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Order
                                    </Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleOrderAction(selectedOrder.id, 'reject')}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Order
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {order.status === 'pending' && (
                        <>
                          <Button 
                            size="sm"
                            onClick={() => handleOrderAction(order.id, 'approve')}
                            className="bg-gradient-success text-xs"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => handleOrderAction(order.id, 'reject')}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
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

export default Orders