import { Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar";

function Layout () {
    return (
        <>
            <NavBar />
            <Outlet />
            <div>This is a watchtower-discord webhook test!</div>
        </>
    )
}

export default Layout;