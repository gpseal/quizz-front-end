import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
    return (
      <>
      <Link to={"/"}>Home</Link>
      <Link to={"/create"}>Create</Link>
        <Outlet />
      </>
    );
}

export default Layout;