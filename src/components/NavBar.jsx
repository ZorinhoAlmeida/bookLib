
import { Link } from "react-router-dom"
import  '../css/NavBar.css'


function NavBar() {
return(
    <nav className="navbar">
        <div className="navbar-brand">
            
        <Link to="/" className="link-1">App de Livros</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="link-2">Home</Link>
            <Link to="/collection" className="link-3">Coleção</Link>
        </div>

        
        
        
    </nav>
)
    
}

export default NavBar;