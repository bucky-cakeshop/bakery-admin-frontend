import ProductList from '../../components/product/ProductList'
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';

function ProductPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/products" createPath="/products-create" title="Productos" />
            </div>
            <div>
                <ProductList />
            </div>
        </div>
         )
}

export default ProductPage;