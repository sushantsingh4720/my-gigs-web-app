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
      axios.get(`/api/conversations/all`).then((response) => response.data),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`/api/conversations/update/${id}`);
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
              {data.map((conversation) => (
                <tr
                  key={conversation.id}
                  className={
                    (state.user.isSeller && !conversation.readBySeller) ||
                    (!state.user.isSeller && !conversation.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>
                    {state.user.isSeller
                      ? conversation.buyerId.username
                      : conversation.sellerId.username}
                  </td>
                  <td>
                    <Link
                      to={`/message/${
                        conversation.sellerId._id + conversation.buyerId._id
                      }?username=${
                        state.user.isSeller
                          ? conversation.buyerId.username
                          : conversation.sellerId.username
                      }`}
                      className="link"
                    >
                      {conversation?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {(state.user.isSeller && !conversation.readBySeller) ||
                    (!state.user.isSeller && !conversation.readByBuyer) ? (
                      <button
                        onClick={() => markAsReadHandler(conversation.id)}
                      >
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
