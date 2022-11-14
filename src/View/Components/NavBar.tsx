import NavBarItem from "./NavBarItem";
import MCSAnalyserLogo from "../images/MCSAnalyserLogo.svg" 

function NavBar(){
    return(
        <div id="navBar" className="text-center overflow-hidden" >
            <div className="w-1/5 float-left logo">
                <a href="https://portal.naamdorpboot.xyz"><img src={MCSAnalyserLogo} alt="MCSynergy Logo" className="w-52 h-auto"/></a>
            </div>
            <div id="navBarCenter" className ="w-3/5 float-left navbar-center">
                <NavBarItem linkTo="/custom-graphs" itemName="Custom" /> 
                <NavBarItem linkTo="/production-graphs" itemName="Production"/>
                <NavBarItem linkTo="/storage-graphs" itemName="Storage" />
            </div>
            <div id="navBarRight" className="w-1/5 float-left navbar-right">
                <a href="https://github.com/MC-Synergy/MCSAnalyser-FrontEnd#readme" className="text-2xl hover:underline" target="_blank" rel="noreferrer">About</a>
            </div>
        </div>
    )
}

export default NavBar;