import express, { Request, Response } from "express";
import User, { IUser, TUser } from "../model/user";
import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcryptjs";
import Password from "../model/password";

export const passRoute = express.Router();

passRoute.get("/all", async (req: Request, res: Response) => {
  console.log("req.query.user ", req.query.user);
  const user = req.query.user;
  const passwords = await Password.find({ username: user as string });
  console.log("password", passwords);
  return res.send({ passwords }).status(HttpStatusCodes.OK);
});

passRoute.post("/create", async (req: Request, res: Response) => {
  const { title, hint, password, username } = req.body;
  const newPassword = new Password({ title, hint, password, username });
  await newPassword.save();
  return res.status(HttpStatusCodes.CREATED).send({ newPassword });
});

passRoute.post("/delete", async (req: Request, res: Response) => {
  const { id } = req.body;
  await Password.findByIdAndDelete({ id })
    .then(() => {
      return res.status(HttpStatusCodes.OK).send({ msg: "deleted" });
    })
    .catch(() => {
      return res.status(HttpStatusCodes.NOT_FOUND).send({ msg: "deleted" });
    });
});

// passRoute.post("/create", async (req: Request, res: Response) => {
//   const { title, hint, password, username } = req.body;
//   const newPassword = new Password({ title, hint, password, username });
//   await newPassword.save();
//   return res.status(HttpStatusCodes.CREATED).send({ newPassword });
// });
