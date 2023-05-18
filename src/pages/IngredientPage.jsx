import IngredientList from '../components/ingredient/IngredientList'
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function IngredientPage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/ingredients" createPath="/ingredients-create" title="Ingredientes" />
            </div>
            <div>
                <IngredientList />
            </div>
        </div>
         )
}

export default IngredientPage;