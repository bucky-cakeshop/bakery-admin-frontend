import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import DatePicker from "react-multi-date-picker";
import { createProductStock, deleteProductStock, updateProductStock, getProductStock } from '../../api/productStock.api';
import { getAllProducts, getProduct } from '../../api/product.api';
import { getAllMeasureUnits } from '../../api/measureUnit.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';
import moment from 'moment/moment';

function ProductStockFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [productStock, setProductStock] = useState({})
    const [products, setProducts] = useState([])
    const [measureUnits, setMeasureUnits] = useState([])    

    useEffect(() => {
        async function loadProductStock() {
            if (params.id) {
                const res = await getProductStock(params.id)
                setValue('product', res.data.product)
                setValue('measureUnit', res.data.measureUnit)
                setValue('quantity',res.data.quantity)
                setValue('quantityConsumed',res.data.quantityConsumed)
                setValue('isForSell',res.data.isForSell)
                setValue('batch',res.data.batch)
                setValue('expirationDate', res.data.expirationDate)
                setValue('unitCostPrice',res.data.unitCostPrice)
                setValue('unitSellPrice',res.data.unitSellPrice)

                setProductStock(res.data)
            }
        }
        async function loadProducts(){
            const res = await getAllProducts()
            setProducts(res.data)
        }
        async function loadMeasureUnits() {
            const res = await getAllMeasureUnits()
            setMeasureUnits(res.data)
        }

        loadProductStock()
        loadProducts()
        loadMeasureUnits()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = handleSubmit(async data => {
        const payload = {
            product: parseInt(data.product),
            measureUnit: parseInt(data.measureUnit),
            quantity: parseFloat(data.quantity),
            quantityConsumed: parseFloat(data.quantityConsumed),
            isForSell: data.isForSell,
            batch: data.batch.toUpperCase(),
            expirationDate: moment(new Date(data.expirationDate)).format('YYYY-MM-DD'),
            unitCostPrice: parseFloat(data.unitCostPrice),
            unitSellPrice: parseFloat(data.unitSellPrice),
        }

        if (params.id) {
            await updateProductStock(params.id, payload)
            toast.success('Stock de Producto actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createProductStock(payload);
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

    const renderProductOptions = () => {
        return products.map((option, index) => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ));
    }
    const renderMeasuerUnitOptions = () => {
        return measureUnits.map((option, index) => (
            <option key={option.id} value={option.id}>{option.title}</option>
        ));
    }

    const renderProduct = (()=>{
        if(!params.id) {
            return (
                <select
                name="product"
                placeholder="Producto"
                {...register("product", { required: false })}
                className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
            >
                <option value="">Seleccionar</option>
                {renderProductOptions()}
            </select>
            )
        }else{
            return (
                productStock.product_object &&
                <h1 className="p-3 rounded-lg w-full mb-3 col-span-3">Producto: <b>{productStock.product_object.name}</b></h1>
            )
        }
    })
    const renderMeasureUnits = (()=>{
        if(!params.id) {
            return (
                <select
                        name="measureUnit"
                        placeholder="measureUnit"
                        {...register("measureUnit", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                    >
                        <option value="">Seleccionar</option>
                        {renderMeasuerUnitOptions()}

                </select>
            )
        }else{
            return (
                productStock.product_object &&
                <h1 className="p-3 rounded-lg w-full mb-3 col-span-3">Unidad de medida: <b>{productStock.measureUnit_object.symbol}</b></h1>
            )
        }
    })
    const renderControlls = (()=>{
        if(!params.id) {
            return renderForCreate()
        } else {
            return renderForEdit()
        }
    })
    const renderForEdit = (()=>{
        var forSell = productStock.isForSell ? 'Sí':'No'
        return (
            productStock.product_object &&
            <div className='w-full mb-3 col-span-3'>
                 <h1 className="p-0 rounded-lg w-full mb-0 col-span-3"><b>{productStock.product_object.name}</b> para venta en mostrador: <b>{forSell}</b></h1>
                 <h1 className="p-0 rounded-lg w-full mb-0 col-span-3">Disponible: <b>{productStock.quantity - productStock.quantityConsumed} {productStock.measureUnit_object.symbol}</b></h1>
                 <h1 className="p-0 rounded-lg w-full mb-0 col-span-3">Precios por <b>{productStock.measureUnit_object.symbol}</b> Costo: <b>{productStock.unitCostPrice}</b> Venta: <b>{productStock.unitSellPrice}</b></h1>
                 <h1 className="p-0 rounded-lg w-full mb-3 col-span-3">Lote: <b>{productStock.batch}</b> - Expira el: <b>{moment(productStock.expirationDate).format('DD-MM-YYYY')}</b></h1>
                 
                 <form action="" className='col-span-3'>
                    <label className='mt-3'>Cantidad:</label>
                    <input
                            type="text"
                            placeholder="Cantidad"
                            {...register("quantity", { required: true })}
                            className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                    />
                    {errors.quantity && <span className='font-bold text-red-500'>Cantidad es requerido</span>}
                    
                    <label className='mt-3'>Cantidad consumida:</label>
                    <input
                            type="text"
                            placeholder="Cantidad consumida"
                            {...register("quantityConsumed", { required: false })}
                            className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                    />
                 </form>
            </div>
        )

    })
    const renderForCreate = (()=>{
        return (
            <form action="" className='col-span-3'>
                <select
                    name="product"
                    placeholder="Producto"
                    {...register("product", { required: false })}
                    className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                >
                    <option value="">Seleccionar</option>
                    {renderProductOptions()}
                </select>
                {errors.product && <span className='font-bold text-red-500'>Producto requerido</span>}

                <select
                        name="measureUnit"
                        placeholder="measureUnit"
                        {...register("measureUnit", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                    >
                        <option value="">Seleccionar</option>
                        {renderMeasuerUnitOptions()}

                </select>
                {errors.measureUnit && <span className='font-bold text-red-500'>Unidad de medida es requerido</span>}

                <input
                        type="text"
                        placeholder="Cantidad"
                        {...register("quantity", { required: true })}
                        className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                />
                {errors.quantity && <span className='font-bold text-red-500'>Cantidad es requerido</span>}
                
                <input
                        type="text"
                        placeholder="Cantidad consumida"
                        {...register("quantityConsumed", { required: false })}
                        className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                />
                <label className='mb-3 w-5 '>Es para ventas</label>
                <input
                    type="checkbox"
                    placeholder="es para venta"
                    {...register("isForSell", { required: false })}
                    className=' bg-blue-100 p-3 rounded-lg ml-3 mb-3'
                />
                
                <input
                    type="text"
                    placeholder="Lote"
                    {...register("batch", { required: false })}
                    className=' bg-blue-100 p-3 rounded-lg block w-full mb-3'
                />

                <Controller
                    control={control}
                    name="expirationDate"
                    rules={{ required: true }}
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty },
                        formState: { errors },
                    }) => (
                        <>
                            <DatePicker
                                value={value || ""}
                                onChange={(date) => {
                                    onChange(date?.isValid ? date : "");
                                }}
                                format={"DD/MM/YYYY"}
                                inputClass=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                            />
                        </>
                    )}
                />
                {errors.expirationDate && <span className='font-bold text-red-500'>Fecha de exp. es requerido</span>}

                <input
                    type="text"
                    placeholder="Precio unitario de costo"
                    {...register("unitCostPrice", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                />
                {errors.unitCostPrice && <span className='font-bold text-red-500'>Precio es requerido</span>}

                <input
                    type="text"
                    placeholder="Precio unitario de venta"
                    {...register("unitSellPrice", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg w-full mb-3'
                />
                {errors.unitSellPrice && <span className='font-bold text-red-500'>Precio es requerido</span>}
            </form>            
        )        

    })

    return (
        <div className='mx-auto grid grid-cols-3 gap-x-2'>
            <div className='col-span-3'>
                <ComponentNavigationHeader listPath="/product-stocks" createPath="/product-stocks-create" title="Stock de Productos" />
            </div>
            {renderControlls()}

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