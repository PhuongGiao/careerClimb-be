const express = require("express");
const {
  createConversation,
  createMessage,
  getAllConversation,
  getMessageByConversationId,
  getConversationById,
} = require("../controllers/conversation");

const router = express.Router();

router.post("/conversation", createConversation);
router.get("/conversation", getAllConversation);
router.get("/conversation/:id", getConversationById);

router.post("/message", createMessage);
router.get("/message", getMessageByConversationId);

module.exports = { router };
