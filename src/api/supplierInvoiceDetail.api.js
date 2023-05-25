import axios from 'axios';

//console.log(import.meta.env.VITE_BACKEND_URL)
const URL = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000'


const supplierInvoiceDetailApi = axios.create({
    baseURL: `${URL}/bakeryAdmin/api/v1/supplier-invoice-detail`
})

export const createSupplierInvoiceDetail = (supplierInvoiceDetail) => supplierInvoiceDetailApi.post('/', supplierInvoiceDetail)

export const deleteSupplierInvoiceDetail = (id) => supplierInvoiceDetailApi.delete(`/${id}`)

export const updateSupplierInvoiceDetail = (id, supplierInvoiceDetail) => supplierInvoiceDetailApi.put(`/${id}/`, supplierInvoiceDetail)