import "./_header.scss";
import { NavLink, Link } from "react-router-dom";
import logo from "./img/logo.png";
import { useState } from "react";



function Header () {
    const [isActive, setActive] = useState(false);
    const toggleClass = () => setActive(!isActive);

    // Функція для відкриття модального вікна
  const openModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  // Функція для обробки подання форми
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const phone = formData.get("phone");

    console.log("Ім'я:", fname);
    console.log("Прізвище:", lname);
    console.log("Номер телефону:", phone);

    closeModal(); // Закриття модального вікна після подання форми
  };
    
    return (
    <header>
        <div className={isActive ? "wrapper container active" : "wrapper container"}>
            <Link className="logo" to="/"> <img src={logo} alt="logo"/></Link>
           <nav className={isActive ? "active" : ""}>
             <ul>
               <li><NavLink to="/"onClick={toggleClass}>Home</NavLink></li>
               <li><NavLink to="/movies" onClick={toggleClass}>Movies</NavLink></li>
               <li><NavLink to="/wishList" onClick={toggleClass}>WishList</NavLink></li>
               <li><NavLink to="/contacts" onClick={toggleClass}>Contacts</NavLink></li>
             </ul>
           </nav>
          <div className="btn">
            <button id="signInBtn" onClick={openModal}>Sign in</button>
          </div>
           <div
           onClick={toggleClass}
           className={isActive ? "burger active" : "burger"}
           >
            <span></span>
            <span></span>
            <span></span>
           </div>
           {/* Модальне вікно */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <form id="myForm" onSubmit={handleSubmit}>
            <label htmlFor="fname">Name:</label><br />
            <input type="text" id="fname" name="fname" /><br />
            <label htmlFor="lname">Last name:</label><br />
            <input type="text" id="lname" name="lname" /><br />
            <label htmlFor="phone">Phone name:</label><br />
            <input type="text" id="phone" name="phone" /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
        </div>
    </header>
    )
}
export default Header;
