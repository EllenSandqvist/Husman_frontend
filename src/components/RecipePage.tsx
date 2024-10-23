import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading recipe...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="text-center py-8">Recipe not found</div>;

  const imageUrl = getImageUrl(recipe.title);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {recipe.title}
          </h1>
          <div className="mb-8 text-gray-600 flex items-center justify-between">
            <p className="flex items-center">
              <i className="fas fa-clock mr-2 text-primary"></i>
              <span className="font-semibold mr-2">Cooking Time:</span>{" "}
              {recipe.cookingTime} minutes
            </p>
            <p className="flex items-center">
              <i className="fas fa-utensils mr-2 text-primary"></i>
              <span className="font-semibold mr-2">Servings:</span>{" "}
              {recipe.servings}
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Ingredients
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              {recipe.ingredients}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Instructions
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
