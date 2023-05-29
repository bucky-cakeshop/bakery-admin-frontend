import { useEffect, useState } from "react";
import { getProductionOrderAggregatedIngredients } from '../../api/productionOrder.api'
import SorteableTable from '../sortable-table/SorteableTable'

export function ProductionOrderAggregatedIngredients({ productionOrderId, items }) {
    const [productionOrderAggregatedIngredients, setProductionOrderAggregatedIngredients] = useState([]);

    async function loadProductionOrderAggregatedIngredients() {
        const res = await getProductionOrderAggregatedIngredients(productionOrderId);
        setProductionOrderAggregatedIngredients([...res.data]);
    }
    useEffect(() => {
        loadProductionOrderAggregatedIngredients();
    }, [items])

    const config = [
        {
            label: 'Ingrediente',
            render: (productionOrder) => productionOrder.ingredientName,
            sortValue: (productionOrder) => productionOrder.ingredientName
        },
        {
            label: 'Cantidad',
            render: (productionOrder) => productionOrder.total,
            sortValue: (productionOrder) => productionOrder.total
        },
        {
            label: 'Unidad',
            render: (productionOrder) => productionOrder.measureUnitSymbol,
            sortValue: (productionOrder) => productionOrder.measureUnitSymbol
        }
    ];

    const keyFn = (productionOrder) => {
        return productionOrder.id;
    }

    return (
        <div>
            <h1 className="font-bold text-xl mb-1 mt-4">Ingredientes totales de la orden de producción</h1>
            <SorteableTable data={productionOrderAggregatedIngredients} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}