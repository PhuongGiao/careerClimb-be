const { Conversation } = require("../models");
const { Message } = require("../models");
const { BookingUser } = require("../models");
const { RegisterPartner } = require("../models");

const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");

const catchAsync = require("../middlewares/async");

exports.createConversation = catchAsync(async (req, res) => {
  const { withPartner, Chatter } = req.body;
  if (!withPartner || !Chatter) {
    throw new ApiError(500, "withPartner && Chatter is required");
  }
  const data = await Conversation.create({ withPartner, Chatter });
  res.status(200).send(data);
});

exports.getAllConversation = catchAsync(async (req, res) => {
  const { option, page, limit } = req.query;
  let withPartner;
  if (option == 0) {
    withPartner = true;
  } else if (option == 1) {
    withPartner = false;
  } else {
    throw new ApiError(500, "wrong option format (0 or 1)");
  }
  const data = await Pagination(Conversation, page, limit, {
    where: {
      withPartner,
    },
  });
  res.status(200).send(data);
});

exports.createMessage = catchAsync(async (req, res) => {
  const { ConversationId, Content, Admin } = req.body;
  let PartnerId, CustomerId;
  const conversation = await Conversation.findByPk(ConversationId);
  if (!conversation) {
    throw new ApiError(500, "conversation does not exist");
  }
  if (Admin === "" || Admin === null || Admin === undefined) {
    throw new ApiError(500, "field admin is required");
  }
  if (Admin) {
    PartnerId = -1;
    CustomerId = -1;
  } else if (conversation.dataValues.withPartner) {
    PartnerId = conversation.dataValues.Chatter;
    CustomerId = -1;
  } else {
    CustomerId = conversation.dataValues.Chatter;
    PartnerId = -1;
  }
  const data = await Message.create({
    ConversationId,
    Content,
    PartnerId,
    CustomerId,
  });
  res.status(200).send(data);
});

exports.getMessageByConversationId = catchAsync(async (req, res) => {
  const { page, limit, ConversationId } = req.query;

  const messages = await Pagination(Message, page, limit, {
    order: [["updatedAt", "DESC"]],
    where: {
      ConversationId,
    },
  });
  const newData = {
    ...messages,
    data: await Promise.all(
      messages.data.map(async (val) => {
        let Chatting;
        if (val.dataValues.CustomerId !== -1) {
          const raw = await BookingUser.findByPk(val.dataValues.CustomerId);
          Chatting = {
            id: raw.dataValues.id,
            Username: raw.dataValues.Username,
            Image: raw.dataValues.Image,
            Email: raw.dataValues.Email,
            Fullname: raw.dataValues.Fullname,
            Phone: raw.dataValues.Phone,
          };
        } else if (val.dataValues.PartnerId !== -1) {
          const raw = await RegisterPartner.findByPk(val.dataValues.PartnerId);
          Chatting = {
            id: raw.dataValues.id,
            PartnerName: raw.dataValues.PartnerName,
            Phone: raw.dataValues.Phone,
            Email: raw.dataValues.Email,
          };
        } else {
          Chatting = "Admin";
        }
        return {
          id: val.dataValues.id,
          ConversationId: val.dataValues.ConversationId,
          createdAt: val.dataValues.createdAt,
          Content: val.dataValues.Content,
          Chatting,
        };
      })
    ),
  };
  console.log(newData);
  res.status(200).json(newData);
});