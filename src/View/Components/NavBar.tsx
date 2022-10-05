import NavBarItem from "./NavBarItem";

function NavBar(){
    return(
        <div className="text-center m-8">
            <NavBarItem linkTo="/custom-graphs" itemName="Custom Graphs" /> 
            <NavBarItem linkTo="/static-graphs" itemName="Static Graphs"/> 
        </div>
    )
}

export default NavBar;