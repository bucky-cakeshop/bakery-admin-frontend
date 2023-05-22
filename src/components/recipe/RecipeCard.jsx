/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    return (
        <div
            className='bg-orange-200 p-3 hover:bg-orange-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/recipes/${recipe.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{recipe.title}</h1>
            <p className='text-black-400'>{recipe.description}</p>
        </div>
    );
}