import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const productApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/product-stock`
})

export const getAllProductStocks = () => productApi.get('/')

export const getProductStock = (id) => productApi.get(`/${id}`)

export const createProductStock = (product) => productApi.post('/', product)

export const deleteProductStock = (id) => productApi.delete(`/${id}`)

export const updateProductStock = (id, product) => productApi.put(`/${id}/`, product)