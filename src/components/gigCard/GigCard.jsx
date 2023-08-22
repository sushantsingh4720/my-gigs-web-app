import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axiosInstance";
import "./GigCard.scss";
const GigCard = ({ item }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      axios.get(`user/${item.userId}`).then((response) => response.data.user),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading..."
          ) : isError ? (
            ""
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            {Array(Math.round(item.totalStars / item.starNumber))
              .fill()
              .map((item, i) => (
                <img src="/img/star.png" alt="" key={i} />
              ))}
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
