import React from "react";

import "./Orders.scss";
import axios from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`orders`).then((response) => response.data),
  });

  const onClickMessageHandler = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const response = await axios.get(`conversations/sigle/${id}`);
      const conversationId = response.data.conversation.id;
      navigate(`/message/${conversationId}`);
    } catch (error) {
      if (error.response.status === 404) {
        try {
          const createResponse = await axios.post(`conversations/create`, {
            sellerId,
            buyerId,
          });

          const newConversationId = createResponse.data.createdConversation.id;
          navigate(`/message/${newConversationId}`);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>

                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>

                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => onClickMessageHandler(order)}
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
};

export default Orders;
