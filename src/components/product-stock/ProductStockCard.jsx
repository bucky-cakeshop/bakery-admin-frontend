/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function ProductStockCard({ productStock }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/product-stocks/${productStock.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{productStock.product_object.name}</h1>
            <p className='text-black-400'>Disponible: {productStock.quantity - productStock.quantityConsumed} {productStock.measureUnit_object.symbol}</p>
            <p className='text-black-400'>Lote: {productStock.batch}</p>
            <p className='text-black-400'>Expiración: {productStock.expirationDate}</p>
        </div>
    );
}