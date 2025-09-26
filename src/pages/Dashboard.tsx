import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Users,
  MessageSquare
} from "lucide-react"

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Sales",
      value: "$12,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      gradient: "bg-gradient-primary"
    },
    {
      title: "Products in Stock",
      value: "248",
      change: "-3",
      changeType: "negative" as const,
      icon: Package,
      gradient: "bg-gradient-success"
    },
    {
      title: "Orders Today",
      value: "23",
      change: "+8",
      changeType: "positive" as const,
      icon: ShoppingCart,
      gradient: "bg-gradient-warning"
    },
    {
      title: "Active Customers",
      value: "1,542",
      change: "+28",
      changeType: "positive" as const,
      icon: Users,
      gradient: "bg-gradient-primary"
    },
  ]

  const recentOrders = [
    { id: "#ORD-2024-001", customer: "John Doe", amount: "$156.90", status: "completed" },
    { id: "#ORD-2024-002", customer: "Jane Smith", amount: "$89.50", status: "pending" },
    { id: "#ORD-2024-003", customer: "Mike Johnson", amount: "$234.00", status: "processing" },
    { id: "#ORD-2024-004", customer: "Sarah Wilson", amount: "$67.25", status: "completed" },
  ]

  const lowStockProducts = [
    { name: "Wireless Headphones", stock: 5, sku: "WH-001" },
    { name: "Gaming Mouse", stock: 8, sku: "GM-002" },
    { name: "USB Cable", stock: 3, sku: "UC-003" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground'
      case 'pending': return 'bg-warning text-warning-foreground'
      case 'processing': return 'bg-info text-info-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-light min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
        <Badge variant="secondary" className="text-sm bg-white/80 text-primary border-primary/20">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-light hover:shadow-card transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary/70">
                {metric.title}
              </CardTitle>
              <div className={`p-3 rounded-lg ${metric.gradient} shadow-light`}>
                <metric.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className={`text-xs flex items-center mt-1 ${
                metric.changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Orders */}
        <Card className="shadow-light bg-white/70 backdrop-blur-sm border-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{order.amount}</div>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="shadow-light bg-white/70 backdrop-blur-sm border-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Package className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                  </div>
                  <Badge variant="destructive">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard