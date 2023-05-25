import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { createSupplierInvoice, deleteSupplierInvoice, updateSupplierInvoice, getSupplierInvoice } from '../api/supplierInvoice.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';
import { SupplierInvoiceDetails } from '../components/supplier-invoice/SupplierInvoiceDetails';
import { getAllSuppliers } from '../api/supplier.api';

function SupplierInvoiceFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [suppliers, setSuppliers] = useState([])

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadSupplierInvoice() {
            if (params.id) {
                const res = await getSupplierInvoice(params.id)
                setValue('title', res.data.Id)
                setValue('description', res.data.description)
                setValue('supplier', res.data.supplier)
            }
        };
        async function loadSuppliers() {
            const res = await getAllSuppliers()
            setSuppliers(res.data)
        }

        loadSupplierInvoice()
        loadSuppliers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderSupplierOptions = () => {
        return suppliers.map((option, index) => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ));
    }

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateSupplierInvoice(params.id, data)
            toast.success('Comprobante actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createSupplierInvoice(data);
            toast.success('Comprobante creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/supplier-invoice')
    })

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/supplier-invoice" createPath="/supplier-invoice-create" title="Comprobantes de proveedores" />
            </div>

            <form action="" onSubmit={onSubmit}>
                <select
                    name="supplier"
                    placeholder="Proveedor"
                    {...register("supplier", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                >
                    <option value="">Seleccionar</option>
                    {renderSupplierOptions()}
                </select>
                {errors.supplier && <span>Campo requerido</span>}

                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.description && <span>Campo requerido</span>}

                <button className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Guardar</button>
            </form>
            {params.id &&
                <div className=' flex justify-end'>
                    <button
                        className=' bg-red-500 p-3 rounded-lg w-48 mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Seguro de eliminar?');
                            if (accepted) {
                                await deleteSupplierInvoice(params.id)
                                toast.success('Comprobante eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/supplier-invoice')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }
            {/* Veremos la tabla de ingredientes cuando estoy editando */}
            {params.id &&
                <SupplierInvoiceDetails supplierInvoiceId={params.id}></SupplierInvoiceDetails>
            }
        </div>
    )
}

export default SupplierInvoiceFormPage;