import className from 'classnames'
import { twMerge } from 'tailwind-merge';

/**
 * children, es un nombre especial para identificar lo que está entr los tags
 * <Button>Click me !</Button> => children = "Click me !"
*/
function  Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...rest /* rest of props passed through the component */
}){
    let classes = className(rest.className, 'flex items-center px-3 py-1.5 border',{
        'border-blue-600 bg-blue-500 text-white': primary,
        'border-gray-900 bg-gray-800 text-white': secondary,
        'border-green-600 bg-green-500 text-white': success,
        'border-yellow-400 bg-yellow-300 text-white': warning,
        'border-red-600 bg-red-500 text-white': danger,
        'rounded-full': rounded,
        'bg-white': outline,
        'text-blue-600': outline && primary,
        'text-gray-900': outline && secondary,
        'text-green-600': outline && success,
        'text-yellow-400': outline && warning,
        'text-red-600': outline && danger,
    });
    classes = twMerge(classes);
    return <button {...rest} className={classes}>{children}</button>
}

Button.propTypes = {
    checkVariationValue: ({primary, secondary, success, warning, danger}) => {
        const count = Number(!!primary)
        + Number(!!secondary)
        + Number(!!success)
        + Number(!!warning)
        + Number(!!danger)

        if(count > 1) {
            return new Error('Only one of primary, secondary, success, warning, danger can be true')
        }

    },
};

export default Button