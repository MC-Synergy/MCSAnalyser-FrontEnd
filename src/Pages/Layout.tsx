import { Outlet } from "react-router-dom";

function Layout () {
    return (
        <>
            <div>Layout</div>
            <Outlet />
        </>
    )
}

export default Layout;