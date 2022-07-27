const { AdminWebhook } = require("../models");

exports.createWebHook = async (Method, Url, Timestamp, Body = "") => {
  try {
    const list = await AdminWebhook.create({ Method, Url, Timestamp, Body });
    return list;
  } catch (error) {
    console.log(error);
  }
};
