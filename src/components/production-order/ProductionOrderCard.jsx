/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function ProductionOrderCard({ productionOrder }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/production-orders/${productionOrder.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{productionOrder.title}</h1>
            <p className='text-black-400'>{productionOrder.description}</p>
        </div>
    );
}