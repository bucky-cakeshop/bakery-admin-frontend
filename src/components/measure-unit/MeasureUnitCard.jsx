/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function MeasureUnitCard({ measureUnit }) {
    //const navigate = useNavigate();

    return (
        <div
            className='bg-zinc-800 p-3 hover:bg-zinc-700 hover: cursor-pointer'
            onClick={() => {
                //navigate(`/measure-units/${measureUnit.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{measureUnit.title} (${measureUnit.symbol})</h1>
            <p className='text-slate-400'>{measureUnit.description}</p>
        </div>
    );
}