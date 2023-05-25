import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const supplierInvoiceApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/supplier-invoice`
})

export const getAllSupplierInvoices = () => supplierInvoiceApi.get('/')

export const getSupplierInvoice = (id) => supplierInvoiceApi.get(`/${id}`)

export const createSupplierInvoice = (supplierInvoice) => supplierInvoiceApi.post('/', supplierInvoice)

export const deleteSupplierInvoice = (id) => supplierInvoiceApi.delete(`/${id}`)

export const updateSupplierInvoice = (id, supplierInvoice) => supplierInvoiceApi.put(`/${id}/`, supplierInvoice)

export const getSupplierInvoiceDetails = (id) => supplierInvoiceApi.get(`/${id}/get-details`)