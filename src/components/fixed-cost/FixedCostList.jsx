import { useEffect, useState } from "react";
import { getAllFixedCosts } from '../../api/fixedCost.api'
import { FixedCostCard } from "./FixedCostCard";

function FixedCostList() {
    const [fixedCosts, setFixedCosts] = useState([]);

    useEffect(() => {
        async function loadFixedCosts() {
            const res = await getAllFixedCosts();
            setFixedCosts(res.data);
        }

        loadFixedCosts();
    }, [])
    return (
        <div className="grid grid-cols-3 gap-2">
            {
                fixedCosts.map(fixedCost => (
                    <FixedCostCard key={fixedCost.id} fixedCost={fixedCost} />
                ))
            }

        </div>
    );
}
export default FixedCostList