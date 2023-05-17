import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import ExamplePage from "./pages/ExamplePage";
import MeasureUnitPage from './pages/MeasureUnitPage';
import MeasureUnitFormPage from './pages/MeasureUnitFormPage';
import IngredientPage from './pages/IngredientPage';
import IngredientFormPage from './pages/IngredientFormPage';

import { Toaster } from 'react-hot-toast'

//grid grid-cols-2 gap-4 mt-4
// bg-red-100
// bg-blue-100
function App() {
    return (
        <BrowserRouter>
            <div className="container h-full flex">
                <div className='w-[312px] h-[1000px] bg-gray-100 flex-none ml-2 mt-2 px-2 rounded-lg'>
                    <Sidebar />
                </div>
                <div className='w-full mx-auto ml-2 mt-2 bg-gray-100 px-2 rounded-lg'>
                    <Routes>
                        <Route path='/' element={<Navigate to={"/example"} />} />
                        <Route path='/example' element={<ExamplePage />} />
                        <Route path='/measure-units' element={<MeasureUnitPage />} />
                        <Route path='/measure-units-create' element={<MeasureUnitFormPage />} />
                        <Route path='/measure-units/:id' element={<MeasureUnitFormPage />} />
                        <Route path='/ingredients' element={<IngredientPage />} />
                        <Route path='/ingredients-create' element={<IngredientFormPage />} />
                        <Route path='/ingredients/:id' element={<IngredientFormPage />} />

                    </Routes>
                    <Toaster />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;