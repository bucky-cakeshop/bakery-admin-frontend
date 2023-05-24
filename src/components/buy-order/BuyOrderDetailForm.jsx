import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import DatePicker from "react-multi-date-picker";

import { useEffect, useState } from 'react';
import { getAllIngredients } from '../../api/ingredient.api';
import { getAllMeasureUnits } from '../../api/measureUnit.api';
import { getAllMakes } from '../../api/make.api';
import { createBuyOrderDetail } from '../../api/buyOrderDetail.api';

export function BuyOrderDetailForm({ buyOrderId, detailsChanged }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [measureUnits, setMeasureUnits] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [makes, setMakes] = useState([])

    useEffect(() => {
        async function loadMakes() {
            const res = await getAllMakes()
            setMakes(res.data)
        }
        async function loadMeasureUnits() {
            const res = await getAllMeasureUnits()
            setMeasureUnits(res.data)
        }
        async function loadIngredients() {
            const res = await getAllIngredients()
            setIngredients(res.data)
        }

        loadIngredients()
        loadMeasureUnits()
        loadMakes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMeasuerUnitOptions = () => {
        return measureUnits.map((option, index) => (
            <option key={option.id} value={option.id}>{option.title}</option>
        ));
    }
    const renderIngredientOptions = () => {
        return ingredients.map((option, index) => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ));
    }
    const renderMakeOptions = () => {
        return makes.map((option, index) => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ));
    }

    const onSubmit = handleSubmit(async data => {
        if (buyOrderId) {
            const payload = {
                buyOrder: parseInt(buyOrderId),
                ingredient: parseInt(data.ingredient),
                measureUnit: parseInt(data.measureUnit),
                make: parseInt(data.make),
                quantity: parseFloat(data.quantity),
                price: parseFloat(data.price),
                batch: data.batch.toUpperCase(),
                expirationDate: data.expirationDate
            }
            await createBuyOrderDetail(payload)
            toast.success('Se ha creado el item de la orden de compra', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
            detailsChanged()
            setValue('ingredient', 0)
            setValue('measureUnit', 0)
            setValue('make', 0)
            setValue('quantity', '')
            setValue('price', '')
            setValue('batch', '')
            setValue('expirationDate', '')
        }
    })

    return (
        <div>
            <form action="" onSubmit={onSubmit} className='grid grid-cols-3 gap-2 mb-5 grid-rows-2'>
                <select
                    name="ingredient"
                    placeholder="Ingrediente"
                    {...register("ingredient", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                >
                    <option value="">Seleccionar</option>
                    {renderIngredientOptions()}
                </select>

                <select
                    name="measureUnit"
                    placeholder="measureUnit"
                    {...register("measureUnit", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                >
                    <option value="">Seleccionar</option>
                    {renderMeasuerUnitOptions()}

                </select>
                <select
                    name="make"
                    placeholder="marca"
                    {...register("make", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                >
                    <option value="">Seleccionar</option>
                    {renderMakeOptions()}

                </select>

                <input
                    type="text"
                    placeholder="Cantidad"
                    {...register("quantity", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                />
                <input
                    type="text"
                    placeholder="Precio"
                    {...register("price", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                />
                <input
                    type="text"
                    placeholder="Lote"
                    {...register("batch", { required: true })}
                    className=' bg-blue-100 p-3 rounded-lg'
                />
                <DatePicker
                    //value={value || ""}
                    // onChange={(date) => {
                    //     onChange(date?.isValid ? date : "");
                    // }}
                    format={"DD/MM/YYYY"}
                    {...register("expirationDate", { required: true })}
                    inputClass='bg-blue-100 p-3 rounded-lg'
                />
                <span></span>

                <button className=' bg-blue-400 rounded-lg'>Agregar</button>

                {errors.ingredient && <span className='font-bold text-red-500'>Ingrediente es requerido</span>}
                {errors.measureUnit && <span className='font-bold text-red-500'>Unidad de medida es requerido</span>}
                {errors.make && <span className='font-bold text-red-500'>Marca es requerido</span>}
                {errors.quantity && <span className='font-bold text-red-500'>Cantidad es requerido</span>}
                {errors.price && <span className='font-bold text-red-500'>Precio es requerido</span>}
                {errors.batch && <span className='font-bold text-red-500'>Lote es requerido</span>}
                {errors.expirationDate && <span className='font-bold text-red-500'>Fecha de exp. es requerido</span>}
            </form>

        </div>
    )

}