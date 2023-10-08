import React, { useContext } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { projects } from "../../data";
import axios from "../../utils/axiosInstance";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../store/AuthContext";
import Loader from "../../components/Loader/Loader";
const Home = () => {
  const { state } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["catGigs"],
    queryFn: () =>
      axios.get(`/api/gig/allGigs`).then((response) => response.data.gigs),
  });
  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <div className="home">
          <Featured />
          <TrustedBy />
          {isLoading ? (
            "Loading"
          ) : (
            <Slide slidesToShow={5} arrowsScroll={5}>
              {data.map((card) => (
                <CatCard item={card} key={card._id} />
              ))}
            </Slide>
          )}
          <div className="features">
            <div className="container">
              <div className="item">
                <h1>A whole world of freelance talent at your fingertips</h1>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing
                </p>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing
                </p>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing
                </p>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing
                </p>
              </div>
              <div className="item">
                <video src="/img/video.mp4" controls></video>
              </div>
            </div>
          </div>
          <div className="features dark">
            <div className="container">
              <div className="item">
                <h1>
                  Gigs <i>bussiness</i>
                </h1>
                <h1>A bussiness solution designed for teams</h1>
                <p>
                  Upgrade to a curated exprience packed with tools and benifits,
                  dedicated to bussiness
                </p>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <div className="title">
                  <img src="/img/check.png" alt="check" />
                  The best for every buget
                </div>
                <button>Explore Gigs Bussiness</button>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                  alt="image"
                ></img>
              </div>
            </div>
          </div>
          <Slide slidesToShow={4} arrowsScroll={4}>
            {projects.map((project) => (
              <ProjectCard item={project} key={project.id} />
            ))}
          </Slide>
        </div>
      )}
    </>
  );
};

export default Home;
