import classNames from "classnames";
//import useNavigation from "../hooks/use-navigation";
import { useNavigate, useLocation  } from 'react-router-dom'

function Link ({to, children, className, activeClassName}){
    //const {navigate, currentPath} =  useNavigation();
    const navigate = useNavigate();
    const location = useLocation();

    const classes = classNames(
        'text-blue-500', 
        className,
        //currentPath === to && activeClassName
        location.pathname === to && activeClassName
    );

    const handleClick = (event) => {
        if(event.metaKey || event.ctrlKey) return;
        event.preventDefault();
        navigate(to)

    }
    return <a className={classes} href={to} onClick={handleClick}>{children}</a>
}

export default Link