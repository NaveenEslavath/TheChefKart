import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Leaf, Circle } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  vegFilter: boolean;
  nonVegFilter: boolean;
  onVegFilterChange: (enabled: boolean) => void;
  onNonVegFilterChange: (enabled: boolean) => void;
}

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  vegFilter,
  nonVegFilter,
  onVegFilterChange,
  onNonVegFilterChange
}: SearchAndFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border/50 focus:border-primary transition-colors"
        />
      </div>
      
      {/* Veg/Non-Veg Filters */}
      <div className="flex gap-3">
        <Button
          variant={vegFilter ? "default" : "outline"}
          size="sm"
          onClick={() => onVegFilterChange(!vegFilter)}
          className={`flex items-center gap-2 transition-all duration-200 ${
            vegFilter 
              ? "bg-veg hover:bg-veg/90 text-white" 
              : "border-veg text-veg hover:bg-veg/10"
          }`}
        >
          <Leaf className="w-4 h-4" />
          Veg
        </Button>
        
        <Button
          variant={nonVegFilter ? "default" : "outline"}
          size="sm"
          onClick={() => onNonVegFilterChange(!nonVegFilter)}
          className={`flex items-center gap-2 transition-all duration-200 ${
            nonVegFilter 
              ? "bg-non-veg hover:bg-non-veg/90 text-white" 
              : "border-non-veg text-non-veg hover:bg-non-veg/10"
          }`}
        >
          <Circle className="w-4 h-4 fill-current" />
          Non-Veg
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilters;