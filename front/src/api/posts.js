import axios from "./back.js";

export default {
  get() {
    return axios.get("/posts");
  },
  create(post) {
    console.log(post);
    return axios.post("/posts", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
