import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";

import axios from "../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
const Gigs = () => {
  const [sortBy, setSortBy] = useState("sales");
  const [open, setOpen] = useState(false);
  const { search } = useLocation();

  const minRef = useRef();
  const maxRef = useRef();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      axios
        .get(
          `gig/allGigs${search}${minRef?.current?.value ? "&min=" : ""}${
            minRef?.current?.value ? minRef.current.value : ""
          }${maxRef?.current?.value ? "&max=" : ""}${
            maxRef?.current?.value ? maxRef.current.value : ""
          }&sortBy=${sortBy}`
        )
        .then((response) => response.data.gigs),
  });

  const sortByHandler = (type) => {
    setSortBy(type);
    setOpen(!open);
  };
  const minMaxHandler = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sortBy]);

  return (
    <div className="gigs">
      <div className="container">
        {isLoading ? (
          "loading..."
        ) : isError ? (
          "Something Went Wrong"
        ) : (
          <>
            <span className="breadcrumbs">GIGS {">"} GRAPHICS & DESIGN</span>
            <h1>AI Artists</h1>
            <p>
              Explore the boundaries of art and technology with {"Gig's"} AI
              artists
            </p>
            <div className="menu">
              <div className="left">
                <span>Budged</span>
                <input ref={minRef} type="number" placeholder="min" />
                <input ref={maxRef} type="number" placeholder="max" />
                <button onClick={minMaxHandler}>Apply</button>
              </div>
              <div className="right">
                <span className="sortBy">Sort By</span>
                <span className="sortType">
                  {sortBy === "sales" ? "Best Selling" : "Newest"}
                </span>
                <img
                  src="./img/down.png"
                  alt=""
                  onClick={() => setOpen(!open)}
                />
                {open && (
                  <div className="rightMenu">
                    {sortBy === "sales" ? (
                      <span onClick={() => sortByHandler("createdAt")}>
                        Newest
                      </span>
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
              {data.map((gig) => (
                <GigCard item={gig} key={gig._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gigs;
