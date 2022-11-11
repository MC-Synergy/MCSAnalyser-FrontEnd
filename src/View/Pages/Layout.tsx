import { Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar";

function Layout () {
    return (
        <>
            <NavBar />
            <Outlet />
            <div>This is a watchtower test!</div>
        </>
    )
}

export default Layout;