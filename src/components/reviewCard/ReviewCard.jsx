import React from "react";
import "./ReviewCard.scss";

const ReviewCard = ({ review }) => {
  const { userId: userData } = review;

  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={userData.img || "/img/noavatar.jpg"} alt="" />
        <div className="info">
          <span>{userData.username}</span>
          <div className="country">
            <span>{userData.country}</span>
          </div>
        </div>
      </div>

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default ReviewCard;
