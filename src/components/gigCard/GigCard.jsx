import React from "react";
import { Link } from "react-router-dom";
import "./GigCard.scss";
const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/{item.id}`} className="link">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="star" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>Starting At</span>
            <h2>₹{item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
