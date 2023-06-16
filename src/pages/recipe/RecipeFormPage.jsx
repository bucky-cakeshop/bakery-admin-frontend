import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';
import { RecipeDetails } from '../../components/recipe/RecipeDetails';
import { createRecipe, deleteRecipe, updateRecipe, getRecipe } from '../../api/recipe.api';

function RecipeFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadRecipe() {
            if (params.id) {
                const res = await getRecipe(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            }
        }
        loadRecipe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = handleSubmit(async data => {
        if (params.id) {
            await updateRecipe(params.id, data)
            toast.success('Receta actualizada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createRecipe(data);
            toast.success('Receta creada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/recipes')
    })

    return (
        <div className='mx-auto grid grid-cols-3 gap-x-2'>
            <div className='col-span-3'>
                <ComponentNavigationHeader listPath="/recipes" createPath="/recipes-create" title="Recetas" />
            </div>

            <form action="" className='col-span-3'>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>Campo requerido</span>}

                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.description && <span>Campo requerido</span>}
            </form>

            <button className=' bg-blue-400 p-3 rounded-lg block w-full col-span-2 hover:bg-blue-500' onClick={handleSave}>Guardar</button>
            {params.id &&
                <div className=' flex justify-end'>
                    <button
                        className=' bg-red-400 p-3 rounded-lg w-full hover:bg-red-500'
                        onClick={async () => {
                            const accepted = window.confirm('Seguro de eliminar?');
                            if (accepted) {
                                await deleteRecipe(params.id)
                                toast.success('Receta eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/recipes')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }
            {/* Veremos la tabla de ingredientes cuando estoy editando */}
            {params.id &&
                <div className='col-span-3'>
                    <RecipeDetails recipeId={params.id}></RecipeDetails>
                </div>
            }
        </div>
    )
}

export default RecipeFormPage;