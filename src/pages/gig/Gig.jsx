import React, { useContext } from "react";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import { Slider } from "infinite-react-carousel/lib";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import axios from "../../utils/axiosInstance";
import ReviewsCard from "../../components/reviewsCard/ReviewsCard";
function Gig() {
  const { state } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios.get(`/api/gig/SingleGig/${id}`).then((response) => response.data.gig),
  });
  let userData = {};
  if (!isLoading) userData = data.userId;

  return (
    <div className="gig">
      {isLoading ? (
        "loading.."
      ) : isError ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>

            <div className="user">
              <img
                className="pp"
                src={userData.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span>{userData.username}</span>
              {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
              )}
            </div>

            <Slider
              slidesToShow={1}
              arrowsScroll={1}
              // centerMode={true}
              className="slider"
            >
              {data.images.map((image) => (
                <img key={image} src={image} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>

            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={userData.img || "/img/noavatar.jpg"} alt="" />
                <div className="info">
                  <span>{userData.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}
                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{userData.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">
                      {new Date(userData.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{userData.desc}</p>
              </div>
            </div>

            <ReviewsCard gigId={data._id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.sortTitle}</h3>
              <h2>₹{data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber + "   Revisions"} </span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              disabled={state.user.isSeller}
              style={{
                backgroundColor: state.user.isSeller ? "#ccc" : "#1dbf73",
              }}
              onClick={() => navigate(`/payment/${id}`)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
