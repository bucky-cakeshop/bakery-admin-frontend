import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const recipeApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/recipe`
})

export const getAllRecipes = () => recipeApi.get('/')

export const getRecipe = (id) => recipeApi.get(`/${id}`)

export const createRecipe = (recipe) => recipeApi.post('/', recipe)

export const deleteRecipe = (id) => recipeApi.delete(`/${id}`)

export const updateRecipe = (id, recipe) => recipeApi.put(`/${id}/`, recipe)

export const getRecipeDetails = (id) => recipeApi.get(`/${id}/get-details`)