import SupplierList from '../components/supplier/SupplierList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function SupplierPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/suppliers" createPath="/suppliers-create" title="Proveedores" />
            </div>
            <div>
                <SupplierList />
            </div>
        </div>
         )
}

export default SupplierPage;