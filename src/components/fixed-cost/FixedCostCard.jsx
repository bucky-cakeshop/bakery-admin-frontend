/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function FixedCostCard({ fixedCost }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/fixed-costs/${fixedCost.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{fixedCost.title} (€{fixedCost.amount})</h1>
            <p className='text-black-400'>{fixedCost.description}</p>
        </div>
    );
}