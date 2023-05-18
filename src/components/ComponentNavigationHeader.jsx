import { Link } from "react-router-dom";

export function ComponentNavigationHeader({listPath, createPath, title}) {
    return (
        <div className="flex justify-between py-3">
            <Link to={listPath}>
                <h1 className="font-bold text-3xl mb-4">{title}</h1>
            </Link>
            <Link to={createPath} className="font-bold bg-red-300 rounded-lg hover:bg-red-400 px-3 flex" >
                <button>Nuevo</button>
            </Link>
            {/* <button className="bg-red-300 px-3 py-2 rounded-lg hover:bg-red-400">
                <Link to={createPath} className="py-4 px-5" >Nuevo</Link>
            </button> */}
        </div>
    )
}
