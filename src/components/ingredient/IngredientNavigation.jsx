import { Link } from "react-router-dom";

export function IngredientNavigation() {
    return (
        <div className="flex justify-between py-3">
            <Link to="/ingredients">
                <h1 className="font-bold text-3xl mb-4">Ingredientes</h1>
            </Link>
            <button className="bg-red-300 px-3 py-2 rounded-lg hover:bg-red-400">
                <Link to="/ingredients-create">Nuevo</Link>
            </button>
        </div>
    )
}
