require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const catchError = require("./middlewares/error");
const { rootRouter } = require("./routes");
const stream = require("stream");
const { Server } = require("socket.io");
const { PatientPostBinaryObject, DoctorBinaryObject } = require("./models");
const catchAsync = require("./middlewares/async");
const ApiError = require("./utils/ApiError");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());
//////////////////
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
//////////////////////////////////
app.use(express.static(path.join(__dirname, "build")));
app.get(/^\/(?!.*api)/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/api", rootRouter);
app.get(
  "/api/image/patient-post/:id",
  catchAsync(async (req, res) => {
    const data = await PatientPostBinaryObject.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(data.dataValues.bytes)).pipe(res);
  })
);
app.get(
  "/api/image-doctor/:id",
  catchAsync(async (req, res) => {
    const data = await DoctorBinaryObject.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    if (data.dataValues.bytes === null) {
      const defaut = fs.readFileSync("./assets/ava.jpeg");
      return res.send(Buffer.from(defaut));
    }
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(data.dataValues.Bytes)).pipe(res);
  })
);
app.get(
  "/api/css/:id",
  catchAsync(async (req, res) => {
    const data = await CssFile.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(data.dataValues.CssFile)).pipe(res);
  })
);
app.get(
  "/api/download/css/:id",
  catchAsync(async (req, res) => {
    const data = await CssFile.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    res.set(
      "Content-disposition",
      "attachment; filename=" + data.dataValues.Name
    );
    res.set("Content-Type", "text/plain");
    res.send(Buffer.from(data.dataValues.CssFile));
  })
);
app.use(catchError);
////////////////////////////
const users = {};
io.on("connection", (socket) => {
  socket.join([2, 8, 9]);
  console.log("Socket", socket.id);
  socket.on("login", (user) => {
    users[socket.id] = user.userId;
    //socket.broadcast.emit('online', Object.values(users)); // Exclude sender
    io.emit("online", Object.values(users)); // Include sender
  });
  socket.on("send_message", (message) => {
    const { ConversationId } = message;
    io.to(ConversationId).emit("receive_message", message);
  });
  socket.on("disconnect", () => {
    delete users[socket.id];
    socket.broadcast.emit("offline", Object.values(users));
  });
  socket.on("typing", (data) => {
    socket.broadcast.to(data.ConversationId).emit("isTyping", data);
  });
});
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
