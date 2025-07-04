import React from 'react';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

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
      
      {/* Hero Section - Enhanced for Both Mobile and Desktop */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-50 via-stone-50 to-amber-100">
        <div className="container mx-auto px-
4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[90vh] py-8 sm:py-12 lg:py-16">
            {/* Left Content */}
            <motion.div
              className="w-full lg:col-span-5 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div className="space-y-5" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
                <motion.div
                  className="inline-block px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  New Collection 2025
                </motion.div>
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  Modern<br />
                  <span className="text-primary bg-primary/10 px-2 rounded">Adire</span><br />
                  <span className="text-accent">Luxury</span>
                </motion.h1>
                <motion.p
                  className="text-base sm-text-lg lg:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Discover the seamless blend of Nigerian heritage and modern elegance in every handcrafted piece.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link to="/categories" className="flex-1 min-w-0">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 min-w-0">
                    <Button 
                      size="lg" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base px-6 py-3 sm:py-4 rounded-full min-h-[48px] transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/learn-about-adire" className="flex-1 min-w-0">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 min-w-0">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full text-sm sm:text-base px-6 py-3 sm:py-4 rounded-full border-2 min-h-[48px] transition-all duration-300 hover:bg-accent/10 focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      Our Heritage
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              {/* Stats */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div className="text-center lg:text-left min-w-[80px] sm:min-w-[100px]" whileHover={{ scale: 1.05 }}>
                  <div className="text-lg sm:text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Unique Pieces</div>
                </motion.div>
                <motion.div className="text-center lg:text-left min-w-[80px] sm:min-w-[100px]" whileHover={{ scale: 1.05 }}>
                  <div className="text-lg sm:text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Handcrafted</div>
                </motion.div>
                <motion.div className="text-center lg:text-left min-w-[80px] sm:min-w-[100px]" whileHover={{ scale: 1.05 }}>
                  <div className="text-lg sm:text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Master Artisans</div>
                </motion.div>
              </motion.div>
            </motion.div>
            {/* Right Content - Hero Images */}
            <motion.div
              className="w-full lg:col-span-7 relative mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Main large image */}
                <motion.div
                  className="col-span-1 sm:col-span-2 lg:col-span-1 relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
                    <motion.img
                      src="/lovable-uploads/a7ef2da9-2247-4f05-ba5c-efec7d892e59.png"
                      alt="Elegant Adire Fashion"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                      loading="lazy"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent/20 rounded-full hidden sm:block"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  />
                </motion.div>
                {/* Secondary images */}
                <div className="space-y-4 sm:space-y-6 hidden sm:block">
                  <motion.div
                    className="aspect-[4/5] rounded-xl overflow-hidden shadow-md ring-1 ring-border"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
                    whileHover={{ scale: 1.03, rotate: -0.5 }}
                  >
                    <motion.img
                      src="/lovable-uploads/ab886f50-4cd4-443a-b09b-0ac7308a40d4.png"
                      alt="Contemporary Adire"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                      loading="lazy"
                    />
                  </motion.div>
                  <motion.div
                    className="aspect-[4/3] rounded-xl overflow-hidden shadow-md ring-1 ring-border"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                  >
                    <motion.img
                      src="/lovable-uploads/355df207-3821-40c0-8e48-0fb4f935a122.png"
                      alt="Modern Adire Set"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
              {/* Floating decorative elements */}
              <motion.div
                className="hidden lg:block absolute top-1/4 -left-10 w-20 h-20 bg-primary/15 rounded-full"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              />
              <motion.div
                className="hidden lg:block absolute bottom-1/4 -right-8 w-14 h-14 bg-accent/15 rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced for Both */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              className="text-center space-y-4 p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">Free Shipping</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Complimentary delivery on orders above ₦50,000</p>
            </motion.div>
            <motion.div
              className="text-center space-y-4 p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">Authenticity Guarantee</h3>
              <p className="text-sm sm:text-base text-muted-foreground">100% authentic handcrafted adire pieces</p>
            </motion.div>
            <motion.div
              className="text-center space-y-4 p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">Easy Returns</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Hassle-free 30-day return policy</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products - Enhanced for Both */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-10 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium">
              Curated Collection
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Featured Pieces</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our handpicked adire pieces, crafted with tradition and designed for modern elegance.
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-xl p-4 sm:p-6 animate-pulse"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-[3/4] bg-muted rounded-xl mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-muted rounded w-2/3"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16">
              {products?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_url}
                    category={product.category}
                    color={product.color}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/categories">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 min-h-[48px] transition-all duration-300 hover:bg-accent/10 focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  View Complete Collection
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced for Both */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-10 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium">
              Customer Love
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">What Our Customers Say</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <motion.div
                key={i}
                className="bg-card p-6 sm:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="font-semibold text-foreground text-base sm:text-lg">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;