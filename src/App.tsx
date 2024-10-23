import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeCard from "./components/RecipeCard";
import RecipePage from "./components/RecipePage";
import "./App.css";
import { Navbar } from "./components/component/navbar";
import AddRecipe from "./pages/AddRecipe";
import { RecipeTable } from "./components/component/recipe-table";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON, got ${contentType}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError(
        `Failed to fetch recipes: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="sticky top-0 z-10 bg-background">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold">Yummy Recipes</h1>
            <p className="subtitle text-xl mt-2">Discover delicious dishes!</p>
          </div>
          <Navbar />
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {recipes.map((recipe) => (
                    <div key={recipe.id} className="h-full">
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              </main>
            }
          />
          <Route
            path="/add-recipe"
            element={<AddRecipe onRecipeAdded={fetchRecipes} />}
          />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route
            path="/recipes-table"
            element={<RecipeTable recipes={recipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
