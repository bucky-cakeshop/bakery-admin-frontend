import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const buyOrderApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/buy-order`
})

export const getAllBuyOrders = () => buyOrderApi.get('/')

export const getBuyOrder = (id) => buyOrderApi.get(`/${id}`)

export const createBuyOrder = (buyOrder) => buyOrderApi.post('/', buyOrder)

export const deleteBuyOrder = (id) => buyOrderApi.delete(`/${id}`)

export const updateBuyOrder = (id, buyOrder) => buyOrderApi.put(`/${id}/`, buyOrder)

export const getBuyOrderDetails = (id) => buyOrderApi.get(`/${id}/get-details`)