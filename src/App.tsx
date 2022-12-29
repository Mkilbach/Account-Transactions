import React from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import Main from "./Main";
import { ToastContainer } from "react-toastify";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <NavBar />
            <Main />
            <Footer />
            <ToastContainer theme="dark" />
        </>
    );
};

export default App;
