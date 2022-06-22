const { Op } = require("sequelize");
const { BookingUser } = require("../models");

const createBookingUser = async (req, res) => {
  const {
    TenantId,
    Email,
    Username,
    Phone,
    HashPassword,
    Salt,
    Fullname,
    CreatedDate,
    UpdatedDate,
    Status,
    UpdatedBy,
    Image,
    FacebookId,
    GoogleEmail,
    FacebookToken,
    FacebookFirstname,
    FacebookLastname,
    FacebookEmail,
    FacebookPicture,
    GoogleName,
    GooglePicture,
    UserTypeId,
    CreationTime,
    CreatorUserId,
    LastModificationTime,
    LastModifierUserId,
    IsDeleted,
    DeleterUserId,
    DeletionTime,
    AppleEmail,
    AppleFamilyName,
    AppleGivenName,
    AppleUserIdentifier,
  } = req.body;
  console.log(req.body);
  try {
    const newStation = await BookingUser.create({
      TenantId,
      Email,
      Username,
      Phone,
      HashPassword,
      Salt,
      Fullname,
      CreatedDate,
      UpdatedDate,
      Status,
      UpdatedBy,
      Image,
      FacebookId,
      GoogleEmail,
      FacebookToken,
      FacebookFirstname,
      FacebookLastname,
      FacebookEmail,
      FacebookPicture,
      GoogleName,
      GooglePicture,
      UserTypeId,
      CreationTime,
      CreatorUserId,
      LastModificationTime,
      LastModifierUserId,
      IsDeleted,
      DeleterUserId,
      DeletionTime,
      AppleEmail,
      AppleFamilyName,
      AppleGivenName,
      AppleUserIdentifier,
    });
    console.log(newStation);
    res.status(201).send(newStation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAllBookingUser = async (req, res) => {
  //   const { name } = req.query;

  try {
    const listStation = await BookingUser.findAll();
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

const updateBookingUser = async (req, res) => {
  const {id }=req.params
  console.log(id)
  try {
    const {
      Email,
      Username,
      Phone,
      Fullname,
      CreatedDate,
      UpdatedDate,
      Status,
      Image,
      GoogleEmail,
      FacebookEmail,
      GoogleName,
    } = req.body;
    await BookingUser.update(
      {
        Email,
        Username,
        Phone,
        Fullname,
        CreatedDate,
        UpdatedDate,
        Status,
        Image,
        GoogleEmail,
        FacebookEmail,
        GoogleName,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).send(`Id=${id} update success!`);
  } catch (error) {
    console.log(error)
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
  createBookingUser,
  getAllBookingUser,
  getDetailStation,
  updateBookingUser,
  deleteStation,
};
