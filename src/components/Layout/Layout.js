import {  Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
    return (
    <>
    <Header></Header>

       <main className="main-wrapper">
        <Outlet/>
       </main>
      {<Footer></Footer>}
    </>
    )
}

export default Layout;