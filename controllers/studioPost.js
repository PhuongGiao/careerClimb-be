const { Op } = require("sequelize");
const { StudioPost } = require("../models");

const getAllStudioPost = async (req, res) => {
  //   const { name } = req.query;

  try {
    const listStation = await StudioPost.findAll();
    //   console.log(listStation)
    res.status(200).send(listStation);
    // if (name) {
    //   const listStation = await Station.findAll({
    //     where: {
    //       name: {
    //         [Op.like]: `%${name}%`,
    //       },
    //     },
    //   });
    //   res.status(200).send(listStation);
    // } else {
    //   const listStation = await Station.findAll();
    //   console.log(listStation)
    //   res.status(200).send(listStation);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getAllStudioPost,
};
