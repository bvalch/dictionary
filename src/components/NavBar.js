import { Link } from "react-router-dom";
import "../styles/styles.css";

const NavBar = () => {
  return (
    <div className="navContainer">
      <nav className="nav">
        <Link to="/favs"> FAVOURITES </Link>
        <Link to="/search"> SEARCH </Link>
      </nav>
    </div>
  );
};
export default NavBar;
