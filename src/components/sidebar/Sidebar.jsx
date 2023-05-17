import SidebarOption from "./SidebarOption";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Sidebar() {
    const[selectedOption, setSelectedOption] = useState('');
    const defaultOption = useLocation();

    const links = [
        { label: 'Example', path: "/example" },
        { label: 'Unidades de medidas', path: "/measure-units" },
        { label: 'Ingredientes', path: "/ingredients" },
    ];
    const handleOptionSelection = (to) => {
        setSelectedOption(to)
    }

    useEffect(() => {
        async function loadDefaultOption() {
            console.log(defaultOption.pathname)
            setSelectedOption(defaultOption.pathname);
            if (defaultOption.pathname === "/"){
                setSelectedOption("/example");
            }
            
        }
        loadDefaultOption();
    }, [])

    const renderLinks = links.map((link) => {
        return <SidebarOption
            key={link.label}
            to={link.path}
            className="mb-3"
            activeClassName="font-bold border-l-4 border-black pl-2"
            handleOptionSelection={handleOptionSelection}
            selected={selectedOption}
        >
            {link.label}
        </SidebarOption>
    })

    // className="sticky top-0 overflow-auto scrollbar-hide flex flex-col items-start"
    return (
        <div className="sticky top-0 overflow-auto scrollbar-hide flex flex-col items-start">
            {renderLinks}
        </div>
    )
};

export default Sidebar;