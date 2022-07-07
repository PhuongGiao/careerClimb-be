require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const swaggerJsDOc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const catchError = require("./middlewares/error");
const { rootRouter } = require("./routes");
const postmanToOpenApi = require("postman-to-openapi");
const cookieParser = require("cookie-parser");

const { AppBinaryObject, IdentifyImage } = require("./models");
const catchAsync = require("./middlewares/async");
const ApiError = require("./utils/ApiError");
const fs = require("fs");

// postman
const postmanCollection =
  "./apis/BOOKINGSTUDIO_BACKEND.postman_collection.json";
const outputFile = "./apis/collection.yml";
postmanToOpenApi(postmanCollection, outputFile, { defaultTag: "General" })
  .then((result) => {
    console.log(`OpenAPI specs: ${result}`);
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3003",
      },
    ],
  },
  apis: ["./apis/collection.yml"],
};

const swaggerDocs = swaggerJsDOc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api", rootRouter);

app.get(
  "/image/:id",
  catchAsync(async (req, res) => {
    const data = await AppBinaryObject.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    res.send(Buffer.from(data.dataValues.Bytes));
  })
);

app.get(
  "/image-license/:id",
  catchAsync(async (req, res) => {
    const data = await IdentifyImage.findByPk(req.params.id);
    if (!data) {
      throw new ApiError(404, "Image not found");
    }
    if (data.dataValues.Bytes === null) {
      const defaut = fs.readFileSync("./default/default.png");
      return res.send(Buffer.from(defaut));
    }
    res.send(Buffer.from(data.dataValues.Bytes));
  })
);

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
