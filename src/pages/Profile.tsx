
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Package, Heart } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">First Name</label>
                      <p className="text-foreground">Adunni</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                      <p className="text-foreground">Adebayo</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        adunni@example.com
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        +234 801 234 5678
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="text-foreground flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      123 Adire Street, Lagos, Nigeria
                    </p>
                  </div>
                  <Button className="mt-4">Edit Profile</Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Order History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
