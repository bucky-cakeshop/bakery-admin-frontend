import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const productApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/product`
})

export const getAllProducts = () => productApi.get('/')

export const getProduct = (id) => productApi.get(`/${id}`)

export const createProduct = (product) => productApi.post('/', product)

export const deleteProduct = (id) => productApi.delete(`/${id}`)

export const updateProduct = (id, product) => productApi.put(`/${id}/`, product)