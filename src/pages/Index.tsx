
import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with modern fashion design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                  New Collection 2024
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Modern
                  <br />
                  <span className="text-primary">Adire</span>
                  <br />
                  <span className="text-accent">Luxury</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Experience the perfect fusion of traditional Nigerian craftsmanship and contemporary fashion.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/categories">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 h-14 rounded-full">
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/learn-about-adire">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-14 rounded-full border-2">
                    Our Heritage
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-muted-foreground">Unique Pieces</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-muted-foreground">Handcrafted</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-muted-foreground">Master Artisans</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hero Images */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {/* Main large image */}
                <div className="col-span-2 lg:col-span-1 relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/lovable-uploads/a7ef2da9-2247-4f05-ba5c-efec7d892e59.png"
                      alt="Elegant Adire Fashion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent/20 rounded-full"></div>
                </div>
                
                {/* Secondary images */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/lovable-uploads/ab886f50-4cd4-443a-b09b-0ac7308a40d4.png"
                      alt="Contemporary Adire"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/lovable-uploads/355df207-3821-40c0-8e48-0fb4f935a122.png"
                      alt="Modern Adire Set"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 -left-8 w-16 h-16 bg-primary/10 rounded-full"></div>
              <div className="absolute bottom-1/3 -right-6 w-12 h-12 bg-accent/15 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Free Shipping</h3>
              <p className="text-muted-foreground">Complimentary delivery on orders above ₦50,000</p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Authenticity Guarantee</h3>
              <p className="text-muted-foreground">100% authentic handcrafted adire pieces</p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Easy Returns</h3>
              <p className="text-muted-foreground">Hassle-free 30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Curated Collection
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">Featured Pieces</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our most celebrated adire pieces, each meticulously crafted to tell a unique story through traditional patterns and vibrant colors.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-xl mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {products?.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_url}
                  category={product.category}
                  color={product.color}
                />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-14 rounded-full border-2">
                View Complete Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Customer Love
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adunni Okafor",
                review: "The craftsmanship is extraordinary. Each piece tells a beautiful story of our heritage while being perfectly modern."
              },
              {
                name: "Kemi Adeleke", 
                review: "I've never received so many compliments on my outfit. The quality and attention to detail is unmatched."
              },
              {
                name: "Folake Ibrahim",
                review: "JUWURA has redefined how I see traditional fashion. These pieces are true works of art."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="flex items-center space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
