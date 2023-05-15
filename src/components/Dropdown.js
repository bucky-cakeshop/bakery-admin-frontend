import { useState, useEffect, useRef } from "react";
import { GoChevronDown} from 'react-icons/go';
import Panel from "./Panel";

function Dropdown({options, value, onChange}){
    const [isOpen, setIsOpen] = useState(false)
    /**Creamos una referencia que usaremos más abajo */
    const divEl = useRef();

    /**
     * Todo esto es para quie el DD se cierre cuando hago click fuera de él.
     * useRef es para obtener una referencia al div de la instancia del DD correspondiente.
    */
    useEffect(()=>{
        const handler = (event) => {
            /*en caso del que divEl no contenga nada */
            if(!divEl.current) return; 

            /**
             * Si no es el target del click entonces lo cierro.
             * Es decir cuando se hace click fuera del comoponente
             */
            if(!divEl.current.contains(event.target)){
                setIsOpen(false)
            }
        };
        document.addEventListener('click', handler, true)

        /*
        * Retorno una funcion de cleanup para remover el handler al click
        */
        return () => {
            document.removeEventListener('click', handler)
        }

    }, []);

    const handleClick = ()=>{
        //setIsOpen(!isOpen);
        setIsOpen((currentIsOpen) => !currentIsOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);

        onChange(option);
    };

    const renderOptions = options.map ((option)=>{
        return <div className="hover:bg-sky-100 rounded cursor-pointer p-1" onClick={() => handleOptionClick(option)} key={option.value}>{option.label}</div>;
    });

    return(
        /*Utilizamos la referencia creada anteriormente para poder identificar el div del componente */
        <div ref={divEl} className="w-48 relative">
            {/**
             * If value es undefined or null the expression value?.label || 'Select...' will return the first truly value, in this case 'Select...'
             * If value has a value, for instance red, the expression value?.label || 'Select...' will return the first truly value 'Red'
             */}
            <Panel 
            className="flex justify-between items-center cursor-pointer" 
            onClick={handleClick}>
                {value?.label || 'Select...'}
                <GoChevronDown className="text-lg"/>
            </Panel>
            {isOpen && (
                <Panel className="absolute top-full">{renderOptions}</Panel>
            )}
            
            
        </div>
    )
}

export default Dropdown