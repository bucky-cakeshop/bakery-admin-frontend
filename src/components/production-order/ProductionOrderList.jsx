import { useEffect, useState } from "react";
import { getAllProductionOrders } from '../../api/productionOrder.api'
import { ProductionOrderCard } from "./ProductionOrderCard";

function ProductionOrderList() {
    const [productionOrders, setProductionOrders] = useState([]);

    useEffect(() => {
        async function loadProductionOrders() {
            const res = await getAllProductionOrders();
            setProductionOrders(res.data);
        }

        loadProductionOrders();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    productionOrders.map(productionOrder => (
                        <ProductionOrderCard key={productionOrder.id} productionOrder={productionOrder} />
                    ))
                }

            </div>
        </div>
    );
}
export default ProductionOrderList