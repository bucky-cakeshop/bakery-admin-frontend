import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const productionOrderApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/production-order`
})

export const getAllProductionOrders = () => productionOrderApi.get('/')

export const getProductionOrder = (id) => productionOrderApi.get(`/${id}`)

export const createProductionOrder = (productionOrder) => productionOrderApi.post('/', productionOrder)

export const deleteProductionOrder = (id) => productionOrderApi.delete(`/${id}`)

export const updateProductionOrder = (id, productionOrder) => productionOrderApi.put(`/${id}/`, productionOrder)

export const getProductionOrderDetails = (id) => productionOrderApi.get(`/${id}/get-details`)

export const getProductionOrderIngredients = (id) => productionOrderApi.get(`/${id}/get-ingredients`)

export const getProductionOrderAggregatedIngredients = (id) => productionOrderApi.get(`/${id}/get-aggregated-ingredients`)
