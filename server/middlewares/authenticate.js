import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token authorization is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(_id);

    req.auth = await User.findOne({ _id });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized request" });
  }
};

export const canDeleteAndEditPost = async (req, res, next) => {
  // console.log("real_id", req.auth._id);
  try {
    const post = await Post.findById(req.params._id);
    // console.log("postedBy", post.postedBy);
    if (post.postedBy != req.auth._id) {
      return res.status(400).json("Unauthorized");
    } else {
      next();
    }
  } catch (error) {}
};
