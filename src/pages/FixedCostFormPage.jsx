import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createFixedCost, deleteFixedCost, updateFixedCost, getFixedCost } from '../api/fixedCost.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function FixedCostFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadFixedCost() {
            if (params.id) {
                const res = await getFixedCost(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                setValue('amount', res.data.amount)
            }
        }
        loadFixedCost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = handleSubmit(async data => {
        console.log(data)
        if (params.id) {
            await updateFixedCost(params.id, data)
            toast.success('Costo fijo actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createFixedCost(data);
            toast.success('Costo fijo creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/fixed-costs')
    })

    const handleDelete = (async () => {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            await deleteFixedCost(params.id)
            toast.success('Costo fijo eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

            navigate('/fixed-costs')
        }
    })

    return (
        <div className='max-w-5xl mx-auto grid grid-cols-3'>
            <div className='col-span-3'>
                <ComponentNavigationHeader listPath="/fixed-costs" createPath="/fixed-costs-create" title="Costos fijos" />
            </div>

            <form action="" className='col-span-3'>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>Campo requerido</span>}

                <input
                    type="text"
                    placeholder="amount"
                    {...register("amount", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.symbol && <span>Campo requerido</span>}

                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.description && <span>Campo requerido</span>}
            </form>

            <button className=' bg-indigo-500 p-3 rounded-lg block w-full col-span-2' onClick={handleSave} >Guardar</button>

            {params.id &&
                <div className='flex justify-end'>
                    <button
                        className=' bg-red-500 p-3 rounded-lg w-full ml-2'
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            }

        </div>
    )
}

export default FixedCostFormPage;