import React, { useState, useEffect } from "react";
import userLogo from "/img/user.png";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActiveHandler = () => {
    window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActiveHandler);
    return () => {
      window.removeEventListener("scroll", isActiveHandler);
    };
  }, []);
  const currentUser = {
    id: 1,
    name: "sushant",
    isSeller: true,
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
          <span>Sign in</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={userLogo} alt="logo" />
              <span>{currentUser.name}</span>
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
                  <span>Logout</span>
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
