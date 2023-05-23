import { useEffect, useState } from "react";
import { getAllSuppliers } from '../../api/supplier.api'
import { SupplierCard } from "./SupplierCard";

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        async function loadSuppliers() {
            const res = await getAllSuppliers();
            setSuppliers(res.data);
        }

        loadSuppliers();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    suppliers.map(supplier => (
                        <SupplierCard key={supplier.id} supplier={supplier} />
                    ))
                }

            </div>
        </div>
    );
}
export default SupplierList