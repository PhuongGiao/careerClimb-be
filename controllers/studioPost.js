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

const getDetailStation = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await Station.findAll({
      where: {
        id,
      },
    });
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, province } = req.body;
    const stationUpdate = await Station.findOne({
      where: {
        id,
      },
    });
    stationUpdate.name = name;
    stationUpdate.address = address;
    stationUpdate.province = province;
    await stationUpdate.save();
    res.status(200).send(stationUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    await Station.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Delete Success!");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createStudioPost,
  getAllStudioPost,
  getDetailStation,
  updateStation,
  deleteStation,
};
