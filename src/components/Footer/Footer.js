import "./footer.scss"
import { NavLink, Link } from "react-router-dom";
import logo from "./img/logo.png";



function Footer () {
    return (
    <div className="footer">
        <div className="wrapper container">
            <Link className="logo" to="/"></Link>
             <img src={logo} alt="logo"/>
           <nav>
             <ul>
               <li><NavLink to="/">Home</NavLink></li>
               <li><NavLink to="/movies">Movies</NavLink></li>
               <li><NavLink to="/wishList">WishList</NavLink></li>
               <li><NavLink to="/contacts">Contacts</NavLink></li>
             </ul>
           </nav>
           <form className="form-footer">
           <input type="text" 
           placeholder="Find Favorite Movie" />
           </form>
           </div>
    </div>
    )
}
export default Footer;