import { Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar";

function Layout () {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Layout;