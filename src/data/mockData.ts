export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string | null;
  categoryId: number;
  mealType: string;
  type: "VEG" | "NON-VEG";
  category: {
    id: number;
    name: string;
    image: string;
    isRecommendedForMealSuggestion: boolean;
  };
  dishType: string;
  forChefit: boolean;
  forParty: boolean;
  nameHi: string;
  nameBn: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export const mockDishes: Dish[] = [
  // Starters
  {
    id: 101,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in Indian spices and yogurt.",
    image: null,
    categoryId: 1,
    mealType: "STARTER",
    type: "VEG",
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "APPETIZER",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 102,
    name: "Chicken Wings",
    description: "Crispy fried chicken wings tossed in spicy sauce.",
    image: null,
    categoryId: 2,
    mealType: "STARTER",
    type: "NON-VEG",
    category: {
      id: 2,
      name: "Continental",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/continental.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "APPETIZER",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 103,
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce.",
    image: null,
    categoryId: 3,
    mealType: "STARTER",
    type: "VEG",
    category: {
       id: 3,
      name: "Chinese",
       image: "https://tse1.mm.bing.net/th/id/OIP.KUGmFTZprLWgPDdf1QxUxAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
      isRecommendedForMealSuggestion: true
    },
    dishType: "APPETIZER",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },

  // Main Course - Using the provided data
  {
    id: 1,
    name: "Kadhai Paneer 1",
    description: "Paneer cubes in spicy onion gravy with onions and capsicum cubes.",
    image: null,
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "VEG",
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato and butter gravy with aromatic spices.",
    image: null,
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "NON-VEG",
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 3,
    name: "Dal Makhani",
    description: "Creamy black lentils cooked in butter and cream with aromatic spices.",
    image: null,
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "VEG",
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },

  // Desserts
  {
    id: 201,
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in rose-flavored sugar syrup.",
    image: null,
    categoryId: 4,
    mealType: "DESSERT",
    type: "VEG",
    category: {
      id: 4,
      name: "Indian Sweets",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/sweets.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "SWEET",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 202,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with chocolate ganache.",
    image: null,
    categoryId: 5,
    mealType: "DESSERT",
    type: "VEG",
    category: {
      id: 5,
      name: "Bakery",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/bakery.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CAKE",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 203,
    name: "Kulfi",
    description: "Traditional Indian ice cream flavored with cardamom and pistachios.",
    image: null,
    categoryId: 4,
    mealType: "DESSERT",
    type: "VEG",
    category: {
      id: 4,
      name: "Indian Sweets",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/sweets.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "FROZEN",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },

  // Sides
  {
    id: 301,
    name: "Garlic Naan",
    description: "Soft Indian bread topped with garlic and butter.",
    image: null,
    categoryId: 6,
    mealType: "SIDES",
    type: "VEG",
    category: {
      id: 6,
      name: "Bread",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/bread.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "BREAD",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 302,
    name: "Jeera Rice",
    description: "Aromatic basmati rice cooked with cumin seeds and whole spices.",
    image: null,
    categoryId: 7,
    mealType: "SIDES",
    type: "VEG",
    category: {
      id: 7,
      name: "Rice",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/rice.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "RICE",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  },
  {
    id: 303,
    name: "Raita",
    description: "Cool yogurt-based side dish with cucumber and mint.",
    image: null,
    categoryId: 8,
    mealType: "SIDES",
    type: "VEG",
    category: {
      id: 8,
      name: "Accompaniments",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/accompaniments.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "SALAD",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: ""
  }
];

export const mockIngredients: Record<number, Ingredient[]> = {
  1: [
    { name: "Paneer", quantity: "200g" },
    { name: "Onions", quantity: "2 medium" },
    { name: "Capsicum", quantity: "1 large" },
    { name: "Tomatoes", quantity: "2 medium" },
    { name: "Ginger-Garlic Paste", quantity: "1 tbsp" },
    { name: "Red Chili Powder", quantity: "1 tsp" },
    { name: "Turmeric Powder", quantity: "1/2 tsp" },
    { name: "Garam Masala", quantity: "1 tsp" },
    { name: "Oil", quantity: "2 tbsp" },
    { name: "Salt", quantity: "To taste" }
  ],
  101: [
    { name: "Paneer", quantity: "250g" },
    { name: "Yogurt", quantity: "1/2 cup" },
    { name: "Ginger-Garlic Paste", quantity: "1 tbsp" },
    { name: "Red Chili Powder", quantity: "1 tsp" },
    { name: "Turmeric Powder", quantity: "1/2 tsp" },
    { name: "Garam Masala", quantity: "1 tsp" },
    { name: "Lemon Juice", quantity: "1 tbsp" },
    { name: "Oil", quantity: "2 tbsp" },
    { name: "Salt", quantity: "To taste" }
  ],
  102: [
    { name: "Chicken Wings", quantity: "500g" },
    { name: "All-Purpose Flour", quantity: "1/2 cup" },
    { name: "Cornstarch", quantity: "2 tbsp" },
    { name: "Paprika", quantity: "1 tsp" },
    { name: "Garlic Powder", quantity: "1 tsp" },
    { name: "Hot Sauce", quantity: "3 tbsp" },
    { name: "Butter", quantity: "2 tbsp" },
    { name: "Oil for frying", quantity: "As needed" },
    { name: "Salt", quantity: "To taste" }
  ],
  201: [
    { name: "Milk Powder", quantity: "1 cup" },
    { name: "All-Purpose Flour", quantity: "2 tbsp" },
    { name: "Ghee", quantity: "2 tbsp" },
    { name: "Sugar", quantity: "1 cup" },
    { name: "Water", quantity: "1 cup" },
    { name: "Rose Water", quantity: "1 tsp" },
    { name: "Cardamom Powder", quantity: "1/2 tsp" }
  ]
};

export const mealTypes = [
  { id: "STARTER", label: "Starter" },
  { id: "MAIN COURSE", label: "Main Course" },
  { id: "DESSERT", label: "Dessert" },
  { id: "SIDES", label: "Sides" }
];