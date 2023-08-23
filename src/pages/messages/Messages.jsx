import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { AuthContext } from "../../store/AuthContext";
import axios from "../../utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
const Messages = () => {
  const { state } = useContext(AuthContext);
  const queryClient = useQueryClient();

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
                <th>{state.user.isSeller ? "Buyer" : "Seller"}</th>
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
                    (state.user.isSeller && !message.readBySeller) ||
                    (!state.user.isSeller && !message.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>
                    {state.user.isSeller ? message.buyerId : message.sellerId}
                  </td>
                  <td>
                    <Link to={`/message/${message.id}`} className="link">
                      {message?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(message.updatedAt).fromNow()}</td>
                  <td>
                    {(state.user.isSeller && !message.readBySeller) ||
                    (!state.user.isSeller && !message.readByBuyer) ? (
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
