import { useEffect, useState } from "react";
import { getAllSupplierInvoices } from '../../api/supplierInvoice.api'
import { SupplierInvoiceCard } from "./SupplierInvoiceCard";

function SupplierInvoiceList() {
    const [supplierInvoices, setSupplierInvoices] = useState([]);

    useEffect(() => {
        async function loadSupplierInvoices() {
            const res = await getAllSupplierInvoices();
            setSupplierInvoices(res.data);
        }

        loadSupplierInvoices();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    supplierInvoices.map(supplierInvoice => (
                        <SupplierInvoiceCard key={supplierInvoice.id} supplierInvoice={supplierInvoice} />
                    ))
                }

            </div>
        </div>
    );
}
export default SupplierInvoiceList