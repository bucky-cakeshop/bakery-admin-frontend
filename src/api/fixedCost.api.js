import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const fixedCostApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/fixed-cost`
})

export const getAllFixedCosts = () => fixedCostApi.get('/')

export const getFixedCost = (id) => fixedCostApi.get(`/${id}`)

export const createFixedCost = (fixedCost) => fixedCostApi.post('/', fixedCost)

export const deleteFixedCost = (id) => fixedCostApi.delete(`/${id}`)

export const updateFixedCost = (id, fixedCost) => fixedCostApi.put(`/${id}/`, fixedCost)