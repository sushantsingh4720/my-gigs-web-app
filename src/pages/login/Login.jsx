import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { AuthContext } from "../../store/AuthContext";
import Loader from "../../components/Loader/Loader";
const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
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
    dispatch({ type: "LOGIN_REQUEST" });
    e.preventDefault();
    await axios
      .post("auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.info });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAIL" });
        setError(error.response.data.message);
      });
  };
  useEffect(() => {
    if (state.isAuthenticated) navigate("/");
  }, [state.isAuthenticated]);

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Login;
