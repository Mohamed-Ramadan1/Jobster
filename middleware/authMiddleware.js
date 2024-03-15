import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }
  const { userId, role } = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  if (!(await UserModel.findById(userId))) {
    throw new UnauthenticatedError("authentication invalid");
  }

  req.user = { userId, role };
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
