import React, { useState } from "react";

import "./Featured.scss";
import { useNavigate } from "react-router-dom";
const Featured = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchHandler = async () => {
    navigate(`gigs?search=${search}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> servies for your bussiness
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='try "building web app"'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={searchHandler}>Serch</button>
          </div>
          <div className="popular">
            <span>popular:</span>
            <button>Web Design</button>
            <button>Word Press</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/hero-image.png" alt="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
