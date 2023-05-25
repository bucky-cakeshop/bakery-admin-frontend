import SupplierInvoiceList from '../components/supplier-invoice/SupplierInvoiceList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function SupplierInvoicePage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/supplier-invoice" createPath="/supplier-invoice-create" title="Comprobantes de proveedores" />
            </div>
            <div>
                <SupplierInvoiceList />
            </div>
        </div>
         )
}

export default SupplierInvoicePage;