import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import ExamplePage from "./pages/ExamplePage";
import MeasureUnitPage from './pages/MeasureUnitPage';
import MeasureUnitFormPage from './pages/MeasureUnitFormPage';
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <BrowserRouter>
        <div className="container mx-auto grid grid-cols-2 gap-4 mt-4">
            <Sidebar/>
            <div>
            <Routes>
                <Route path='/' element={<Navigate to={"/example"} />} />
                <Route path='/example' element={<ExamplePage />} />
                <Route path='/measure-units' element={<MeasureUnitPage />} />
                <Route path='/measure-units-create' element={<MeasureUnitFormPage />} />
                <Route path='/measure-units/:id' element={<MeasureUnitFormPage />} />
            </Routes>
            <Toaster />
            </div>
        </div>
        </BrowserRouter>
    )
}

export default App;