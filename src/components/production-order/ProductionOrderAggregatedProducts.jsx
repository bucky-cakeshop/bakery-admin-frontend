import { useEffect, useState } from "react";
import { getProductionOrderAggregatedProducts } from '../../api/productionOrder.api'
import SorteableTable from '../sortable-table/SorteableTable'

export function ProductionOrderAggregatedProducts({ productionOrderId, items }) {
    const [productionOrderAggregatedProducts, setProductionOrderAggregatedProducts] = useState([]);

    async function loadProductionOrderAggregatedProducts() {
        const res = await getProductionOrderAggregatedProducts(productionOrderId);
        setProductionOrderAggregatedProducts([...res.data]);
    }
    useEffect(() => {
        loadProductionOrderAggregatedProducts();
    }, [items])

    const config = [
        {
            label: 'Producto',
            render: (aggProd) => aggProd.productName,
            sortValue: (aggProd) => aggProd.productName
        },
        {
            label: 'Cantidad',
            render: (aggProd) => aggProd.total,
            sortValue: (aggProd) => aggProd.total
        },
        {
            label: 'Unidad',
            render: (aggProd) => aggProd.measureUnitSymbol,
            sortValue: (aggProd) => aggProd.measureUnitSymbol
        }
    ];

    const keyFn = (productionOrder) => {
        return productionOrder.id;
    }

    return (
        <div>
            <h1 className="font-bold text-xl mb-1 mt-4">Products totales de la orden de producción</h1>
            <SorteableTable data={productionOrderAggregatedProducts} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}