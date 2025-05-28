
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, MapPin, CreditCard } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  shipping_address: any;
  items: any[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll use mock data since we don't have user authentication
    // In a real app, this would fetch from Supabase based on the logged-in user
    const mockOrders: Order[] = [
      {
        id: "1",
        order_number: "JUW-20241128-0001",
        created_at: "2024-11-28T10:30:00Z",
        total_amount: 45000,
        order_status: "delivered",
        payment_status: "paid",
        shipping_address: {
          street_address: "123 Lagos Street",
          city: "Lagos",
          state: "Lagos",
          country: "Nigeria"
        },
        items: [
          { name: "Blue Adire Kaftan", quantity: 1, unit_price: 45000 }
        ]
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Order History</h1>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Order History</h1>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.order_number}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">₦{(order.total_amount / 100).toLocaleString()}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getStatusColor(order.order_status)}>
                            {order.order_status}
                          </Badge>
                          <Badge variant="outline">
                            {order.payment_status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <Package className="h-4 w-4 mr-2" />
                          Items
                        </h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          <p>{order.shipping_address.street_address}</p>
                          <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                          <p>{order.shipping_address.country}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-4">No orders found</p>
              <p className="text-muted-foreground">Start shopping to see your orders here!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
