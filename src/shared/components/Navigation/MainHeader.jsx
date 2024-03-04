import "./MainHeader.css";

const MainHeader = (props) => {
  console.log(props.children);
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
