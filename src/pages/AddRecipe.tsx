import React from "react";
import { RecipeForm } from "../components/component/recipe-form";

interface AddRecipeProps {
  onRecipeAdded: () => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onRecipeAdded }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <RecipeForm onSubmit={onRecipeAdded} />
    </div>
  );
};

export default AddRecipe;
