import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import axios from "../../utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, error, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios.get(`conversations/all`).then((response) => response.data),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`conversations/update/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const markAsReadHandler = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((message) => (
                <tr
                  key={message.id}
                  className={
                    (currentUser.isSeller && !message.readBySeller) ||
                    (!currentUser.isSeller && !message.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>
                    {currentUser.isSeller ? message.buyerId : message.sellerId}
                  </td>
                  <td>
                    <Link to={`/message/${message.id}`} className="link">
                      {message?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(message.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !message.readBySeller) ||
                    (!currentUser.isSeller && !message.readByBuyer) ? (
                      <button onClick={() => markAsReadHandler(message.id)}>
                        Mark as Read
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
