import { useState} from "react";
import Dropdown from "../components/Dropdown";

function DropdownPage() {
    const [selection, setSelection] = useState(null);
    const handleSelect = (option) => {
        setSelection(option);
    };

    const options =[
        {label:'Red', value:'red'},
        {label:'Green', value:'green'},
        {label:'Blue', value:'blue'}
    ];

    /**
     * Si colocamos varios DD veremos que todos seleccionan el mismo valor al cambiarlo en uno. Esto se debe a que comparten el mismo estado.
     * Para solucionarlo, será necesario crear un estado para cada uno de ellos ?
     */
    return (
        <div className="flex">
            <Dropdown options={options} value={selection} onChange={handleSelect}/>
        </div>
    )
}

export default DropdownPage;