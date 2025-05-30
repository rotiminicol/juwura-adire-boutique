
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  color?: string;
}

const ProductCard = ({ id, name, price, image, category, color }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image_url: image,
      stock_quantity: 10 // Default stock for demo
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        price,
        image_url: image,
        category,
        color
      });
    }
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" 
              size="icon" 
              className={`rounded-full bg-background/80 backdrop-blur-sm ${
                isInWishlist(id) ? 'text-red-500' : ''
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(id) ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full bg-primary text-primary-foreground" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {category}
          </p>
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {color && (
            <p className="text-xs text-muted-foreground mb-2">
              Color: {color}
            </p>
          )}
          <p className="text-lg font-semibold text-primary">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
