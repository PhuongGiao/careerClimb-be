const catchAsync = require("../middlewares/async");
const { Application, CV, Job, Employer } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");
const MailSevice = require("../utils/MailService");

exports.getApplicationByJob = catchAsync(async (req, res) => {
  const { jobId } = req.query;
  const data = await Application.findAll({ where: { jobId } });
  res.status(200).json({
    success: true,
    data,
  });
});

// exports.getApplicationByJob = catchAsync(async (req, res) => {
//   const { jobId } = req.query;
//   const data = await Application.findAll({ where: { jobId } });
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });

exports.updateApplicationStatus = catchAsync(async (req, res) => {
  const { status, description } = req.body;
  const { id } = req.params;
  if (!status) {
    await Application.update({ status: 2 }, { where: { id } });
  }
  res.status(200).json({
    success: true,
  });
});

exports.create = catchAsync(async (req, res) => {
  const { cvId, jobId, status, description } = req.body;
  // const cv = await CV.findOne({
  //   where: {
  //     id: cvId,
  //   },
  // });
  // const job = await Job.findOne({
  //   where: {
  //     id: jobId,
  //   },
  // });

  const check = await Application.findOne({
    where: {
      cvId,
      jobId,
    },
  });

  if (check) throw new ApiError(500, "Bạn đã ứng tuyển công việc này!");

  const data = await Application.create({
    cvId,
    jobId,
    status,
    description,
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.updateIntructor = catchAsync(async (req, res) => {
  const { intructorName, intructorPhone, intructorEmail, status } = req.body;
  const { id } = req.params;
  await Application.update(req.body, {
    where: {
      id: id,
    },
  });
  await Application.update(
    { status: 3 },
    {
      where: {
        id: id,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.updateRefuse = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await Application.update(
    { status: 4 },
    {
      where: {
        id: id,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.sendMailConfirm = catchAsync(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findOne({ where: { id }, raw: true });

  const cv = await CV.findOne({ where: { id: application.cvId }, raw: true });

  const job = await Job.findOne({
    where: { id: application.jobId },
    raw: true,
  });
  const employer = await Employer.findOne({
    where: { id: job.employer },
    raw: true,
  });

  const dataEmail = [
    {
      key: "[Họ và tên ứng viên]",
      value: cv.name,
    },
    {
      key: "[tên vị trí công việc]",
      value: job.name,
    },
    {
      key: "[tên công ty/ tổ chức]",
      value: employer.name,
    },
    {
      key: "[thông tin liên hệ]",
      value: `${application.intructorName} - ${application.intructorEmail} - ${application.intructorPhone}`,
    },
  ];
  await MailSevice.sendHTMLmail(1, cv.email, dataEmail);
  await Application.update(
    { status: 5 },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});
