import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <>
      {/* add things like Navbar */}
      {/* <h1>home layout</h1> */}
      <Outlet />
    </>
  );
};

export default HomeLayout;
