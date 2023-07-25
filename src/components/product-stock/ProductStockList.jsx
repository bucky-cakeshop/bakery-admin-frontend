import { useEffect, useState } from "react";
import { getAllProductStocks } from '../../api/productStock.api'
import { ProductStockCard } from "./ProductStockCard";

function ProductStockList() {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        async function loadProductStocks() {
            const res = await getAllProductStocks();
            setproducts(res.data);
        }

        loadProductStocks();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {
                    products.map(productStock => (
                        <ProductStockCard key={productStock.id} productStock={productStock} />
                    ))
                }

            </div>
        </div>
    );
}
export default ProductStockList