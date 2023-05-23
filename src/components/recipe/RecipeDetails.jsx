import { useEffect, useState } from "react";
import { getRecipeDetails } from '../../api/recipe.api'
import { deleteRecipeDetail } from '../../api/recipeDetail.api'
import SorteableTable from '../../components/sortable-table/SorteableTable'
import { RecipeDetailForm } from "./RecipeDetailForm";
import { GoTrashcan } from 'react-icons/go'
import { toast } from 'react-hot-toast';

export function RecipeDetails({ recipeId }) {
    const [recipeDetails, setRecipeDetails] = useState([]);

    async function loadRecipeDetails() {
        const res = await getRecipeDetails(recipeId);
        setRecipeDetails([...res.data]);
    }
    useEffect(() => {
        loadRecipeDetails();
    }, [])

    async function removeItem(recipeDetailId) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            const res = await deleteRecipeDetail(recipeDetailId);
            loadRecipeDetails();
            toast.success('Detalle de la receta eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

        }
    }

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
            render: (recipeDetail) => <button className=" w-10" onClick={() => removeItem(recipeDetail.id)} ><GoTrashcan /></button>,
        }

    ];

    const keyFn = (recipeDetail) => {
        return recipeDetail.id;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes</h1>
            <RecipeDetailForm recipeId={recipeId} detailsChanged={loadRecipeDetails}></RecipeDetailForm>
            <SorteableTable data={recipeDetails} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}