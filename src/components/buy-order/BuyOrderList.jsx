import { useEffect, useState } from "react";
import { getAllBuyOrders } from '../../api/buyOrder.api'
import { BuyOrderCard } from "./BuyOrderCard";

function BuyOrderList() {
    const [buyOrders, setBuyOrders] = useState([]);

    useEffect(() => {
        async function loadBuyOrders() {
            const res = await getAllBuyOrders();
            setBuyOrders(res.data);
        }

        loadBuyOrders();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    buyOrders.map(buyOrder => (
                        <BuyOrderCard key={buyOrder.id} buyOrder={buyOrder} />
                    ))
                }

            </div>
        </div>
    );
}
export default BuyOrderList