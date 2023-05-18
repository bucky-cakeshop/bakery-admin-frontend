import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const measureUnitApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/measure-unit`
})

export const getAllMeasureUnits = () => measureUnitApi.get('/')

export const getMeasureUnit = (id) => measureUnitApi.get(`/${id}`)

export const createMeasureUnit = (measureUnit) => measureUnitApi.post('/', measureUnit)

export const deleteMeasureUnit = (id) => measureUnitApi.delete(`/${id}`)

export const updateMeasureUnit = (id, measureUnit) => measureUnitApi.put(`/${id}/`, measureUnit)