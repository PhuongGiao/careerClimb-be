const express = require("express");
const { sequelize } = require("./models");

const catchError = require("./middlewares/error");
const districtRouter = require("./routes/districtRoute");
const app = express();

const port = 3003;

app.use(express.json());

app.use("/api/booking-studio/district", districtRouter);

app.use(catchError);
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening on port ${port}`);
});
