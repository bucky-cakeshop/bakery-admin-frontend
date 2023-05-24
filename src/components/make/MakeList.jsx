import { useEffect, useState } from "react";
import { getAllMakes } from '../../api/make.api'
import { MakeCard } from "./MakeCard";

function MakeList() {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        async function loadMakes() {
            const res = await getAllMakes();
            setMakes(res.data);
        }

        loadMakes();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    makes.map(make => (
                        <MakeCard key={make.id} make={make} />
                    ))
                }

            </div>
        </div>
    );
}
export default MakeList