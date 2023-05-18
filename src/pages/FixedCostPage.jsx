import FixedCostList from '../components/fixed-cost/FixedCostList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function FixedCostPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/fixed-costs" createPath="/fixed-costs-create" title="Costos fijos" />
            </div>
            <div>
                <FixedCostList />
            </div>
        </div>
         )
}

export default FixedCostPage;