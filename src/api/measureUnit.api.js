import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const taskApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/measure-unit`
})

export const getAllMeasureUnits = () => taskApi.get('/')

export const getMeasureUnit = (id) => taskApi.get(`/${id}`)

export const createMeasureUnit = (task) => taskApi.post('/', task)

export const deleteMeasureUnit = (id) => taskApi.delete(`/${id}`)

export const updateMeasureUnit = (id, task) => taskApi.put(`/${id}/`, task)