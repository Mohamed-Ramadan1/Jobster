import { Link, Outlet } from "react-router-dom";

import MainHeader from "./MainHeader";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Your Places</Link>
      </h1>
      <nav>...Nav</nav>
      <Outlet /> {/* Outlet for content to render here */}
    </MainHeader>
  );
};

export default MainNavigation;

//why the mainNavigation is not appear on the header as children?
