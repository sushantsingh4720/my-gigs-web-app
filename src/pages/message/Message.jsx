import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axiosInstance";
import "./Message.scss";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`messages/${id}`).then((response) => response.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post(`messages/create`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  const onSendMessageHandler = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"}shubham{" >"}
        </span>
        <div className="messages">
          {isLoading
            ? "loading..."
            : error
            ? "something went wrong"
            : data.map((message) => (
                <div
                  className={
                    message.userId === currentUser._id ? "item owner" : "item"
                  }
                  key={message._id}
                >
                  <img
                    src={
                      message.userId === currentUser._id
                        ? currentUser.img
                        : "/img/user.png"
                    }
                    alt=""
                  />
                  <p>{message.desc}</p>
                </div>
              ))}
        </div>
        <hr />
        <form className="write" onSubmit={onSendMessageHandler}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
