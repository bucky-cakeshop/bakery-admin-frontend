/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function BuyOrderCard({ buyOrder }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/buy-orders/${buyOrder.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{buyOrder.id}</h1>
            <p className='text-black-400'>{buyOrder.description}</p>
        </div>
    );
}