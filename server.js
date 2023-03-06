// const { PatientPostBinaryObject, DoctorBinaryObject } = require("./models");
const stream = require("stream");
const catchAsync = require("./middlewares/async");
const ApiError = require("./utils/ApiError");
const fs = require("fs");
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const catchError = require("./middlewares/error");
const { rootRouter } = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

//////////////////
const http = require("http");
const path = require("path");
const server = http.createServer(app);

//////////////////////////////////

app.use(express.static(path.join(__dirname, "build")));
app.get(/^\/(?!.*api)/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/api", rootRouter);
// app.get(
//   "/api/image-doctor/:id",
//   catchAsync(async (req, res) => {
//     const data = await DoctorBinaryObject.findByPk(req.params.id);
//     if (!data) {
//       throw new ApiError(404, "Image not found");
//     }
//     if (data.dataValues.bytes === null) {
//       const defaut = fs.readFileSync("./assets/ava.jpeg");
//       return res.send(Buffer.from(defaut));
//     }
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(Buffer.from(data.dataValues.bytes)).pipe(res);
//   })
// );
// app.get(
//   "/api/css/:id",
//   catchAsync(async (req, res) => {
//     const data = await CssFile.findByPk(req.params.id);
//     if (!data) {
//       throw new ApiError(404, "Image not found");
//     }
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(Buffer.from(data.dataValues.CssFile)).pipe(res);
//   })
// );
// app.get(
//   "/api/download/css/:id",
//   catchAsync(async (req, res) => {
//     const data = await CssFile.findByPk(req.params.id);
//     if (!data) {
//       throw new ApiError(404, "Image not found");
//     }
//     res.set(
//       "Content-disposition",
//       "attachment; filename=" + data.dataValues.Name
//     );
//     res.set("Content-Type", "text/plain");
//     res.send(Buffer.from(data.dataValues.CssFile));
//   })
// );
app.use(catchError);

server.listen(process.env.PORT || 3001, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening on port ${process.env.PORT || 3001}`);
});
////////////////////
