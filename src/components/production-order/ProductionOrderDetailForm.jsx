import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../api/recipe.api';
import { createProductionOrderDetail } from '../../api/productionOrderDetail.api';

export function ProductionOrderDetailForm({ productionOrderId, detailsChanged }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function loadRecipes() {
            const res = await getAllRecipes()
            setRecipes(res.data)
        }

        loadRecipes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderRecipeOptions = () => {
        return recipes.map((option, index) => (
            <option key={option.id} value={option.id}>{option.title}</option>
        ));
    }

    const onSubmit = handleSubmit(async data => {
        
        if (productionOrderId) {
            const payload = {
                productionOrder: parseInt(productionOrderId),
                recipe: parseInt(data.recipe),
                quantity: parseFloat(data.quantity),
            }
            await createProductionOrderDetail(payload)
            toast.success('Se ha creado el item de la orden de producción', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
            detailsChanged()
            setValue('recipe', 0)
            setValue('quantity', '')
        }
    })

    return (
        <div>
            <form action="" onSubmit={onSubmit} className='grid grid-cols-3 gap-2 mb-5'>
                <select
                    name="recipe"
                    placeholder="recetas"
                    {...register("recipe", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                >
                    <option value="">Seleccionar</option>
                    {renderRecipeOptions()}

                </select>

                <input
                    type="text"
                    placeholder="Cantidad"
                    {...register("quantity", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                />
                <button className=' bg-blue-400 rounded-lg'>Agregar</button>

                {errors.recipe && <span className='font-bold text-red-500'>Seleccionar una receta</span>}
                {errors.quantity && <span className='font-bold text-red-500'>Cantidad es requerido</span>}
            </form>

        </div>
    )

}