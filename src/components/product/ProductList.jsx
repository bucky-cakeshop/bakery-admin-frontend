import { useEffect, useState } from "react";
import { getAllProducts } from '../../api/product.api'
import { ProductCard } from "./ProductCard";

function RecipeList() {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const res = await getAllProducts();
            setproducts(res.data);
        }

        loadProducts();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }

            </div>
        </div>
    );
}
export default RecipeList