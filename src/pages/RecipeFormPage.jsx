import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createRecipe, deleteRecipe, updateRecipe, getRecipe } from '../api/recipe.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';
import { RecipeDetails } from '../components/recipe/RecipeDetails';

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

    const onSubmit = handleSubmit(async data => {
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
        <div className='max-w-5xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/recipes" createPath="/recipes-create" title="Recetas" />
            </div>

            <form action="" onSubmit={onSubmit}>
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

                <button className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Guardar</button>
            </form>
            {params.id &&
                <div className=' flex justify-end'>
                    <button
                        className=' bg-red-500 p-3 rounded-lg w-48 mt-3'
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
                <RecipeDetails recipeId={params.id}></RecipeDetails>
            }
        </div>
    )
}

export default RecipeFormPage;