import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
//import Route from "./components/Route";
import { Navigation } from './components/measure-unit/MeasureUnitNavigation';
import ExamplePage from "./pages/ExamplePage";
import MeasureUnitPage from './pages/MeasureUnitPage';
import MeasureUnitFormPage from './pages/MeasureUnitFormPage';

function App() {
    return (
        <BrowserRouter>
        {/*  mt-4 */}
        
        <div className="container mx-auto grid grid-cols-2 gap-4">
            <Sidebar/>
            <div className='col-span-2'>
                <Navigation />
            </div>
            <div>
            <Routes>
                <Route path='/' element={<Navigate to={"/example"} />} />
                <Route path='/example' element={<ExamplePage />} />
                <Route path='/measure-units' element={<MeasureUnitPage />} />
                <Route path='/measure-units-create' element={<MeasureUnitFormPage />} />
                <Route path='/measure-units/:id' element={<MeasureUnitFormPage />} />
            </Routes>
            </div>
            {/* <div className='col-span-5'>
                <Route path="/example"><ExamplePage/></Route>
                <Route path="/measure-units"><MeasureUnitPage/></Route>
                <Route path="/measure-units/:id"><MeasureUnitFormPage /></Route>
            </div> */}
        </div>
        </BrowserRouter>
    )
}

export default App;