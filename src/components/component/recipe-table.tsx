import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

interface RecipesProps {
  recipes: Recipe[];
}
export function RecipeTable({ recipes }: RecipesProps) {
  const [sortColumn, setSortColumn] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const handleSort = (column: SetStateAction<string>) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const handleFilter = (e: { target: { value: SetStateAction<string> } }) => {
    setFilterText(e.target.value);
  };
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    const aValue = a[sortColumn as keyof Recipe];
    const bValue = b[sortColumn as keyof Recipe];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Recipe Data</h1>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter recipes..."
          value={filterText}
          onChange={handleFilter}
          className="w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("title")}
                className="cursor-pointer"
              >
                Title{" "}
                {sortColumn === "title" &&
                  (sortDirection === "asc" ? "\u25B2" : "\u25BC")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("ingredients")}
                className="cursor-pointer"
              >
                Ingredients{" "}
                {sortColumn === "ingredients" &&
                  (sortDirection === "asc" ? "\u25B2" : "\u25BC")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("instructions")}
                className="cursor-pointer"
              >
                Instructions{" "}
                {sortColumn === "instructions" &&
                  (sortDirection === "asc" ? "\u25B2" : "\u25BC")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("cookingTime")}
                className="cursor-pointer"
              >
                Cooking Time{" "}
                {sortColumn === "cookingTime" &&
                  (sortDirection === "asc" ? "\u25B2" : "\u25BC")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("servings")}
                className="cursor-pointer"
              >
                Servings{" "}
                {sortColumn === "servings" &&
                  (sortDirection === "asc" ? "\u25B2" : "\u25BC")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {recipe.ingredients
                      .split(",")
                      .map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ol className="list-decimal pl-4">
                    {recipe.instructions.split(".").map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </TableCell>
                <TableCell>{recipe.cookingTime} minutes</TableCell>
                <TableCell>{recipe.servings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
