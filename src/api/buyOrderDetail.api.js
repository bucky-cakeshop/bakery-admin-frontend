import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const buyOrderDetailApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/buy-order-detail`
})

export const createBuyOrderDetail = (buyOrderDetail) => buyOrderDetailApi.post('/', buyOrderDetail)

export const deleteBuyOrderDetail = (id) => buyOrderDetailApi.delete(`/${id}`)

export const updateBuyOrderDetail = (id, buyOrderDetail) => buyOrderDetailApi.put(`/${id}/`, buyOrderDetail)