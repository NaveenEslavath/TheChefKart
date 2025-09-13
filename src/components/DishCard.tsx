import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dish } from "@/data/mockData";
import { Leaf, Circle, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import vegDishImage from "@/assets/veg-dish.jpg";
import nonVegDishImage from "@/assets/non-veg-dish.jpg";
import dessertDishImage from "@/assets/dessert-dish.jpg";
import sidesDishImage from "@/assets/sides-dish.jpg";

interface DishCardProps {
  dish: Dish;
  isSelected: boolean;
  onToggle: (dishId: number) => void;
}

const DishCard = ({ dish, isSelected, onToggle }: DishCardProps) => {
  const navigate = useNavigate();

  const handleIngredientClick = () => {
    navigate(`/ingredient/${dish.id}`);
  };

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

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-medium bg-gradient-card border-border/50">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={getImageForDish(dish)}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className={`text-xs font-medium ${
              dish.type === "VEG" 
                ? "bg-veg text-white" 
                : "bg-non-veg text-white"
            }`}
          >
            {dish.type === "VEG" ? (
              <Leaf className="w-3 h-3 mr-1" />
            ) : (
              <Circle className="w-3 h-3 mr-1 fill-current" />
            )}
            {dish.type === "VEG" ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            ✓
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground truncate">
              {dish.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {dish.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleIngredientClick}
            className="text-sm flex-shrink-0 border-border hover:bg-accent"
          >
            Ingredient
          </Button>
          
          <Button
            onClick={() => onToggle(dish.id)}
            size="sm"
            variant={isSelected ? "secondary" : "default"}
            className={`flex items-center gap-1 min-w-fit ${
              isSelected 
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {isSelected ? (
              <>
                <Minus className="w-3 h-3" />
                Remove
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;