import { useEffect, useState } from "react";
import { getRecipeDetails, getRecipeDetailsProducts } from '../../api/recipe.api'
import { deleteRecipeDetail } from '../../api/recipeDetail.api'
import { deleteRecipeDetailProduct } from "../../api/recipeDetailProduct.api";
import SorteableTable from '../../components/sortable-table/SorteableTable'
import { RecipeDetailForm } from "./RecipeDetailForm";
import { RecipeDetailProductForm } from "./RecipeDetailProductForm";
import { GoTrashcan } from 'react-icons/go'
import { toast } from 'react-hot-toast';

export function RecipeDetails({ recipeId }) {
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [recipeDetailsProducts, setRecipeDetailsProducts] = useState([]);

    async function loadRecipeDetails() {
        const res = await getRecipeDetails(recipeId);
        setRecipeDetails([...res.data]);
    }
    async function loadRecipeDetailsProducts() {
        const res = await getRecipeDetailsProducts(recipeId);
        setRecipeDetailsProducts([...res.data]);
    }

    useEffect(() => {
        loadRecipeDetails();
        loadRecipeDetailsProducts();
    }, [])

    async function removeItem(recipeDetailId) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            await deleteRecipeDetail(recipeDetailId);
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

    async function removeProductItem(recipeDetailId) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            await deleteRecipeDetailProduct(recipeDetailId);
            loadRecipeDetailsProducts();
            toast.success('Detalle de la receta eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

        }
    }

    const configDetailsProducts = [
        {
            label: 'Producto',
            render: (recipeDetailProduct) => recipeDetailProduct.product_object.name,
            sortValue: (recipeDetailProduct) => recipeDetailProduct.product_object.name
        },
        {
            label: 'Unidad de medida',
            render: (recipeDetailProduct) => recipeDetailProduct.measureUnit_object.name,
            sortValue: (recipeDetailProduct) => recipeDetailProduct.measureUnit_object.name
        },
        {
            label: 'Cantidad',
            render: (recipeDetailProduct) => recipeDetailProduct.quantity,
            sortValue: (recipeDetailProduct) => recipeDetailProduct.quantity
        },
        {
            label: 'Eliminar',
            render: (recipeDetailProduct) => <button className=" w-10" onClick={() => removeProductItem(recipeDetailProduct.id)} ><GoTrashcan /></button>,
        }

    ];

    const keyFnDetailsProducts = (recipeDetailProduct) => {
        return recipeDetailProduct.id;
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes</h1>
                <RecipeDetailForm recipeId={recipeId} detailsChanged={loadRecipeDetails}></RecipeDetailForm>
                <SorteableTable data={recipeDetails} config={config} keyFn={keyFn}></SorteableTable>
            </div>
            <div>
                <h1 className="font-bold text-2xl mb-4 mt-4">Productos prefabricados</h1>
                <RecipeDetailProductForm recipeId={recipeId} detailsChanged={loadRecipeDetailsProducts}></RecipeDetailProductForm>
                <SorteableTable data={recipeDetailsProducts} config={configDetailsProducts} keyFn={keyFnDetailsProducts}></SorteableTable>
            </div>
        </div>

    )
}