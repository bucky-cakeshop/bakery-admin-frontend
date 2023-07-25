import ProductStockList from '../../components/product-stock/ProductStockList'
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';

function ProductStockPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/productStocks" createPath="/productStocks-create" title="Stock de productos" />
            </div>
            <div>
                <ProductStockList />
            </div>
        </div>
         )
}

export default ProductStockPage;