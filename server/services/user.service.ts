// get user by id

import userModel from "../models/user.model";
import { Response } from "express";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    return res.status(200).json({
      success: true,
      user,
    });
  }
};

// Get all users

export const getAllUsersService = async (res: Response) => {
  const courses = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};

// update user role

export const updateUserRoleService = async (
  id: string,
  role: string,
  res: Response
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(201).json({
    success: true,
    user,
  });
};
