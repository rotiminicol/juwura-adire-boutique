
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
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
            <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full bg-primary text-primary-foreground">
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
          <p className="text-lg font-semibold text-primary">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
