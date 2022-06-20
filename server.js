require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const catchError = require("./middlewares/error");
const { rootRouter } = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", rootRouter);
app.use("/", (req, res) => {
  res.send("alooooooooooo");
});

app.use(catchError);
app.listen(process.env.PORT || 3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening on port ${process.env.PORT || 3000}`);
});
