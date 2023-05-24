import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const makeApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/make`
})

export const getAllMakes = () => makeApi.get('/')

export const getMake = (id) => makeApi.get(`/${id}`)

export const createMake = (make) => makeApi.post('/', make)

export const deleteMake = (id) => makeApi.delete(`/${id}`)

export const updateMake = (id, make) => makeApi.put(`/${id}/`, make).catch((error) => {return error.response})