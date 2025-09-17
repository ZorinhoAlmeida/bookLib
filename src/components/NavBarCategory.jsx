import { Link } from "react-router-dom"


function NavBarCategory() {
  return (
    <nav className="Navbar-category">
        <div className="satus-category">
            <Link to="/reading">Currently reading</Link>
            <Link to="/read">Completed</Link>
            <Link to="/dropped">Dropped</Link>
            <Link to="/plan_to_read">Plan to Read</Link>
        </div>


    </nav>
  );
}


export default NavBarCategory;