import IngredientList from '../components/ingredient/IngredientList'
import { IngredientNavigation } from '../components/ingredient/IngredientNavigation';

function IngredientPage() {
    return(
        <div>
            <div className='col-span-2'>
                <IngredientNavigation />
            </div>
            <div>
                <IngredientList />
            </div>
        </div>
         )
}

export default IngredientPage;