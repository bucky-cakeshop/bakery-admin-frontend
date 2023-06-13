import RecipeList from '../../components/recipe/RecipeList'
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';

function RecipePage() {
    return(
        <div>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/recipes" createPath="/recipes-create" title="Recetas" />
            </div>
            <div>
                <RecipeList />
            </div>
        </div>
         )
}

export default RecipePage;