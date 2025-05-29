
import { useState, useEffect } from "react";
import { CreditCard, MapPin, Package, Check, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days: number;
}

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("");
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const fetchShippingMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('shipping_methods')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setShippingMethods(data || []);
      if (data && data.length > 0) {
        setSelectedShippingMethod(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching shipping methods:', error);
      toast({
        title: "Error",
        description: "Failed to load shipping methods",
        variant: "destructive",
      });
    }
  };

  const subtotal = totalPrice;
  const selectedShipping = shippingMethods.find(m => m.id === selectedShippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingData[field as keyof typeof shippingData].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!validateForm()) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      await processPayment();
    }
  };

  const processPayment = async () => {
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: items,
          shippingData,
          paymentMethod,
          shippingMethodId: selectedShippingMethod
        }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
        clearCart();
        navigate('/');
        toast({
          title: "Redirecting to payment",
          description: "You will be redirected to complete your payment",
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
            <Button onClick={() => navigate('/categories')}>
              Continue Shopping
            </Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-8">
            {[
              { number: 1, title: "Shipping", icon: MapPin },
              { number: 2, title: "Payment", icon: CreditCard },
              { number: 3, title: "Review", icon: Package }
            ].map(({ number, title, icon: Icon }) => (
              <div key={number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= number 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground text-muted-foreground"
                }`}>
                  {step > number ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= number ? "text-primary font-medium" : "text-muted-foreground"
                }`}>
                  {title}
                </span>
                {number < 3 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step > number ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          value={shippingData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          value={shippingData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={shippingData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={shippingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input 
                        id="address" 
                        value={shippingData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          value={shippingData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select 
                          value={shippingData.state} 
                          onValueChange={(value) => handleInputChange('state', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lagos">Lagos</SelectItem>
                            <SelectItem value="abuja">Abuja</SelectItem>
                            <SelectItem value="kano">Kano</SelectItem>
                            <SelectItem value="ogun">Ogun</SelectItem>
                            <SelectItem value="rivers">Rivers</SelectItem>
                            <SelectItem value="oyo">Oyo</SelectItem>
                            <SelectItem value="kaduna">Kaduna</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input 
                          id="zipCode" 
                          value={shippingData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    
                    {/* Shipping Methods */}
                    <div className="mt-6">
                      <Label>Shipping Method *</Label>
                      <RadioGroup 
                        value={selectedShippingMethod} 
                        onValueChange={setSelectedShippingMethod}
                        className="mt-2"
                      >
                        {shippingMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="flex items-center justify-between cursor-pointer">
                                <div>
                                  <div className="flex items-center">
                                    <Truck className="h-4 w-4 mr-2" />
                                    <span className="font-medium">{method.name}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{method.description}</p>
                                  <p className="text-sm text-muted-foreground">{method.estimated_days} business days</p>
                                </div>
                                <span className="font-semibold">₦{(method.price / 100).toLocaleString()}</span>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="stripe" id="stripe" />
                          <Label htmlFor="stripe">Credit/Debit Card (Stripe)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to Stripe to complete your payment securely with your credit or debit card.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Review Your Order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{shippingData.firstName} {shippingData.lastName}</p>
                        <p>{shippingData.address}</p>
                        <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                        <p>{shippingData.phone}</p>
                        <p>{shippingData.email}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Shipping Method</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedShipping?.name} - ₦{selectedShipping ? (selectedShipping.price / 100).toLocaleString() : '0'}
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Method</h4>
                      <p className="text-sm text-muted-foreground">Credit/Debit Card (Stripe)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Processing..." : (step === 3 ? "Place Order" : "Continue")}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">₦{((item.price * item.quantity) / 100).toLocaleString()}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{(subtotal / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₦{(shippingCost / 100).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₦{(total / 100).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
