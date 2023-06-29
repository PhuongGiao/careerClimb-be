const catchAsync = require("../middlewares/async");
const {
  Job,
  Level,
  Salary,
  Experience,
  Location,
  Category,
  CV,
  Employer,
  User,
  Application,
} = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const { searchText, level, experience, category, salary, location } =
    req.query;
  let where = {};
  if (searchText) {
    where["name"] = {
      [Op.like]: `%${searchText}%`,
    };
  }
  if (level) {
    where["level"] = level;
  }
  if (experience) {
    where["experience"] = experience;
  }
  if (category) {
    where["category"] = category;
  }
  if (salary) {
    where["salary"] = salary;
  }
  if (location) {
    where["location"] = location;
  }

  const data = await Job.findAll({
    where,
    include: [
      { model: Level },
      { model: Category },
      { model: Salary },
      { model: Experience },
      { model: Location },
      { model: User, include: { model: Employer, as: "employerDetail" } },
    ],
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getJobByEmployer = catchAsync(async (req, res) => {
  let userId = req.user.id;
  const data = await Job.findAll({
    where: {
      employer: userId,
    },
    include: [
      { model: Level },
      { model: Category },
      { model: Salary },
      { model: Experience },
      { model: Location },
      { model: User, include: { model: Employer, as: "employerDetail" } },
    ],
  });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getJobByEmployerPage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Job.findAll({
    where: {
      employer: id,
    },
    include: [
      { model: Level },
      { model: Category },
      { model: Salary },
      { model: Experience },
      { model: Location },
      { model: User, include: { model: Employer, as: "employerDetail" } },
    ],
  });
  console.log(data);
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Job.findByPk(id, {
    include: [
      { model: Level },
      { model: Category },
      { model: Salary },
      { model: Experience },
      { model: Location },
      { model: User, include: { model: Employer, as: "employerDetail" } },
    ],
  });
  if (!data) {
    throw new ApiError(404, "Job not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    category,
    level,
    salary,
    experience,
    requirement,
    benefits,
    description,
    location,
  } = req.body;
  if (!name) {
    throw new ApiError(500, "Job name is required!");
  }
  const check = await Job.findOne({
    where: {
      [Op.or]: [{ name }],
    },
  });
  if (check) throw new ApiError(500, "Job is duplicated!");
  const job = await Job.create({
    name,
    category,
    level,
    salary,
    experience,
    requirement,
    benefits,
    description,
    location,
    employer: userId,
  });

  await job.addLocation(location);

  res.status(200).json({
    success: true,
    job,
  });
});

exports.getJobOption = catchAsync(async (req, res) => {
  const levels = await Level.findAll();
  const salaries = await Salary.findAll();
  const experiences = await Experience.findAll();
  const locations = await Location.findAll();
  const categories = await Category.findAll();
  res.status(200).json({
    levels,
    salaries,
    experiences,
    locations,
    categories,
  });
});

exports.updateJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  let userId = req.user.id;
  await Job.update(req.body, {
    where: {
      id: id,
      employer: userId,
    },
  });
  res.status(200).json({
    success: true,
  });
});
exports.getCvByJob = catchAsync(async (req, res) => {
  // const { id } = req.params;
  let userId = req.user.id;
  console.log(userId);
  const data = await Job.findAll({
    where: {
      employer: userId,
    },
    include: [
      { model: Application, include: { model: CV } },
      { model: Level },
      { model: Category },
      { model: Salary },
      { model: Experience },
      { model: Location },
      { model: User },
    ],
  });

  res.status(200).json({
    success: true,
    data,
  });
});
exports.history = catchAsync(async (req, res) => {
  let userId = req.user.id;

  const data = await Job.findAll({
    include: [{ model: CV, model: Employer }],
  });

  res.status(200).json({
    success: true,
    data,
  });
});

// exports.updateCvByJob = catchAsync(async (req, res) => {
//   let userId = req.user.id;
//   // const { id } = req.params;
//   await Job.update(req.body, {
//     where: {
//       status:2
//     },
//   });
//   res.status(200).json({
//     success: true,
//   });
// });
