import SidebarOption from "./SidebarOption";
import { useState } from "react";

function Sidebar() {
    const[selectedOption, setSelectedOption] = useState('');

    const links = [
        { label: 'Example', path: "/example" },
        { label: 'Unidades de medidas', path: "/measure-units" },
    ];
    const handleOptionSelection = (to) => {
        setSelectedOption(to)
    }

    const renderLinks = links.map((link) => {
        return <SidebarOption
            key={link.label}
            to={link.path}
            className="mb-3"
            activeClassName="font-bold border-l-4 border-blue-500 pl-2"
            handleOptionSelection={handleOptionSelection}
            selected={selectedOption}
        >
            {link.label}
        </SidebarOption>
    })


    return (
        <div className="sticky top-0 overflow-auto scrollbar-hide flex flex-col items-start">
            {renderLinks}
        </div>
    )
};

export default Sidebar;