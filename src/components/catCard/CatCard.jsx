import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";
const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?cat=${item.cat ? item.cat : ""}`} className="link">
      <div className="catCard">
        <img src={item.img} alt="" />
        <span className="description">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
