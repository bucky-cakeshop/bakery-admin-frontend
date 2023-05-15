import { useState } from "react";
import { GoChevronDown,GoChevronLeft} from 'react-icons/go';

function Accordion({items}){
    const [expandIndex, setExpandIndex] = useState(-1);

    const handleClick = (index) => {
        setExpandIndex((currentExpandedIndex)=>{
            if(currentExpandedIndex===index){
                return -1;
            }else{
                return index;
            }
        });

        
        
        /*El código siguiente se comentó para dejarlo de evidencia porque produce un pequeño y raro bug cuando se hacen varios clicks simultáneos. */
        // if(expandIndex === index){
        //     setExpandIndex(-1) //Collapse all
        // }else{
        //     setExpandIndex(index)
        // }
    };

    const renderItems = items.map((item, index)=>{
        const isExpanded = index===expandIndex;
        const icon = <span className="text-2xl">
            {isExpanded? <GoChevronDown/> :<GoChevronLeft/>}
        </span>
        return (
            <div key={item.id}>
                <div className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer" onClick={() => handleClick(index) } >
                    {item.label}
                    {icon}
                </div>
                {isExpanded && <div className="border-b p-5">{item.content}</div>}
            </div>
        )
    })
    return(
        <div className="border-x border-t rounded">
            {renderItems}
        </div>
    )
}

export default Accordion