import axios from "axios";
const uploadFile = async (file) => {
  const cloudinaryName = "dol4aj9y4";
  const upload_preset = "ufworjez";
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  return axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
      data
    )
    .then((res) => {
      const { url } = res.data;
      return Promise.resolve(url);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default uploadFile;
