/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function MakeCard({ make }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/makes/${make.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{make.name}</h1>
            <p className='text-black-400'>{make.description}</p>
        </div>
    );
}