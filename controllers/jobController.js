import Job from "./../models/JobModel.js";
import catchAsync from "./../utils/catchAsync.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "./../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

// export const getAllJobs = async (req, res) => {
//   const { search } = req.query;

//   console.log(search);
//   const queryObject = { createdBy: req.user.userId };

//   if (search) queryObject.position = req.query.search;
//   const jobs = await Job.find(queryObject);
//   res.status(StatusCodes.OK).json({ jobs });
// };
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
