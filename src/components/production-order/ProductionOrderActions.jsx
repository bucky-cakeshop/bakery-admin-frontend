import { getProductionOrder } from '../../api/productionOrder.api'
import { useEffect, useState } from "react";

export function ProductionOrderActions({ productionOrderId }) {
    const [productionOrder, setProductionOrder] = useState({});

    async function loadProductionOrder() {
        const res = await getProductionOrder(productionOrderId);
        setProductionOrder({ ...res.data });
    }
    useEffect(() => {
        loadProductionOrder();
    }, [])
    const renderButtons = (() => {
        const activeClass = "bg-green-400 p-3 rounded-lg block w-full hover:bg-green-500 mt-3"
        const inactiveClass = "bg-gray-400 p-3 rounded-lg block w-full mt-3"

        if (productionOrder.startDate === null && productionOrder.canceledDate === null && productionOrder.closedDate === null) {
            //return "Created - Start button active"
            return (
                <div className="mx-auto grid grid-cols-3 gap-x-2">
                    <button className={activeClass}>Comenzar</button>
                    <button className={inactiveClass} disabled>Cancelar</button>
                    <button className={inactiveClass} disabled>Cerrar</button>
                </div>
            )

        } else if (productionOrder.startDate !== null && productionOrder.canceledDate === null && productionOrder.closedDate === null) {
            //return "Started - Cancel and close buttons active"
            return (
                <div className="mx-auto grid grid-cols-3 gap-x-2">
                    <button className={inactiveClass} disabled>Comenzar</button>
                    <button className={activeClass}>Cancelar</button>
                    <button className={activeClass}>Cerrar</button>
                </div>
            )
            
        } else if (productionOrder.startDate === null && productionOrder.canceledDate !== null && productionOrder.closedDate === null) {
            //eturn "Canceled - Start button active"
            return (
                <div className="mx-auto grid grid-cols-3 gap-x-2">
                    <button className={activeClass}>Comenzar</button>
                    <button className={inactiveClass} disabled>Cancelar</button>
                    <button className={inactiveClass} disabled>Cerrar</button>
                </div>
            )

        } else if (productionOrder.startDate === null && productionOrder.canceledDate !== null && productionOrder.closedDate === null) {
            //return "Closed - All inactive"
            return (
                <div className="mx-auto grid grid-cols-3 gap-x-2">
                    <button className={inactiveClass} disabled>Comenzar</button>
                    <button className={inactiveClass} disabled>Cancelar</button>
                    <button className={inactiveClass} disabled>Cerrar</button>
                </div>
            )
        }


    })

    return (
        <div>
            {renderButtons()}
        </div>
    )

}