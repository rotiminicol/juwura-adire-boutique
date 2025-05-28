import { ShoppingBag, Search, Menu, User, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/categories?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-4">
            <img 
              src="/lovable-uploads/a576361c-be72-4c7b-8a67-a671f55e29d3.png" 
              alt="JUWURA" 
              className="w-16 h-auto rounded-full hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              Home
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              Collections
            </Link>
            <Link to="/categories?filter=new" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              New Arrivals
            </Link>
            <Link to="/learn-about-adire" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              Learn About Adire
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search adire styles..."
                className="pl-10 bg-muted border-border text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            {/* Desktop Icons */}
            <Link to="/profile" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link to="/wishlist" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {wishlistTotal > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {wishlistTotal}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/categories?filter=new" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                to="/learn-about-adire" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learn About Adire
              </Link>
              <Link 
                to="/profile" 
                className="text-foreground hover:text-primary transition-colors font-medium sm:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/wishlist" 
                className="text-foreground hover:text-primary transition-colors font-medium sm:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 md:hidden">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search adire styles..."
                    className="pl-10 bg-muted border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;