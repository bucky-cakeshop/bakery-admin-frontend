import { useEffect, useState } from "react";
import { getAllMeasureUnits } from '../../api/measuerUnit.api'
import { MeasureUnitCard } from "./MeasureUnitCard";

function MeasureUnitList() {
    const [measureUnits, setMeasureUnits] = useState([]);

    useEffect(() => {
        async function loadMeasureUnits() {
            const res = await getAllMeasureUnits();
            setMeasureUnits(res.data);
            console.log(res)
        }

        loadMeasureUnits();
    }, [])
    return (
        <div className="grid grid-cols-3 gap-3">
            {
                measureUnits.map(measureUnit => (
                    <MeasureUnitCard key={measureUnit.id} measureUnit={measureUnit} />
                ))
            }

        </div>
    );
}
export default MeasureUnitList