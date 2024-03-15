import Job from "./../models/JobModel.js";
import catchAsync from "./../utils/catchAsync.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "./../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId });
  // const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

export const deleteJob = catchAsync(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: null,
  });
});
