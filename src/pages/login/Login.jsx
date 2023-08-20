import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const onChangeHandler = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => JSON.stringify(response.data.info))
      .then((data) => {
        localStorage.setItem("currentUser", data);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          type="text"
          name="username"
          placeholder="example123"
          onChange={onChangeHandler}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChangeHandler}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
