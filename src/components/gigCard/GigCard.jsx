import React from "react";
import { Link } from "react-router-dom";

import "./GigCard.scss";
const GigCard = ({ item }) => {
  const { userId: data } = item;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={data.img || "/img/noavatar.jpg"} alt="" />
            <span>{data.username}</span>
          </div>
          <p>{item.title}</p>
          <div className="star">
            {!isNaN(item.totalStars / item.starNumber) &&
              Array(Math.round(item.totalStars / item.starNumber))
                .fill()
                .map((item, i) => <img src="/img/star.png" alt="" key={i} />)}
            <span>
              {" "}
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="/img/heart.png" alt="" />
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
