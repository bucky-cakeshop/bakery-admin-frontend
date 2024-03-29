import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import ExamplePage from "./pages/ExamplePage";
import MeasureUnitPage from './pages/MeasureUnitPage';
import MeasureUnitFormPage from './pages/MeasureUnitFormPage';
import MakePage from './pages/MakePage';
import MakeFormPage from './pages/MakeFormPage';
import IngredientPage from './pages/IngredientPage';
import IngredientFormPage from './pages/IngredientFormPage';
import FixedCostPage from './pages/FixedCostPage';
import FixedCostFormPage from './pages/FixedCostFormPage';
import RecipePage from './pages/recipe/RecipePage';
import RecipeFormPage from './pages/recipe/RecipeFormPage';
import SupplierPage from './pages/SupplierPage';
import SupplierFormPage from './pages/SupplierFormPage';
import SupplierInvoicePage from './pages/SupplierInvoicePage';
import SupplierInvoiceFormPage from './pages/SupplierInvoiceFormPage';
import ProductionOrderPage from './pages/ProductionOrderPage';
import ProductionOrderFormPage from './pages/ProductionOrderFormPage';
import ProductPage from './pages/product/ProductPage';
import ProductFormPage from './pages/product/ProductFormPage';
import ProductStockPage from './pages/product-stock/ProductStockPage';
import ProductStockFormPage from './pages/product-stock/ProductStockFormPage';


import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <BrowserRouter>           
            <div className="container h-full flex">
                
                <div className='w-[200px] h-[1000px] bg-gray-100 flex-none ml-2 mt-2 px-2 rounded-lg'>
                    <Sidebar />
                </div>
                <div className='w-full mx-auto ml-2 mt-2 bg-gray-100 px-2 rounded-lg'>
                    <Routes>
                        <Route path='/' element={<Navigate to={"/example"} />} />
                        <Route path='/example' element={<ExamplePage />} />

                        <Route path='/fixed-costs' element={<FixedCostPage />} />
                        <Route path='/fixed-costs-create' element={<FixedCostFormPage />} />
                        <Route path='/fixed-costs/:id' element={<FixedCostFormPage />} />

                        <Route path='/measure-units' element={<MeasureUnitPage />} />
                        <Route path='/measure-units-create' element={<MeasureUnitFormPage />} />
                        <Route path='/measure-units/:id' element={<MeasureUnitFormPage />} />

                        <Route path='/makes' element={<MakePage />} />
                        <Route path='/makes-create' element={<MakeFormPage />} />
                        <Route path='/makes/:id' element={<MakeFormPage />} />

                        <Route path='/ingredients' element={<IngredientPage />} />
                        <Route path='/ingredients-create' element={<IngredientFormPage />} />
                        <Route path='/ingredients/:id' element={<IngredientFormPage />} />

                        <Route path='/suppliers' element={<SupplierPage />} />
                        <Route path='/suppliers-create' element={<SupplierFormPage />} />
                        <Route path='/suppliers/:id' element={<SupplierFormPage />} />

                        <Route path='/recipes' element={<RecipePage />} />
                        <Route path='/recipes-create' element={<RecipeFormPage />} />
                        <Route path='/recipes/:id' element={<RecipeFormPage />} />

                        <Route path='/supplier-invoice' element={<SupplierInvoicePage />} />
                        <Route path='/supplier-invoice-create' element={<SupplierInvoiceFormPage />} />
                        <Route path='/supplier-invoice/:id' element={<SupplierInvoiceFormPage />} />

                        <Route path='/production-orders' element={<ProductionOrderPage />} />
                        <Route path='/production-orders-create' element={<ProductionOrderFormPage />} />
                        <Route path='/production-orders/:id' element={<ProductionOrderFormPage />} />

                        <Route path='/products' element={<ProductPage />} />
                        <Route path='/products-create' element={<ProductFormPage />} />
                        <Route path='/products/:id' element={<ProductFormPage />} />

                        <Route path='/product-stocks' element={<ProductStockPage />} />
                        <Route path='/product-stocks-create' element={<ProductStockFormPage />} />
                        <Route path='/product-stocks/:id' element={<ProductStockFormPage />} />

                    </Routes>
                    <Toaster />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;