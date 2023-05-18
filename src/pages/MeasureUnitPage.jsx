import MeasureUnitList from '../components/measure-unit/MeasureUnitList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function MeasuerUnitPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/measure-units" createPath="/measure-units-create" title="Unidades de medida" />
            </div>
            <div>
                <MeasureUnitList />
            </div>
        </div>
         )
}

export default MeasuerUnitPage;