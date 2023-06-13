import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProductionOrder, deleteProductionOrder, updateProductionOrder, getProductionOrder } from '../api/productionOrder.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';
import { ProductionOrderDetails } from '../components/production-order/ProductionOrderDetails';
import { ProductionOrderActions } from '../components/production-order/ProductionOrderActions';
import { canUpdateOrDeleteProductionOrder } from '../services/productionOrders/productionOrderServices';


function ProductionOrderFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [productionOrder, setProductionOrder] = useState({});
    const [updateState, setUpdateState] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    async function loadProductionOrder() {
        if (params.id) {
            const res = await getProductionOrder(params.id)
            setValue('title', res.data.title)
            setValue('description', res.data.description)
            setProductionOrder(res.data)
            setUpdateState(!updateState)
        }
    };

    useEffect(() => {
        loadProductionOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = handleSubmit(async data => {
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

    const handleDelete = (async () => {
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

    })

    return (
        <div>
            <div className='mx-auto grid grid-cols-3 gap-x-2'>
                <div className='col-span-3'>
                    <ComponentNavigationHeader listPath="/production-orders" createPath="/production-orders-create" title="Orden de producción" />
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
                {params.id && canUpdateOrDeleteProductionOrder(productionOrder) &&
                    <div className='flex justify-end'>
                        <button
                            className=' bg-red-400 p-3 rounded-lg w-full hover:bg-red-500'
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                }
            </div>
            <div>
                {params.id &&
                    <ProductionOrderActions productionOrderId={params.id} refresh={loadProductionOrder}></ProductionOrderActions>
                }
            </div>
            <div>
                {params.id &&
                    <ProductionOrderDetails productionOrderId={params.id} shouldUpdateState={canUpdateOrDeleteProductionOrder(productionOrder)}></ProductionOrderDetails>
                }
            </div>
        </div>


    )
}

export default ProductionOrderFormPage;