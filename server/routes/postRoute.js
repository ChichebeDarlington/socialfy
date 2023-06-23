import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import {
  verifyUser,
  canDeleteAndEditPost,
} from "../middlewares/authenticate.js";
// controllers
import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  postUpdate,
  postDelete,
} from "../controllers/postController.js";

router.post("/create-post", verifyUser, createPost);
router.post(
  "/image-upload",
  verifyUser,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.get("/user-posts", verifyUser, postsByUser);
router.get("/user-post/:_id", verifyUser, userPost);
router.patch("/post-update/:_id", verifyUser, postUpdate);
router.delete("/post-delete/:_id", verifyUser, postDelete);

export default router;
