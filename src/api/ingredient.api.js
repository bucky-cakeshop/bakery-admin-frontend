import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const ingredientApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/ingredient`
})

export const getAllIngredients = () => ingredientApi.get('/')

export const getIngredient = (id) => ingredientApi.get(`/${id}`)

export const createIngredient = (ingredient) => ingredientApi.post('/', ingredient)

export const deleteIngredient = (id) => ingredientApi.delete(`/${id}`)

export const updateIngredient = (id, ingredient) => ingredientApi.put(`/${id}/`, ingredient)