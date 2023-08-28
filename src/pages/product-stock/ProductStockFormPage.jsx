import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { createProductStock, deleteProductStock, updateProductStock, getProductStock } from '../../api/productStock.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';

function ProductStockFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        async function loadProductStock() {
            if (params.id) {
                const res = await getProductStock(params.id)
                setValue('name', res.data.name)
                setValue('description', res.data.description)
                setValue('recipe',res.data.recipe)
                setValue('quantityByRecipe',res.data.quantityByRecipe)
                setValue('isForSell',res.data.isForSell)
                setProduct(res.data)
            }
        }
        loadProductStock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = handleSubmit(async data => {
        if (params.id) {
            await updateProductStock(params.id, data)
            toast.success('Stock de Producto actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createProductStock(data);
            toast.success('Stock de Producto creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/product-stocks')
    })

    const handleDelete = (async () => {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            await deleteProductStock(params.id)
            toast.success('Stock de Producto eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

            navigate('/product-stocks')
        }

    })

    const renderRecipe = (()=>{
        if(!params.id) {
            return (
                <select
                name="recipe"
                placeholder="Receta"
                {...register("recipe", { required: false })}
                className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
            >
                <option value="">Seleccionar</option>
            </select>
            )
        }else{
            return (
                product.recipe_object &&
                <h1 className="p-3 rounded-lg w-full mb-3 col-span-3">Este producto es generado por la receta: <b>{product.recipe_object.title}</b></h1>
            )
        }
    })

    return (
        <div className='mx-auto grid grid-cols-3 gap-x-2'>
            <div className='col-span-3'>
                <ComponentNavigationHeader listPath="/product-stocks" createPath="/product-stocks-create" title="Stock de Productos" />
            </div>
            <p className='col-span-3'>
                <ul>Si es nuevo<br></br>
                    <li>- seleccionar producto. Producto</li>
                    <li>- Unidad de medida</li>
                    <li>- Cantidad</li>
                    <li>- isForSell = true</li>
                    <li>- Lote</li>
                    <li>- Fecha de expiración</li>
                    <li>- Precio de costo unitario</li>
                    <li>- Precio de venta unitario</li>
                </ul><br />
                <ul>Si es edición
                    <li>- (RO) Se muestra el Producto</li>
                    <li>- (RO) Se muestra la Unidad de medida</li>
                    <li>- Cantidad</li>
                    <li>- (RO) Cantidad consumida</li>
                    <li>- (RO) se muestra isForSell = true</li>
                    <li>- (RO) Se muestra Lote</li>
                    <li>- (RO) Se muestra Fecha de expiración</li>
                    <li>- (RO) Precio de costo unitario</li>
                    <li>- Precio de venta unitario</li>
                </ul><br />
                <b>Mostrar listado de cantidades disponibles agrupado por producto</b><br />

            </p>

            <form action="" className='col-span-3'>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("name", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.name && <span>Campo requerido</span>}

                <textarea
                    rows="3"
                    placeholder="Descripción"
                    {...register("description", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />
                {errors.description && <span>Campo requerido</span>}

                <input
                    type="text"
                    placeholder="Cantidad por receta"
                    {...register("quantityByRecipe", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                />
                <label className='mb-3 w-5 '>Es para ventas</label>
                <input
                    type="checkbox"
                    placeholder="es para venta"
                    {...register("isForSell", { required: false })}
                    className=' bg-blue-100 p-3 rounded-lg ml-3 mb-3'
                />
            </form>
            <button className=' bg-blue-400 p-3 rounded-lg block w-full col-span-2 hover:bg-blue-500' onClick={handleSave}>Guardar</button>            
            {params.id &&
                <div className=' flex justify-end'>
                    <button
                        className=' bg-red-400 p-3 rounded-lg w-full hover:bg-red-500'
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            }
        </div>
    )
}

export default ProductStockFormPage;