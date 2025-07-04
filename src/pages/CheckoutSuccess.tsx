
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, Package, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const { toast } = useToast();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) throw error;

      setOrderData(data);
      
      if (data.session_status === 'complete' && data.payment_status === 'paid') {
        toast({
          title: "Payment Successful!",
          description: "Your order has been confirmed and is being processed.",
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Error",
        description: "Failed to verify payment status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Verifying your payment...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isSuccess = orderData?.session_status === 'complete' && orderData?.payment_status === 'paid';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {isSuccess ? <Check className="h-8 w-8" /> : <Package className="h-8 w-8" />}
              </div>
              <CardTitle className="text-2xl">
                {isSuccess ? 'Order Confirmed!' : 'Payment Failed'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSuccess ? (
                <>
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">
                      Thank you for your purchase! Your order has been successfully placed and is being processed.
                    </p>
                    {orderData?.order && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-medium">Order Number: {orderData.order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: ₦{(orderData.order.total_amount / 100).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      You will receive an email confirmation shortly with your order details and tracking information.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/order-history">
                        <Button variant="outline" className="w-full sm:w-auto">
                          View Order History
                        </Button>
                      </Link>
                      <Link to="/categories">
                        <Button className="w-full sm:w-auto">
                          Continue Shopping
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">
                      We encountered an issue processing your payment. Please try again or contact support if the problem persists.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Link to="/checkout">
                      <Button>
                        Try Again
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
