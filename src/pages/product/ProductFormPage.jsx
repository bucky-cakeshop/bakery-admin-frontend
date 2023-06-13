import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { createProduct, deleteProduct, updateProduct, getProduct } from '../../api/product.api';
import { getAvailableRecipes } from '../../api/recipe.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { ComponentNavigationHeader } from '../../components/ComponentNavigationHeader';

function ProductFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [recipes, setRecipes] = useState([])
    const [product, setProduct] = useState({})

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const res = await getProduct(params.id)
                setValue('name', res.data.name)
                setValue('description', res.data.description)
                setValue('recipe',res.data.recipe)
                setValue('quantityByRecipe',res.data.quantityByRecipe)
                setValue('isForSell',res.data.isForSell)
                setProduct(res.data)
            }
        }
        async function loadAvailableRecipes() {
            const res = await getAvailableRecipes()
            setRecipes(res.data)
        }
        loadAvailableRecipes()
        loadProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderRecipeOptions = () => {
        
        return recipes.map((option, index) => (
            <option key={option.id} value={option.id}>{option.title}</option>
        ));
    }

    const handleSave = handleSubmit(async data => {
        if (params.id) {
            await updateProduct(params.id, data)
            toast.success('Producto actualizada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createProduct(data);
            toast.success('Producto creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/products')
    })

    const handleDelete = (async () => {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            await deleteProduct(params.id)
            toast.success('Producto eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

            navigate('/products')
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
                {renderRecipeOptions()}
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
                <ComponentNavigationHeader listPath="/products" createPath="/products-create" title="Productos" />
            </div>

            <form action="" className='col-span-3'>
                {renderRecipe()}
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

export default ProductFormPage;