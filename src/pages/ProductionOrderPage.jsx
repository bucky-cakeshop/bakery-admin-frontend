import ProductionOrderList from '../components/production-order/ProductionOrderList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function ProductionOrderPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/production-orders" createPath="/production-orders-create" title="Orden de producción" />
            </div>
            <div>
                <ProductionOrderList />
            </div>
        </div>
         )
}

export default ProductionOrderPage;