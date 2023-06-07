import { getProductionOrder, startProductionOrder, cancelProductionOrder, closeProductionOrder } from '../../api/productionOrder.api'
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export function ProductionOrderActions({ productionOrderId }) {
    const [productionOrder, setProductionOrder] = useState({});

    async function loadProductionOrder() {
        const res = await getProductionOrder(productionOrderId);
        
        setProductionOrder({ ...res.data });
    }
    useEffect(() => {
        loadProductionOrder();
        
    }, [])
    
    const activeClass = "bg-green-400 p-3 rounded-lg block w-full hover:bg-green-500 mt-3"
    const inactiveClass = "bg-gray-400 p-3 rounded-lg block w-full mt-3"
    const getButtonsState = (() => {
        const result = {
            startedButtonDisabled: true,
            canceledButtonDisabled: true,
            closedButtonDisabled: true
        }
        if(productionOrder === null){
            return result
        }
        if (productionOrder.startedDate === null && productionOrder.canceledDate === null && productionOrder.closedDate === null) {
            result.startedButtonDisabled = false
            result.canceledButtonDisabled = true
            result.closedButtonDisabled = true

        } else if (productionOrder.startedDate !== null && productionOrder.canceledDate === null && productionOrder.closedDate === null) {
            result.startedButtonDisabled = true
            result.canceledButtonDisabled = false
            result.closedButtonDisabled = false
        } else if (productionOrder.startedDate !== null && productionOrder.canceledDate !== null && productionOrder.closedDate === null) {
            result.startedButtonDisabled = false
            result.canceledButtonDisabled = true
            result.closedButtonDisabled = true

        } else if (productionOrder.startedDate === null && productionOrder.canceledDate !== null && productionOrder.closedDate === null) {
            result.startedButtonDisabled = true
            result.canceledButtonDisabled = true
            result.closedButtonDisabled = true
        }
        return result
    })
    const start = (async ()=>{
        const response = await startProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
    })
    const cancel = (async ()=>{
        const response = await cancelProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
    })
    const close = (async ()=>{
        const response = await closeProductionOrder(productionOrderId)
        processResponse(response)
        loadProductionOrder()
    })

    const processResponse = ((response)=>{
        if(!response.data.isOk){
            toast.error('Error al cambiar de estado ' + response.data.status.message, {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
    })

    return (
        <div>
            <div className="mx-auto grid grid-cols-3 gap-x-2">
                <button 
                    className={getButtonsState(productionOrder).startedButtonDisabled ? inactiveClass:activeClass} 
                    disabled = {getButtonsState(productionOrder).startedButtonDisabled} 
                    onClick={()=>start()}
                    >
                    Comenzar
                </button>
                <button 
                    className={getButtonsState(productionOrder).canceledButtonDisabled ? inactiveClass:activeClass} 
                    disabled = {getButtonsState(productionOrder).canceledButtonDisabled} 
                    onClick={()=>cancel()}
                    >
                    Cancelar
                </button>
                <button 
                    className={getButtonsState(productionOrder).closedButtonDisabled ? inactiveClass:activeClass} 
                    disabled = {getButtonsState(productionOrder).closedButtonDisabled} 
                    onClick={()=>close()}
                    >
                    Cerrar
                </button>
            </div>
        </div>
    )
}