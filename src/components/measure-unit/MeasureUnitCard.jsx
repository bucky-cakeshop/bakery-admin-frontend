/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function MeasureUnitCard({ measureUnit }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/measure-units/${measureUnit.id}`)
            }}
        >
            {/* <h1 className='font-bold uppercase'>{measureUnit.symbol}</h1> */}
            <h1 className='font-bold uppercase'>{measureUnit.title} ({measureUnit.symbol})</h1>
            <p className='text-black-400'>{measureUnit.description}</p>
        </div>
    );
}