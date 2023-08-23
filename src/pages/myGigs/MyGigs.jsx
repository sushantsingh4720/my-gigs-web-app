import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./MyGigs.scss";
import axios from "../../utils/axiosInstance";
import { AuthContext } from "../../store/AuthContext";
function MyGigs() {
  const { state } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      axios
        .get(`gig/allGigs?userId=${state.user._id}`)
        .then((response) => response.data.gigs),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`gig/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const deleteHandler = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>{state.user.isSeller ? "Gigs" : "Orders"}</h1>
            {state.user.isSeller && (
              <Link to="/add" className="link">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="image" src={gig.cover} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>
                    {gig.price}
                    <sup>99</sup>
                  </td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => deleteHandler(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
