import Sidebar from './components/Sidebar';
import Route from "./components/Route";
import ExamplePage from "./pages/ExamplePage";

function App() {
    return (
        <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
            <Sidebar/>
            <div className='col-span-5'>
                <Route path="/example"><ExamplePage/></Route>
            </div>
        </div>
    )
}

export default App;