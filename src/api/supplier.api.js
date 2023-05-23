import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const supplierApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/supplier`
})

export const getAllSuppliers = () => supplierApi.get('/')

export const getSupplier = (id) => supplierApi.get(`/${id}`)

export const createSupplier = (supplier) => supplierApi.post('/', supplier)

export const deleteSupplier = (id) => supplierApi.delete(`/${id}`)

export const updateSupplier = (id, supplier) => supplierApi.put(`/${id}/`, supplier).catch((error) => {return error.response})