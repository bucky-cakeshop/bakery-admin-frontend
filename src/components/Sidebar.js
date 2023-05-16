import Link from "./Link";

function Sidebar(){
    const links = [
        {label:'Example', path:"/example"},
        {label:'Unidades de medidas', path:"/measure-units"},
    ];

    const renderLinks = links.map((link) => {
        return <Link key={link.label} to={link.path} className="mb-3" activeClassName="font-bold border-l-4 border-blue-500 pl-2">{link.label}</Link>
    })

    return(
        /**overflow-y-scroll */
        /*overflow-auto scrollbar-hide */
        <div className="sticky top-0 overflow-auto scrollbar-hide flex flex-col items-start">
            {renderLinks}
        </div>
    )
};

export default Sidebar;