/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/products/${product.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{product.name}</h1>
            <p className='text-black-400'>{product.description}</p>
        </div>
    );
}