/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
//import useNavigation from "../../hooks/use-navigation";

export function MeasureUnitCard({ measureUnit }) {
    //const {navigate, currentPath} =  useNavigation();
    const navigate = useNavigate();

    return (
        <div
            className='bg-blue-300 p-3 hover:bg-blue-400 hover: cursor-pointer rounded'
            onClick={() => {
                navigate(`/measure-units/${measureUnit.id}`)
            }}
        >
            <h1 className='font-bold uppercase'>{measureUnit.title} ({measureUnit.symbol})</h1>
            <p className='text-black-400'>{measureUnit.description}</p>
        </div>
    );
}