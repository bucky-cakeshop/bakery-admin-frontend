import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <Link to="/measure-units">
                <h1 className="font-bold text-3xl mb-4">Unidades de medida</h1>
            </Link>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                <Link to="/measure-units-create">Crear unidad de medida</Link>
            </button>
        </div>
    )
}
