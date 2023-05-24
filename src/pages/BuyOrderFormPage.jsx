import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createBuyOrder, deleteBuyOrder, updateBuyOrder, getBuyOrder } from '../api/buyOrder.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';
import { BuyOrderDetails } from '../components/buy-order/BuyOrderDetails';

function BuyOrderFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadBuyOrder() {
            if (params.id) {
                const res = await getBuyOrder(params.id)
                setValue('title', res.data.Id)
                setValue('description', res.data.description)
            }
        }
        loadBuyOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateBuyOrder(params.id, data)
            toast.success('Orden de compra actualizada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createBuyOrder(data);
            toast.success('Orden de compra creada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/buy-orders')
    })

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/buy-orders" createPath="/buy-orders-create" title="Ordenes de compra" />
            </div>

            <form action="" onSubmit={onSubmit}>
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
                                await deleteBuyOrder(params.id)
                                toast.success('Orden de compra eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/buy-orders')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }
            {/* Veremos la tabla de ingredientes cuando estoy editando */}
            {params.id &&
                <BuyOrderDetails buyOrderId={params.id}></BuyOrderDetails>
            }
        </div>
    )
}

export default BuyOrderFormPage;