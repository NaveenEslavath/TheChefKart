import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockDishes, mockIngredients } from "@/data/mockData";
import { ArrowLeft, Leaf, Circle, ChefHat } from "lucide-react";
import vegDishImage from "@/assets/veg-dish.jpg";
import nonVegDishImage from "@/assets/non-veg-dish.jpg";
import dessertDishImage from "@/assets/dessert-dish.jpg";
import sidesDishImage from "@/assets/sides-dish.jpg";

const IngredientDetail = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();

  const dish = mockDishes.find(d => d.id === parseInt(dishId || "0"));
  const ingredients = mockIngredients[parseInt(dishId || "0")] || [];

  const getImageForDish = (dish: any) => {
    if (dish?.image) return dish.image;
    
    switch (dish?.mealType) {
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

  if (!dish) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Dish not found</h2>
          <p className="text-muted-foreground mb-6">
            The dish you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const defaultImage = getImageForDish(dish);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-full">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Ingredient Details</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dish Image and Info */}
          <div className="space-y-6">
            <Card className="overflow-hidden bg-gradient-card border-border/50">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={getImageForDish(dish)}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className={`text-sm font-medium ${
                      dish.type === "VEG" 
                        ? "bg-veg text-white" 
                        : "bg-non-veg text-white"
                    }`}
                  >
                    {dish.type === "VEG" ? (
                      <Leaf className="w-4 h-4 mr-2" />
                    ) : (
                      <Circle className="w-4 h-4 mr-2 fill-current" />
                    )}
                    {dish.type === "VEG" ? "Vegetarian" : "Non-Vegetarian"}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {dish.name}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2 leading-relaxed">
                      {dish.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <Badge variant="outline" className="text-sm">
                    {dish.category.name}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {dish.mealType}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {dish.dishType}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Ingredients */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <ChefHat className="w-5 h-5" />
                  Ingredients
                </CardTitle>
                <CardDescription>
                  Everything you need to prepare this delicious dish
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {ingredients.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-muted-foreground">
                      Ingredient list not available for this dish.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-foreground font-medium">
                            {ingredient.name}
                          </span>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            {ingredient.quantity}
                          </Badge>
                        </div>
                        {index < ingredients.length - 1 && (
                          <Separator className="bg-border/30" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-border hover:bg-accent"
                onClick={() => navigate("/")}
              >
                Back to Menu
              </Button>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  // Add to selection logic here
                  navigate("/");
                }}
              >
                Add to Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetail;