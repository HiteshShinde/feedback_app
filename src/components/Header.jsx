import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to={"/"} className={"logo"}>
          <h1 className="logo">FeedBack App</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
