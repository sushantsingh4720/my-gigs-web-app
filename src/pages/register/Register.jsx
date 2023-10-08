import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import uploadFile from "../../utils/uploadFile";
const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

  const onChangeHandler = (e) => {
    setUser((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const isSellerHandle = (e) => {
    setUser((pre) => {
      return { ...pre, isSeller: e.target.checked };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const url = await uploadFile(file);
    await axios
      .post("/api/auth/register", { ...user, img: url })
      .then((response) => response.data)
      .then((data) => {
        console.log(data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="register">
      <form onSubmit={onSubmitHandler}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="exaple123"
            onChange={onChangeHandler}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="exaple123@gmail.com"
            onChange={onChangeHandler}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChangeHandler}
          />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            placeholder="IND"
            onChange={onChangeHandler}
          />
          <button type="submit">Submit</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={isSellerHandle} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="1234512345"
            required={user.isSeller}
            onChange={onChangeHandler}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={onChangeHandler}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
