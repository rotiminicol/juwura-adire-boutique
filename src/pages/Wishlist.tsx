
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Wishlist = () => {
  // For demo, show first 4 products as wishlist items
  const wishlistItems = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">My Wishlist</h1>
          
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">Your wishlist is empty</p>
              <p className="text-muted-foreground">Start adding items you love!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
