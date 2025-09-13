import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dish } from "@/data/mockData";
import { ShoppingCart, Plus, Minus, X, Leaf, Circle } from "lucide-react";
import vegDishImage from "@/assets/veg-dish.jpg";
import nonVegDishImage from "@/assets/non-veg-dish.jpg";
import dessertDishImage from "@/assets/dessert-dish.jpg";
import sidesDishImage from "@/assets/sides-dish.jpg";

interface CartItem extends Dish {
  quantity: number;
}

interface CartSidebarProps {
  selectedDishes: Set<number>;
  allDishes: Dish[];
  onUpdateQuantity: (dishId: number, quantity: number) => void;
  onRemoveDish: (dishId: number) => void;
}

const CartSidebar = ({ selectedDishes, allDishes, onUpdateQuantity, onRemoveDish }: CartSidebarProps) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isOpen, setIsOpen] = useState(false);

  const getImageForDish = (dish: Dish) => {
    if (dish.image) return dish.image;
    
    switch (dish.mealType) {
      case "STARTER":
        return dish.type === "VEG" ? vegDishImage : nonVegDishImage;
      case "MAIN COURSE":
        return dish.type === "VEG" ? vegDishImage : nonVegDishImage;
      case "DESSERT":
        return dessertDishImage;
      case "SIDES":
        return sidesDishImage;
      default:
        return vegDishImage;
    }
  };

  const cartItems: CartItem[] = allDishes
    .filter(dish => selectedDishes.has(dish.id))
    .map(dish => ({
      ...dish,
      quantity: quantities[dish.id] || 1
    }));

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (dishId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveDish(dishId);
      const newQuantities = { ...quantities };
      delete newQuantities[dishId];
      setQuantities(newQuantities);
    } else {
      setQuantities(prev => ({
        ...prev,
        [dishId]: newQuantity
      }));
      onUpdateQuantity(dishId, newQuantity);
    }
  };

  const handleRemoveItem = (dishId: number) => {
    onRemoveDish(dishId);
    const newQuantities = { ...quantities };
    delete newQuantities[dishId];
    setQuantities(newQuantities);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed top-4 right-4 z-50 shadow-medium border-border bg-card hover:bg-accent"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {totalItems > 0 && (
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] bg-background border-l border-border/50">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some delicious dishes to get started!</p>
              <Button 
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="border-border hover:bg-accent"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden bg-gradient-card border-border/50">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getImageForDish(item)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  item.type === "VEG" 
                                    ? "bg-veg text-white" 
                                    : "bg-non-veg text-white"
                                }`}
                              >
                                {item.type === "VEG" ? (
                                  <Leaf className="w-3 h-3 mr-1" />
                                ) : (
                                  <Circle className="w-3 h-3 mr-1 fill-current" />
                                )}
                                {item.type === "VEG" ? "Veg" : "Non-Veg"}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 border-border hover:bg-accent"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            
                            <span className="font-medium text-foreground min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 border-border hover:bg-accent"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Badge variant="outline" className="text-xs">
                            {item.category.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-border/50 pt-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Items:</span>
                <span className="font-medium text-foreground">{totalItems}</span>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-border hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    console.log("Proceeding to checkout with items:", cartItems);
                    // Here you would handle checkout logic
                  }}
                >
                  Proceed ({totalItems})
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;