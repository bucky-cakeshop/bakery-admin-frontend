import { getProductionOrder, startProductionOrder, cancelProductionOrder, closeProductionOrder, getProductionOrderConsumes } from '../../api/productionOrder.api'
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import SorteableTable from '../sortable-table/SorteableTable'
import { getButtonsState } from '../../services/productionOrders/productionOrderServices';

export function ProductionOrderActions({ productionOrderId, refresh }) {
    const [productionOrder, setProductionOrder] = useState({});
    const [productionOrderConsumes, setProductionOrderConsumes] = useState([]);

    async function loadProductionOrder() {
        const res = await getProductionOrder(productionOrderId);

        setProductionOrder({ ...res.data });
    }

    async function loadProductionOrderConsumes() {
        const res = await getProductionOrderConsumes(productionOrderId);
        setProductionOrderConsumes([...res.data]);
    }

    useEffect(() => {
        loadProductionOrder();
        loadProductionOrderConsumes()
    }, [])

    const activeClass = "bg-green-400 p-3 rounded-lg block w-full hover:bg-green-500 mt-3"
    const inactiveClass = "bg-gray-400 p-3 rounded-lg block w-full mt-3"
    
    const start = (async () => {
        const response = await startProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        refresh()
    })
    const cancel = (async () => {
        const response = await cancelProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        refresh()
    })
    const close = (async () => {
        const response = await closeProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        refresh()
    })

    const processResponse = ((response) => {
        if (!response.data.isOk) {
            toast.error('Error al cambiar de estado ' + response.data.status.message, {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
    })

    const config = [
        {
            label: 'Ingrediente',
            render: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.ingredient_object.name,
            sortValue: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.ingredient_object.name
        },
        {
            label: 'Unidad',
            render: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.measureUnit_object.symbol,
            sortValue: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.measureUnit_object.symbol
        },
        {
            label: 'Lote',
            render: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.batch,
            sortValue: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.batch
        },
        {
            label: 'Exp.',
            render: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.expirationDate,
            sortValue: (productionOrderConsume) => productionOrderConsume.supplierInvoiceDetail.expirationDate
        },

        {
            label: 'Consumido',
            render: (productionOrderConsume) => productionOrderConsume.quantity,
            sortValue: (productionOrderConsume) => productionOrderConsume.quantity
        }


    ];

    const keyFn = (productionOrderConsume) => {
        return productionOrderConsume.id;
    }

    return (
        <div>
            <div className="mx-auto grid grid-cols-3 gap-x-2">
                <button
                    className={getButtonsState(productionOrder).startedButtonDisabled ? inactiveClass : activeClass}
                    disabled={getButtonsState(productionOrder).startedButtonDisabled}
                    onClick={() => start()}
                >
                    Comenzar
                </button>
                <button
                    className={getButtonsState(productionOrder).canceledButtonDisabled ? inactiveClass : activeClass}
                    disabled={getButtonsState(productionOrder).canceledButtonDisabled}
                    onClick={() => cancel()}
                >
                    Cancelar
                </button>
                <button
                    className={getButtonsState(productionOrder).closedButtonDisabled ? inactiveClass : activeClass}
                    disabled={getButtonsState(productionOrder).closedButtonDisabled}
                    onClick={() => close()}
                >
                    Cerrar
                </button>
            </div>
            <div className="">
                <h1 className="font-bold text-xl mb-1 mt-4">Detalle de los consumos de stock</h1>
                <SorteableTable data={productionOrderConsumes} config={config} keyFn={keyFn}></SorteableTable>
            </div>

        </div>
    )
}