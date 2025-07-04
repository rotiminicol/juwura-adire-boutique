
import { useState, useMemo, useEffect } from "react";
import { Filter, Grid, List, X } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { products, categories, colors, priceRanges } from "@/data/products";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["All"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(["All"]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      setSelectedCategories(checked ? ["All"] : []);
    } else {
      if (checked) {
        setSelectedCategories(prev => prev.filter(c => c !== "All").concat(category));
      } else {
        setSelectedCategories(prev => prev.filter(c => c !== category));
      }
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (color === "All") {
      setSelectedColors(checked ? ["All"] : []);
    } else {
      if (checked) {
        setSelectedColors(prev => prev.filter(c => c !== "All").concat(color));
      } else {
        setSelectedColors(prev => prev.filter(c => c !== color));
      }
    }
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    if (priceRange === "All") {
      setSelectedPriceRanges(checked ? ["All"] : []);
    } else {
      if (checked) {
        setSelectedPriceRanges(prev => prev.filter(p => p !== "All").concat(priceRange));
      } else {
        setSelectedPriceRanges(prev => prev.filter(p => p !== priceRange));
      }
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (!selectedCategories.includes("All") && selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by color
    if (!selectedColors.includes("All") && selectedColors.length > 0) {
      filtered = filtered.filter(product => selectedColors.includes(product.color));
    }

    // Filter by price range
    if (!selectedPriceRanges.includes("All") && selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => selectedPriceRanges.includes(product.priceRange));
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "newest":
        return [...filtered].reverse();
      default:
        return filtered;
    }
  }, [selectedCategories, selectedColors, selectedPriceRanges, sortBy, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedColors, selectedPriceRanges, sortBy, searchTerm]);

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (desktop) */}
          <div className="lg:w-64 space-y-6 hidden lg:block">
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
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={category} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
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
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox 
                          id={range} 
                          checked={selectedPriceRanges.includes(range)}
                          onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                        />
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
                    {colors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox 
                          id={color} 
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                        />
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
          {/* Mobile Filters Button and Drawer */}
          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="mb-4 w-full lg:hidden" variant="outline">
                  <Filter className="h-5 w-5 mr-2" /> Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent className="pt-2">
                <DrawerHeader className="flex flex-row items-center justify-between p-4 pb-0">
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerClose asChild>
                    <button className="p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
                      <X className="h-6 w-6" />
                    </button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="p-4 pt-0 max-h-[70vh] overflow-y-auto scrollbar-none">
                  {/* Categories */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={category} 
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            />
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
                        {priceRanges.map((range) => (
                          <div key={range} className="flex items-center space-x-2">
                            <Checkbox 
                              id={range} 
                              checked={selectedPriceRanges.includes(range)}
                              onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                            />
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
                        {colors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox 
                              id={color} 
                              checked={selectedColors.includes(color)}
                              onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                            />
                            <label htmlFor={color} className="text-sm text-muted-foreground cursor-pointer">
                              {color}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Button className="mt-4 w-full" variant="default">Apply Filters</Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          )}
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Adire Collection</h1>
                <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
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

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Products Grid */}
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1 gap-6"}`}>
              {paginatedProducts.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">No products found.</div>
              ) : (
                paginatedProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))
              )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Categories;
