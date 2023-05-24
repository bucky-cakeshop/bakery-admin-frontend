import MakeList from '../components/make/MakeList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function MakePage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/makes" createPath="/makes-create" title="Proveedores" />
            </div>
            <div>
                <MakeList />
            </div>
        </div>
         )
}

export default MakePage;