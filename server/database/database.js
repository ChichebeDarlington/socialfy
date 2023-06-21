import mongoose from "mongoose";

const DBConnect = (URI) => {
  return mongoose.connect(URI);
};

export default DBConnect;
