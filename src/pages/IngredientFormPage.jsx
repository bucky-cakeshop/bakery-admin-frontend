import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createIngredient, deleteIngredient, updateIngredient, getIngredient } from '../api/ingredient.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function IngredientFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadIngredient() {
            if (params.id) {
                const res = await getIngredient(params.id)
                setValue('name', res.data.name)
            }
        }
        loadIngredient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateIngredient(params.id, data)
            toast.success('ingrediente actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createIngredient(data);
            toast.success('Ingrediente creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/ingredients')
    })

    return (
        <div className='max-w-xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/ingredients" createPath="/ingredients-create" title="Ingredientes" />
            </div>

            <form action="" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.name && <span>Campo requerido</span>}

                <button className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Guardar</button>
            </form>
            {params.id &&
                <div className=' flex justify-end'>
                    <button
                        className=' bg-red-500 p-3 rounded-lg w-48 mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Seguro de eliminar?');
                            if (accepted) {
                                await deleteIngredient(params.id)
                                toast.success('Ingrediente eliminado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/ingredients')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }

        </div>
    )
}

export default IngredientFormPage;