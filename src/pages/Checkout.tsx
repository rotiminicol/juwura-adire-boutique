
import { useState } from "react";
import { CreditCard, MapPin, Package, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const orderItems = [
  {
    id: "1",
    name: "Classic Indigo Adire Dress",
    price: 25000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=150&fit=crop",
    size: "M",
    quantity: 1
  },
  {
    id: "2",
    name: "Traditional Adire Wrapper",
    price: 18000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=150&fit=crop",
    size: "L",
    quantity: 2
  }
];

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment
      console.log("Processing payment...");
    }
  };

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
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lagos">Lagos</SelectItem>
                            <SelectItem value="abuja">Abuja</SelectItem>
                            <SelectItem value="kano">Kano</SelectItem>
                            <SelectItem value="ogun">Ogun</SelectItem>
                            <SelectItem value="rivers">Rivers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input id="zipCode" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank">Bank Transfer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paystack" id="paystack" />
                          <Label htmlFor="paystack">Paystack</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" required />
                        </div>
                      </>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Please transfer the total amount to:
                        </p>
                        <div className="text-sm space-y-1">
                          <p><strong>Bank:</strong> Guaranty Trust Bank</p>
                          <p><strong>Account Name:</strong> JUWURA FASHION LTD</p>
                          <p><strong>Account Number:</strong> 0123456789</p>
                          <p><strong>Reference:</strong> Your order number will be provided</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paystack" && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to Paystack to complete your payment securely.
                        </p>
                      </div>
                    )}
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
                        <p>John Doe</p>
                        <p>123 Adire Street, Victoria Island</p>
                        <p>Lagos, Lagos State 101001</p>
                        <p>+234 803 123 4567</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Method</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod}
                      </p>
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
                <Button type="submit" className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  {step === 3 ? "Place Order" : "Continue"}
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
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₦{total.toLocaleString()}</span>
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
