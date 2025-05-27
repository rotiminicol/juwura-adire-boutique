
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Minus, Plus, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // Find the current product
  const currentProduct = products.find(p => p.id === id);
  
  // Get related products (excluding current product)
  const relatedProducts = products.filter(p => p.id !== id).slice(0, 4);

  // Use the same image for all product views (as per typical e-commerce practice)
  const productImages = currentProduct ? [
    currentProduct.image,
    currentProduct.image,
    currentProduct.image,
    currentProduct.image
  ] : [];

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={productImages[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-muted border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {currentProduct.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">₦{currentProduct.price.toLocaleString()}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              This beautiful {currentProduct.name.toLowerCase()} showcases traditional Nigerian craftsmanship. 
              Hand-dyed using ancient techniques, each piece features unique patterns that tell a story. 
              Perfect for special occasions or adding cultural elegance to your wardrobe.
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="xxl">XXL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!selectedSize}
              >
                Add to Cart
              </Button>
              <div className="flex space-x-4">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Free shipping on orders over ₦50,000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">100% authentic handcrafted adire</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none text-muted-foreground">
                <p>
                  This exquisite adire piece represents the pinnacle of traditional Nigerian textile artistry. 
                  Each piece is carefully hand-dyed using indigo plants, following techniques passed down through 
                  generations of skilled artisans.
                </p>
                <p className="mt-4">
                  The intricate patterns are created using resist-dyeing methods, including tie-dyeing and 
                  stitch-resist techniques. No two pieces are exactly alike, making each item a unique work of art.
                </p>
                <h4 className="text-foreground font-semibold mt-6 mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>100% cotton fabric</li>
                  <li>Hand-dyed indigo patterns</li>
                  <li>Traditional Nigerian craftsmanship</li>
                  <li>Comfortable, breathable material</li>
                  <li>Perfect for special occasions</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="care" className="mt-6">
              <div className="prose max-w-none text-muted-foreground">
                <h4 className="text-foreground font-semibold mb-4">Care Instructions:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Hand wash in cold water with mild detergent</li>
                  <li>Do not bleach or use harsh chemicals</li>
                  <li>Dry in shade, away from direct sunlight</li>
                  <li>Iron on medium heat while slightly damp</li>
                  <li>Store in a cool, dry place</li>
                  <li>First wash separately to prevent color bleeding</li>
                </ul>
                <p className="mt-4">
                  <strong>Note:</strong> The indigo dye may bleed slightly during the first few washes. 
                  This is normal and will not affect the beauty or longevity of your adire piece.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">A{review}</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground">Anonymous Customer</h5>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Beautiful piece with amazing quality. The adire patterns are stunning and the fabric 
                      feels luxurious. Perfect fit and exactly as described. Highly recommended!
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
