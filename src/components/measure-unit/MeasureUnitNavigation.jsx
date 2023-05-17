import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <Link to="/measure-units">
                <h1 className="font-bold text-3xl mb-4">Unidades de medida</h1>
            </Link>
            <button className="bg-red-300 px-3 py-2 rounded-lg hover:bg-red-400">
                <Link to="/measure-units-create">Nuevo</Link>
            </button>
        </div>
    )
}
