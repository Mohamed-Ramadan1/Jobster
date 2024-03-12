import Job from "./../models/JobModel.js";
import catchAsync from "./../utils/catchAsync.js";

export const getAllJobs = catchAsync(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: {
      jobs,
    },
  });
});

export const getJob = catchAsync(async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(200).json({
    status: "success",
    results: job.length,
    data: {
      job,
    },
  });
});

export const createJob = catchAsync(async (req, res) => {
  const newJob = await Job.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newJob,
    },
  });
});

export const updateJob = catchAsync(async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedJob,
    },
  });
});

export const deleteJob = catchAsync(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
