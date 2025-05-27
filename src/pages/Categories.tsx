
import { useState } from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const products = [
  {
    id: "1",
    name: "Classic Indigo Adire Dress",
    price: 25000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop",
    category: "Dresses"
  },
  {
    id: "2",
    name: "Traditional Adire Wrapper",
    price: 18000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop",
    category: "Wrappers"
  },
  {
    id: "3",
    name: "Modern Adire Top",
    price: 15000,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    category: "Tops"
  },
  {
    id: "4",
    name: "Adire Palazzo Pants",
    price: 20000,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    category: "Bottoms"
  },
  {
    id: "5",
    name: "Elegant Adire Blouse",
    price: 22000,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop",
    category: "Tops"
  },
  {
    id: "6",
    name: "Festival Adire Skirt",
    price: 19000,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop",
    category: "Bottoms"
  }
];

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Categories</h4>
                  <div className="space-y-2">
                    {["All", "Dresses", "Tops", "Bottoms", "Wrappers", "Accessories"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm text-muted-foreground cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      "Under ₦15,000",
                      "₦15,000 - ₦25,000",
                      "₦25,000 - ₦35,000",
                      "Above ₦35,000"
                    ].map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox id={range} />
                        <label htmlFor={range} className="text-sm text-muted-foreground cursor-pointer">
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Colors</h4>
                  <div className="space-y-2">
                    {["Indigo", "White", "Brown", "Black", "Multi-color"].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox id={color} />
                        <label htmlFor={color} className="text-sm text-muted-foreground cursor-pointer">
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Adire Collection</h1>
                <p className="text-muted-foreground">Showing {products.length} products</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
