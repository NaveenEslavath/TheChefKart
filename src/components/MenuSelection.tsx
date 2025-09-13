import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CategoryTabs from "./CategoryTabs";
import SearchAndFilters from "./SearchAndFilters";
import DishCard from "./DishCard";
import CartSidebar from "./CartSidebar";
import { mockDishes, mealTypes } from "@/data/mockData";
import { ChefHat } from "lucide-react";

const MenuSelection = () => {
  const [activeCategory, setActiveCategory] = useState("STARTER");
  const [searchTerm, setSearchTerm] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<Set<number>>(new Set());
  const [dishQuantities, setDishQuantities] = useState<Record<number, number>>({});

  // Filter dishes based on active category, search term, and filters
  const filteredDishes = useMemo(() => {
    return mockDishes.filter(dish => {
      // Category filter
      if (dish.mealType !== activeCategory) return false;
      
      // Search filter
      if (searchTerm && !dish.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Veg/Non-Veg filters
      if (vegFilter || nonVegFilter) {
        if (vegFilter && nonVegFilter) {
          // Both filters active - show all
          return true;
        } else if (vegFilter && dish.type !== "VEG") {
          return false;
        } else if (nonVegFilter && dish.type !== "NON-VEG") {
          return false;
        }
      }
      
      return true;
    });
  }, [activeCategory, searchTerm, vegFilter, nonVegFilter]);

  // Calculate selection counts per category
  const selectionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    mealTypes.forEach(mealType => {
      counts[mealType.id] = mockDishes
        .filter(dish => dish.mealType === mealType.id && selectedDishes.has(dish.id))
        .length;
    });
    
    return counts;
  }, [selectedDishes]);

  const totalSelectedDishes = selectedDishes.size;

  const handleToggleDish = (dishId: number) => {
    const newSelected = new Set(selectedDishes);
    if (newSelected.has(dishId)) {
      newSelected.delete(dishId);
      // Remove from quantities when deselected
      const newQuantities = { ...dishQuantities };
      delete newQuantities[dishId];
      setDishQuantities(newQuantities);
    } else {
      newSelected.add(dishId);
      // Add initial quantity when selected
      setDishQuantities(prev => ({ ...prev, [dishId]: 1 }));
    }
    setSelectedDishes(newSelected);
  };

  const handleUpdateQuantity = (dishId: number, quantity: number) => {
    setDishQuantities(prev => ({ ...prev, [dishId]: quantity }));
  };

  const handleRemoveDish = (dishId: number) => {
    const newSelected = new Set(selectedDishes);
    newSelected.delete(dishId);
    setSelectedDishes(newSelected);
    
    const newQuantities = { ...dishQuantities };
    delete newQuantities[dishId];
    setDishQuantities(newQuantities);
  };

  const handleContinue = () => {
    const selectedDishList = mockDishes.filter(dish => selectedDishes.has(dish.id)).map(dish => ({
      ...dish,
      quantity: dishQuantities[dish.id] || 1
    }));
    console.log("Selected dishes:", selectedDishList);
    // Here you would normally navigate to the next screen or submit the selection
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cart Sidebar */}
      <CartSidebar
        selectedDishes={selectedDishes}
        allDishes={mockDishes}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveDish={handleRemoveDish}
      />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-full">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Party Menu</h1>
              <p className="text-sm text-muted-foreground">Select dishes for your party</p>
            </div>
          </div>
          
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selectionCounts={selectionCounts}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          vegFilter={vegFilter}
          nonVegFilter={nonVegFilter}
          onVegFilterChange={setVegFilter}
          onNonVegFilterChange={setNonVegFilter}
        />

        {/* Dishes Grid */}
        <div className="mt-6">
          {filteredDishes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-medium text-foreground mb-2">No dishes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more dishes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map(dish => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  isSelected={selectedDishes.has(dish.id)}
                  onToggle={handleToggleDish}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {totalSelectedDishes > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-sm z-40">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <ChefHat className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {totalSelectedDishes} dish{totalSelectedDishes !== 1 ? 'es' : ''} selected
                  </p>
                  <p className="text-sm text-muted-foreground">Ready to continue</p>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSelection;