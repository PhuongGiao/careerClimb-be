const express = require("express");
const {
  createConversation,
  createMessage,
  getAllConversation,
  getMessageByConversationId,
} = require("../controllers/conversation");

const router = express.Router();

router.post("/conversation", createConversation);
router.get("/conversation", getAllConversation);

router.post("/message", createMessage);
router.get("/message", getMessageByConversationId);

module.exports = { router };
