import Post from "../models/postModel.js";
import cloudinary from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "chebewebdev",
  api_key: "874474727642197",
  api_secret: "ce6ZpddoL5VUGYoSH7ObHZM3AJg",
});

export const createPost = async (req, res) => {
  //   console.log("post => ", req.body);
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content, image, postedBy: req.auth._id });
    post.save();
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json("Something went wrong!");
  }
};

export const uploadImage = async (req, res) => {
  // console.log(req.files);
  try {
    const image = await cloudinary.uploader.upload(req.files.image.path);
    // console.log(image);
    return res
      .status(200)
      .json({ url: image.secure_url, public_id: image.public_id });
  } catch (error) {
    console.log(error);
  }
};

export const postsByUser = async (req, res) => {
  // postedBy: req.auth._id
  try {
    const posts = await Post.find({})
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log('posts',posts)
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const postUpdate = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    // remove image from cloudinary
    if (post.image && post.image.public_id) {
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    return res.status(200).json({ post });
  } catch (error) {}
};

export const postDelete = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params._id);
  // remove image from cloudinary
  if (post.image && post.image.public_id) {
    const image = await cloudinary.uploader.destroy(post.image.public_id);
  }
  return res.status(200).json({ ok: "Deleted" });
};
