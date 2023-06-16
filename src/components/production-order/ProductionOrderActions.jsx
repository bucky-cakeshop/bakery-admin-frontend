import { getProductionOrder, startProductionOrder, cancelProductionOrder, closeProductionOrder, getProductionOrderConsumes, getProductionOrderProductConsumes } from '../../api/productionOrder.api'
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import SorteableTable from '../sortable-table/SorteableTable'
import { getButtonsState } from '../../services/productionOrders/productionOrderServices';
import Modal from '../Modal';

export function ProductionOrderActions({ productionOrderId, refresh }) {
    const [productionOrder, setProductionOrder] = useState({});
    const [productionOrderConsumes, setProductionOrderConsumes] = useState([]);
    const [productionOrderProductConsumes, setProductionOrderProductConsumes] = useState([]);
    const [productionOrderStatus, setProductionOrderStatus] = useState({})
    const [showModal, setShowModal] = useState(false)



    async function loadProductionOrder() {
        const res = await getProductionOrder(productionOrderId);

        setProductionOrder({ ...res.data });
    }

    async function loadProductionOrderConsumes() {
        const res = await getProductionOrderConsumes(productionOrderId);
        setProductionOrderConsumes([...res.data]);
    }

    async function loadProductionOrderProductConsumes() {
        const res = await getProductionOrderProductConsumes(productionOrderId);
        setProductionOrderProductConsumes([...res.data]);
    }

    useEffect(() => {
        loadProductionOrder();
        loadProductionOrderConsumes();
        loadProductionOrderProductConsumes();
    }, [])

    const activeClass = "bg-green-400 p-3 rounded-lg block w-full hover:bg-green-500 mt-3"
    const inactiveClass = "bg-gray-400 p-3 rounded-lg block w-full mt-3"

    const handleClose = () => {
        setShowModal(false);
    };
    const actionBar = <button className=' bg-blue-400 rounded-lg block w-20 hover:bg-blue-500' onClick={handleClose}>Ok</button>


    const modal = <Modal onClose={handleClose} actionBar={actionBar}>
        <div>
            <h1 className='font-bold text-2xl' >Error al comenzar la orden de producción</h1>
        </div>
        {productionOrderStatus.missingIngredients && productionOrderStatus.missingIngredients.length > 0 &&
            <div className=''>
                <h1 className='font-bold text-xl mb-2 mt-2 ' >Ingredientes faltantes</h1>
                    {productionOrderStatus.missingIngredients.map(
                        missingIngredient => (
                            `${missingIngredient.aggregatedTotalIngredient.ingredientName} -
                            En stock: ${missingIngredient.totalQuantityInStock}
                            A consumir: ${missingIngredient.totalToConsume}`
                            )
                        )
                    }
            </div>
        }

        
        {productionOrderStatus.missingProducts && productionOrderStatus.missingProducts.length > 0 &&
        <div className=''>
            <h1 className='font-bold text-xl mb-2 mt-2' >Productos faltantes</h1>
                {productionOrderStatus.missingProducts.map(
                    missingProduct => (
                        `${missingProduct.aggregatedTotalProduct.productName} -
                        En stock: ${missingProduct.totalQuantityInStock}
                        A consumir: ${missingProduct.totalToConsume}`
                        )
                    )}
        </div>
        }
        
    </Modal>

    const start = (async () => {
        const response = await startProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        loadProductionOrderProductConsumes()
        refresh()
    })
    const cancel = (async () => {
        const response = await cancelProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        loadProductionOrderProductConsumes()
        refresh()
    })
    const close = (async () => {
        const response = await closeProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
        loadProductionOrderConsumes()
        loadProductionOrderProductConsumes()
        refresh()
    })

    const processResponse = ((response) => {
        if (!response.data.isOk) {
            setShowModal(true);
            setProductionOrderStatus(response.data)
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

    const configProduct = [
        {
            label: 'Producto',
            render: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.product_object.name,
            sortValue: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.product_object.name
        },
        {
            label: 'Unidad',
            render: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.measureUnit_object.symbol,
            sortValue: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.measureUnit_object.symbol
        },
        {
            label: 'Lote',
            render: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.batch,
            sortValue: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.batch
        },
        {
            label: 'Exp.',
            render: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.expirationDate,
            sortValue: (productionOrderConsumeProd) => productionOrderConsumeProd.productStock.expirationDate
        },

        {
            label: 'Consumido',
            render: (productionOrderConsume) => productionOrderConsume.quantity,
            sortValue: (productionOrderConsume) => productionOrderConsume.quantity
        }
    ];
    const keyFnProduct = (productionOrderProductConsume) => {
        return productionOrderProductConsume.id;
    }


    return (
        <div>
            {showModal && modal}
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
                <h1 className="font-bold text-xl mb-1 mt-4">Ingredientes - Detalle de los consumos de stock</h1>
                <SorteableTable data={productionOrderConsumes} config={config} keyFn={keyFn}></SorteableTable>
            </div>
            <div className="">
                <h1 className="font-bold text-xl mb-1 mt-4">Products - Detalle de los consumos de stock</h1>
                <SorteableTable data={productionOrderProductConsumes} config={configProduct} keyFn={keyFnProduct}></SorteableTable>
            </div>

        </div>
    )
}