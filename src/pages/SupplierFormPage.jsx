import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createSupplier, deleteSupplier, updateSupplier, getSupplier } from '../api/supplier.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../components/ComponentNavigationHeader';

function SupplierFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadSupplier() {
            if (params.id) {
                const res = await getSupplier(params.id)
                setValue('name', res.data.name)
                setValue('description', res.data.description)
                setValue('email', res.data.email)
                setValue('web', res.data.web)
                setValue('phone', res.data.phone)
            }
        }
        loadSupplier()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            const response = await updateSupplier(params.id, data)
            if (response.status === 400) {
                toast.error('Error al actualizar: ' + response.data.email, {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                })
                return
            } else {
                toast.success('Proveedor actualizado', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                })
            }
        } else {
            await createSupplier(data);
            toast.success('Proveedor creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/suppliers')
    })

    return (
        <div className='max-w-xl mx-auto'>
            <div className='col-span-2'>
                <ComponentNavigationHeader listPath="/suppliers" createPath="/suppliers-create" title="Proveedores" />
            </div>

            <form action="" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("name", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.name && <span>Campo requerido</span>}

                <input
                    type="text"
                    placeholder="teléfono"
                    {...register("phone", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.phone && <span>Campo requerido</span>}

                <input
                    type="text"
                    placeholder="email"
                    {...register("email")}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.email && <span>Campo requerido</span>}

                <input
                    type="text"
                    placeholder="web"
                    {...register("web")}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.web && <span>Campo requerido</span>}

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
                                await deleteSupplier(params.id)
                                toast.success('Proveedor eliminado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })

                                navigate('/suppliers')
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            }

        </div>
    )
}

export default SupplierFormPage;