import express, { Request, Response } from "express";
import User, { IUser, TUser } from "../model/user";
import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcryptjs";

export const authRoute = express.Router();

authRoute.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let isUsername = await User.findOne({ username });
  if (!isUsername) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [
        {
          msg: "User does not exists",
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, isUsername.password);
  if (!isMatch) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  res.send({ msg: "Logged", user: isUsername }).status(HttpStatusCodes.OK);
});

authRoute.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ username });
  if (user) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [
        {
          msg: "User already exists",
        },
      ],
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  // Build user object based on TUser
  const userFields: TUser = {
    email,
    password: hashed,
    username,
  };

  user = new User(userFields);

  await user.save();
  res.send({ msg: "Registered", user: user }).status(HttpStatusCodes.CREATED);
});
