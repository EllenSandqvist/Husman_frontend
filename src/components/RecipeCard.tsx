import React from "react";
import { Link } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getImageUrl = (title: string) => {
    const lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.includes("carbonara")) {
      return "https://images.unsplash.com/photo-1528658948776-cf610b846f80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYm9uYXJhfGVufDB8fDB8fHww";
    } else if (lowerCaseTitle.includes("chicken stir-fry")) {
      return "https://plus.unsplash.com/premium_photo-1683657860186-6afce5df3c0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWNrZW4lMjBzdHlyJTIwZnJ5fGVufDB8fDB8fHww";
    } else if (lowerCaseTitle.includes("vegetable soup")) {
      return "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNvdXB8ZW58MHx8MHx8fDA%3D";
    }
    return `https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D`;
  };

  const imageUrl = getImageUrl(recipe.title);

  return (
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <div className="recipe-card bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <div className="relative pt-[56.25%]">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <div className="recipe-details text-sm text-gray-600">
            <p>
              <i className="fas fa-clock mr-2"></i> {recipe.cookingTime} mins
            </p>
            <p>
              <i className="fas fa-utensils mr-2"></i> {recipe.servings}{" "}
              servings
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
