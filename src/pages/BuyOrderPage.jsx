import BuyOrderList from '../components/buy-order/BuyOrderList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function RecipePage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/buy-orders" createPath="/buy-orders-create" title="Ordenes de compras" />
            </div>
            <div>
                <BuyOrderList />
            </div>
        </div>
         )
}

export default RecipePage;