import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mealTypes } from "@/data/mockData";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  selectionCounts: Record<string, number>;
}

const CategoryTabs = ({ 
  activeCategory, 
  onCategoryChange, 
  selectionCounts 
}: CategoryTabsProps) => {
  return (
    <Tabs 
      value={activeCategory} 
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-xl p-1">
        {mealTypes.map((mealType) => {
          const count = selectionCounts[mealType.id] || 0;
          
          return (
            <TabsTrigger
              key={mealType.id}
              value={mealType.id}
              className="relative flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft transition-all duration-200"
            >
              <span className="text-sm font-medium truncate max-w-full">
                {mealType.label}
              </span>
              {count > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs min-w-[1.25rem] h-5 rounded-full flex items-center justify-center px-1"
                >
                  {count}
                </Badge>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;