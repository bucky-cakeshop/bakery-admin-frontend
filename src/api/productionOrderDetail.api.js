import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const productionORderDetailApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/production-order-detail`
})

export const createProductionOrderDetail = (productionORderDetail) => productionORderDetailApi.post('/', productionORderDetail)

export const deleteProductionOrderDetail = (id) => productionORderDetailApi.delete(`/${id}`)

export const updateProductionOrderDetail = (id, productionORderDetail) => productionORderDetailApi.put(`/${id}/`, productionORderDetail)