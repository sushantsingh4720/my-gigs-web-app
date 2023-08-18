import React, { useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { gigs } from "../../data";
const Gigs = () => {
  const [sortBy, setSortBy] = useState("sales");
  const [open, setOpen] = useState(false);
  const sortByHandler = (type) => {
    setSortBy(type);
    setOpen(!open);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">GIGS > GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Gig's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sortBy === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sortBy === "sales" ? (
                  <span onClick={() => sortByHandler("createdBy")}>Newest</span>
                ) : (
                  <span onClick={() => sortByHandler("sales")}>
                    Best Selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard item={gig} key={gig.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
