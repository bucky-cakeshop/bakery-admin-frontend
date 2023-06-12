import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/product.api';
import { getAllMeasureUnits } from '../../api/measureUnit.api';
import { createRecipeDetailProduct } from '../../api/recipeDetailProduct.api';

export function RecipeDetailProductForm({ recipeId, detailsChanged }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [measureUnits, setMeasureUnits] = useState([])
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        async function loadMeasureUnits() {
            const res = await getAllMeasureUnits()
            setMeasureUnits(res.data)
        }
        async function loadProducts() {
            const res = await getAllProducts()
            setIngredients(res.data)
        }

        loadProducts()
        loadMeasureUnits()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMeasuerUnitOptions = () => {
        return measureUnits.map((option, index) => (
            <option key={option.id} value={option.id}>{option.title}</option>
        ));
    }
    const renderProductOptions = () => {
        return ingredients.map((option, index) => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ));
    }

    const onSubmit = handleSubmit(async data => {
        if (recipeId) {
            const payload = {
                product: parseInt(data.product),
                measureUnit: parseInt(data.measureUnit),
                quantity: parseFloat(data.quantity),
                recipe: parseInt(recipeId)
            }
            await createRecipeDetailProduct(payload)
            toast.success('Se ha creado el item de la receta', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
            detailsChanged()
            setValue('product',0)
            setValue('measureUnit',0)
            setValue('quantity','')
        }
    })

    return (
        <div>
            <form action="" onSubmit={onSubmit} className='grid grid-cols-4 gap-2 mb-5'>
                    <select
                        name="product"
                        placeholder="Product"
                        {...register("product", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg'
                    >
                        <option value="">Seleccionar</option>
                        {renderProductOptions()}
                    </select>

                    <select
                        name="measureUnit"
                        placeholder="measureUnit"
                        {...register("measureUnit", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg'
                    >
                        <option value="">Seleccionar</option>
                        {renderMeasuerUnitOptions()}

                    </select>
                    <input
                        type="text"
                        placeholder="Cantidad"
                        {...register("quantity", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg'
                    />
                <button className=' bg-blue-400 rounded-lg'>Agregar</button>

                {errors.product && <span className='font-bold text-red-500'>Producto es requerido</span>}
                {errors.measureUnit && <span className='font-bold text-red-500'>Unidad de medida es requerido</span>}
                {errors.quantity && <span className='font-bold text-red-500'>Cantidad es requerido</span>}
            </form>
        </div>
    )
}