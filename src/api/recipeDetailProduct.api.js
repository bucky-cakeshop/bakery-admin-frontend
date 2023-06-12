import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const recipeApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/recipe-detail-product`
})

export const createRecipeDetailProduct = (recipeDetailProduct) => recipeApi.post('/', recipeDetailProduct)

export const deleteRecipeDetailProduct = (id) => recipeApi.delete(`/${id}`)

export const updateRecipeDetailProduct = (id, recipeDetailProduct) => recipeApi.put(`/${id}/`, recipeDetailProduct)