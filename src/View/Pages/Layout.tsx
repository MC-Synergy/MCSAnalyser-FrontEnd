import { Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar";

function Layout () {
    return (
        <>
            <NavBar />
            <Outlet />
            <div>I Love github actions!</div>
        </>
    )
}

export default Layout;