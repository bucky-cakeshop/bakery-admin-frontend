import { useEffect, useState } from "react";
import { getAllRecipes } from '../../api/recipe.api'
import { RecipeCard } from "./RecipeCard";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function loadRecipes() {
            const res = await getAllRecipes();
            setRecipes(res.data);
        }

        loadRecipes();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                }

            </div>
        </div>
    );
}
export default RecipeList