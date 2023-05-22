import { useEffect, useState } from "react";
import { getRecipeDetails } from '../../api/recipe.api'
import SorteableTable from '../../components/sortable-table/SorteableTable'
import { RecipeDetailForm } from "./RecipeDetailForm";
import { GoTrashcan } from 'react-icons/go'


export function RecipeDetails({ recipeId }) {
    const [recipeDetails, setRecipeDetails] = useState([]);

    async function loadRecipes() {
        const res = await getRecipeDetails(recipeId);
        setRecipeDetails([...res.data]);
    }
    useEffect(() => {
        loadRecipes();
    }, [])

    const config = [
        {
            label: 'Ingrediente',
            render: (recipeDetail) => recipeDetail.ingredient_object.name,
            sortValue: (recipeDetail) => recipeDetail.ingredient_object.name
        },
        {
            label: 'Unidad de medida',
            render: (recipeDetail) => recipeDetail.measureUnit_object.name,
            sortValue: (recipeDetail) => recipeDetail.measureUnit_object.name
        },
        {
            label: 'Cantidad',
            render: (recipeDetail) => recipeDetail.quantity,
            sortValue: (recipeDetail) => recipeDetail.quantity
        },
        {
            label: 'Eliminar',
            render: (recipeDetail) => <button className=" w-10"><GoTrashcan /></button>,
        }

    ];

    const keyFn = (recipeDetail) => {
        return recipeDetail.id;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes</h1>
            <RecipeDetailForm recipeId={recipeId} detailsChanged={loadRecipes}></RecipeDetailForm>
            <SorteableTable data={recipeDetails} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}