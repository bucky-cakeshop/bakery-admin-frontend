import MeasureUnitList from '../components/measure-unit/MeasureUnitList'
import { Navigation } from '../components/measure-unit/MeasureUnitNavigation';

function MeasuerUnitPage() {
    return(
        <div>
            <div className='col-span-2'>
                <Navigation />
            </div>
            <div>
                <MeasureUnitList />
            </div>
        </div>
         )
}

export default MeasuerUnitPage;