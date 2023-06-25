import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../bcrypt/bcrypt.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  // validation
  if (!name) return res.status(400).json("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .json("Password is required and should be 6 characters long");
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json("Your are already a member!");
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(),
  });
  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).json("Error. Try again.");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
  // console.log(req.ath);
  try {
    const user = await User.findById(req.auth.userId);
    // res.json(user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const forgottenPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;
  // validation
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: "New password is required and should be min 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  let user = await User.findOne({ email, secret });
  // console.log("EXIST ----->", user);
  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }
  // return res.status(400).send("We cant verify you with those details");

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats. Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
};

export const profileUpdate = async (req, res) => {
  const { username, name, about, password, secret } = req.body;
  console.log(req.body);
  try {
    const data = {};

    if (username) {
      data.username = username;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      if (password.length < 7) {
        return res
          .status(400)
          .json({ error: "Password should be longer than 6 characters" });
      } else {
        data.password = await hashPassword(password);
      }
    }
    if (secret) {
      data.secret = secret;
    }
    if (about) {
      data.about = about;
    }
    let user = await User.findByIdAndUpdate(req.auth._id, data, { new: true });
    user.password = undefined;
    username.secret = undefined;
    return res.status(201).json({ data, ok: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate username" });
    }
  }
};
