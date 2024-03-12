import Job from "./../models/JobModel.js";
import catchAsync from "./../utils/catchAsync.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "./../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({
    status: "success",
    results: jobs.length,
    data: {
      jobs,
    },
  });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new NotFoundError(`No job with that id ${req.params.id}`);

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
};

export const createJob = async (req, res) => {
  const newJob = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      newJob,
    },
  });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateJob)
    throw new NotFoundError(`No job with that id ${req.params.id}`);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      updatedJob,
    },
  });
};

export const deleteJob = catchAsync(async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  if (!deletedJob)
    throw new NotFoundError(`No job with that id ${req.params.id}`);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: null,
  });
});
