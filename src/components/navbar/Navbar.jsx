import React, { useState, useEffect } from "react";

import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActiveHandler = () => {
    window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActiveHandler);
    return () => {
      window.removeEventListener("scroll", isActiveHandler);
    };
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const logoutHandler = async () => {
    await axios
      .post("auth/logout")
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("currentUser");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className={isActive || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">Gigs</span>
            <span className="dot">.</span>
          </Link>
        </div>
        <div className="links">
          <span>Gigs Bussiness</span>
          <span>Explore</span>
          <span>English</span>

          {!currentUser?.isSeller && <span>Become a Seller</span>}

          {!currentUser && (
            <>
              {" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
              {pathname !== "/register" && (
                <button onClick={() => navigate("/register")}>Join</button>
              )}
            </>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/user.png"} alt="logo" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <span onClick={logoutHandler}>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(isActive || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <span>Graphics & Design</span>
            <span>Video & Animation</span>
            <span>Writing Translation</span>
            <span>AI Servies</span>
            <span>Digital Marketing</span>
            <span>Music and Audio</span>
            <span>Programming & Tech</span>
            <span>Bussiness</span>
            <span>LifeStyle</span>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
