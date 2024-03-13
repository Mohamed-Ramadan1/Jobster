import { StatusCodes } from "http-status-codes";
import User from "./../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  res.status(StatusCodes.ACCEPTED).json({ user, msg: "user login success" });
};
