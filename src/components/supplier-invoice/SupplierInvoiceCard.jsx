/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function SupplierInvoiceCard({ supplierInvoice }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/supplier-invoice/${supplierInvoice.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{supplierInvoice.id}</h1>
            <p className='text-black-400'>{supplierInvoice.description}</p>
        </div>
    );
}