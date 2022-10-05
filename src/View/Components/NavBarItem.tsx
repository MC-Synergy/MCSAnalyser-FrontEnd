import { NavLink } from "react-router-dom";

interface Props {
    itemName: string
    linkTo: string
}

function NavBarItem({itemName, linkTo}: Props) {

    let itemStyles = 'relative text-2xl m-10 hover:underline'
    let activeItemStyles = itemStyles + ' underline'
    
    return (
        <>
        <div className = "inline">
            <NavLink
                to={linkTo} 
                className={({ isActive }) =>
                    isActive ? activeItemStyles : itemStyles
                }
            >
                {itemName}
            </NavLink>
        </div>
        </>
    )
}

export default NavBarItem;