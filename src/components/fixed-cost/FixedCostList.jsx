import { useEffect, useState } from "react";
import { getAllFixedCosts } from '../../api/fixedCost.api'
import { FixedCostCard } from "./FixedCostCard";

function FixedCostList() {
    const [fixedCosts, setFixedCosts] = useState([]);
    const [fixedCoststotal, setFixedCostsTotal] = useState();

    useEffect(() => {
        async function loadFixedCosts() {
            const res = await getAllFixedCosts();
            setFixedCosts(res.data);
        }

        loadFixedCosts();
    }, [])

    const renderTotal = () => {
        return fixedCosts.reduce((n, {amount}) => n + amount, 0);
        //return fixedCosts.reduce((n, {amount}) => n + amount, 0);
    };

    return (
        <div className="container">
        <div className="flex mx-auto font-bold">Total: €{renderTotal()}</div>
        <div className="grid grid-cols-3 gap-2">
            {
                fixedCosts.map(fixedCost => (
                    <FixedCostCard key={fixedCost.id} fixedCost={fixedCost} />
                ))
            }

        </div>
        </div>
    );
}
export default FixedCostList