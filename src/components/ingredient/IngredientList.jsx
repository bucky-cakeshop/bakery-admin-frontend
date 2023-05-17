import { useEffect, useState } from "react";
import { getAllIngredients } from '../../api/ingredient.api';
import { IngredientCard } from "./IngredientCard";

function IngredientList() {
    const [ingredients, setMeasureUnits] = useState([]);

    useEffect(() => {
        async function loadIngredients() {
            const res = await getAllIngredients();
            setMeasureUnits(res.data);
        }

        loadIngredients();
    }, [])
    return (
        <div className="grid grid-cols-3 gap-2">
            {
                ingredients.map(ingredient => (
                    <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))
            }

        </div>
    );
}
export default IngredientList