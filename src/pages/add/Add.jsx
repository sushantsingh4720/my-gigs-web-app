import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import uploadFile from "../../utils/uploadFile";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axiosInstance";
const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [uploading, setUploading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [imageFiles, setImages] = useState([]);
  console.log(state);

  const onChangeHandler = (e) => {
    dispatch({
      type: "ADD_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const featureHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
    e.target[0].value = "";
  };
  const imageHandler = async () => {
    setUploading(true);
    try {
      const cover = await uploadFile(coverImage);

      const images = await Promise.all(
        [...imageFiles].map(async (file) => {
          const url = await uploadFile(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      setUploading(true);
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return axios.post("gig/create", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myGigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              name="title"
              onChange={onChangeHandler}
            />
            <label htmlFor="">Category</label>
            <select id="cats" name="cat" onChange={onChangeHandler}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>
              <button onClick={imageHandler}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              name="desc"
              onChange={onChangeHandler}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="shortTitle"
              onChange={onChangeHandler}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              name="shortDesc"
              onChange={onChangeHandler}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              onChange={onChangeHandler}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={onChangeHandler}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={featureHandler}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURES", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={onChangeHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
