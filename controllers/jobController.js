import Job from "./../models/JobModel.js";
import catchAsync from "./../utils/catchAsync.js";

export const getAllJobs = catchAsync(async (req, res) => {
  // const jobs = await Job.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

//Database connecting
//Create the other controllers
