import classNames from "classnames";
import { useNavigate } from 'react-router-dom'

function SidebarOption ({to, children, className, activeClassName, handleOptionSelection, selected}){
    const navigate = useNavigate();


    const classes = classNames(
        'text-black', 
        className,
        selected === to && activeClassName
    );

    const handleClick = (event) => {
        if(event.metaKey || event.ctrlKey) return;
        event.preventDefault();
        handleOptionSelection(to)
        navigate(to)
    }
    return <a className={classes} href={to} onClick={handleClick}>{children}</a>
}

export default SidebarOption