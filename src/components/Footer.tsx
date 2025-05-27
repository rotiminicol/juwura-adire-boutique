
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">JUWURA</div>
            <p className="text-muted-foreground text-sm">
              Authentic Nigerian adire fashion crafted with traditional techniques and modern style.
            </p>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Support</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Contact Us</p>
              <p>Size Guide</p>
              <p>Shipping Info</p>
              <p>Returns</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/categories" className="block hover:text-primary">New Arrivals</Link>
              <Link to="/categories" className="block hover:text-primary">Best Sellers</Link>
              <Link to="/categories" className="block hover:text-primary">Collections</Link>
              <Link to="/categories" className="block hover:text-primary">Sale</Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">About Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Our Story</p>
              <p>Artisans</p>
              <p>Sustainability</p>
              <p>Press</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 JUWURA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-primary">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary">Terms of Service</Link>
              <Link to="#" className="hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
