import cors from "cors";
import express from "express";

import config from "./config/env";
import checkOrigin from "./middlewares/checkOrigin";
import errorHandler from "./middlewares/errorHandler";
import enkaRoute from "./routes/enka-route";

const app = express();

app.use(express.json());

app.use(checkOrigin);

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    preflightContinue: false,
  })
);

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});

app.use("/enka", enkaRoute);

app.use(errorHandler);
