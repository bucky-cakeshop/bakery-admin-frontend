import { useEffect, useState } from "react";
import { getProductionOrderIngredients } from '../../api/productionOrder.api'
import SorteableTable from '../sortable-table/SorteableTable'

export function ProductionOrderIngredients({ productionOrderId, items }) {
    const [productionOrderIngredients, setProductionOrderIngredients] = useState([]);

    async function loadProductionOrderIngredients() {
        const res = await getProductionOrderIngredients(productionOrderId);
        setProductionOrderIngredients([...res.data]);
    }
    useEffect(() => {
        loadProductionOrderIngredients();
    }, [items])

    const config = [
        {
            label: 'Ingrediente',
            render: (productionOrder) => productionOrder.ingredient + ' - ' + productionOrder.ingredient_object.name,
            sortValue: (productionOrder) => productionOrder.ingredient_object.name
        },
        {
            label: 'Cantidad',
            render: (productionOrder) => productionOrder.quantity,
            sortValue: (productionOrder) => productionOrder.quantity
        },
        {
            label: 'Unidad',
            render: (productionOrder) => productionOrder.measureUnit_object.symbol,
            sortValue: (productionOrder) => productionOrder.measureUnit_object.symbol
        },
        {
            label: 'Recetas',
            render: (productionOrder) => productionOrder.recipe_object.name,
        }



    ];

    const keyFn = (productionOrder) => {
        return productionOrder.id;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes totales de la orden de producción</h1>
            <SorteableTable data={productionOrderIngredients} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}