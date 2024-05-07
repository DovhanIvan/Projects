import page404 from "./img/404.png"
import { Link } from "react-router-dom";
import "./404.scss"

function PageNotFound () {
    return (
        <div className="page-404 container">
            <img src={page404} alt='404'/>
            <h2>404</h2>
            <h3>Sorry page not found</h3>
            <Link to={'/'}>Back to Home</Link>
        </div>
    )
}

export default PageNotFound;