import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const recipeApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/recipe-detail`
})

export const createRecipeDetail = (recipeDetail) => recipeApi.post('/', recipeDetail)

export const deleteRecipeDetail = (id) => recipeApi.delete(`/${id}`)

export const updateRecipeDetail = (id, recipeDetail) => recipeApi.put(`/${id}/`, recipeDetail)