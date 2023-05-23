/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { GoDeviceMobile } from 'react-icons/go'

export function SupplierCard({ supplier }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/suppliers/${supplier.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{supplier.name}</h1>
            <p className='flex items-center font-bold'><GoDeviceMobile/>{supplier.phone}</p>
            <p className='text-black-400'>{supplier.description}</p>
        </div>
    );
}