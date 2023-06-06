import { useEffect, useState } from "react";
import { getProductionOrderDetails, getProductionOrder } from '../../api/productionOrder.api'
import { deleteProductionOrderDetail } from '../../api/productionOrderDetail.api'
import SorteableTable from '../sortable-table/SorteableTable'
import { ProductionOrderDetailForm } from "./ProductionOrderDetailForm";
import { GoTrashcan } from 'react-icons/go'
import { toast } from 'react-hot-toast';
import { ProductionOrderAggregatedIngredients } from './ProductionOrderAggregatedIngredients';

export function ProductionOrderDetails({ productionOrderId }) {
    const [productionOrderDetails, setProductionOrderDetails] = useState([]);
    const [productionOrder, setProductionOrder] = useState({});

    async function loadProductionOrderDetails() {
        const res = await getProductionOrderDetails(productionOrderId);
        setProductionOrderDetails([...res.data]);
    }
    async function loadProductionOrder() {
        const res = await getProductionOrder(productionOrderId);
        setProductionOrder({ ...res.data });
    }

    useEffect(() => {
        loadProductionOrderDetails();
        loadProductionOrder();
    }, [])

    async function removeItem(productionOrder) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            const res = await deleteProductionOrderDetail(productionOrder);
            loadProductionOrderDetails();
            toast.success('Detalle del comprobante eliminado', {
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
            label: 'Receta',
            render: (productionOrder) => productionOrder.recipe_object.title,
            sortValue: (productionOrder) => productionOrder.recipe_object.title
        },
        {
            label: 'Cantidad',
            render: (productionOrder) => productionOrder.quantity,
            sortValue: (productionOrder) => productionOrder.quantity
        },
        {
            label: 'Eliminar',
            render: (productionOrder) => <button className=" w-10" onClick={() => removeItem(productionOrder.id)} ><GoTrashcan /></button>,
        }

    ];

    const keyFn = (productionOrder) => {
        return productionOrder.id;
    }

    return (
        <div className="mx-auto grid grid-cols-2">
            <h1 className="font-bold text-2xl mb-4 mt-4 col-span-2">Detalles de la orden de producción - Recetas</h1>
            <div className='col-span-2'>
                <ProductionOrderDetailForm productionOrderId={productionOrderId} detailsChanged={loadProductionOrderDetails}></ProductionOrderDetailForm>
            </div>
            <div className="">
                <h1 className="font-bold text-xl mb-1 mt-4">Detalle de la orden de producción</h1>
                <SorteableTable data={productionOrderDetails} config={config} keyFn={keyFn}></SorteableTable>
            </div>
            <div className="">
                <ProductionOrderAggregatedIngredients productionOrderId={productionOrderId} items={productionOrderDetails}></ProductionOrderAggregatedIngredients>
            </div>

        </div>
    )
}