import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { createProductionOrder, deleteProductionOrder, updateProductionOrder, getProductionOrder } from '../api/productionOrder.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';
import { ProductionOrderDetails } from '../components/production-order/ProductionOrderDetails';
import { getAllSuppliers } from '../api/supplier.api';
import { ProductionOrderIngredients } from '../components/production-order/ProductionOrderIngredients';

function ProductionOrderFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [suppliers, setSuppliers] = useState([])

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProductionOrder() {
            if (params.id) {
                const res = await getProductionOrder(params.id)
                setValue('title', res.data.Id)
                setValue('description', res.data.description)
            }
        };
        loadProductionOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateProductionOrder(params.id, data)
            toast.success('Orden de producción actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createProductionOrder(data);
            toast.success('Orden de producción creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/production-orders')
    })

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/production-orders" createPath="/production-orders-create" title="Orden de producción" />
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
                                await deleteProductionOrder(params.id)
                                toast.success('Orden de producción eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/production-orders')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }
            {params.id &&
                <div>
                    <ProductionOrderDetails productionOrderId={params.id}></ProductionOrderDetails>
                    <ProductionOrderIngredients productionOrderId={params.id}></ProductionOrderIngredients>
                </div>
            }
        </div>
    )
}

export default ProductionOrderFormPage;