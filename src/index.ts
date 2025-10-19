import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import checkOrigin from "./middlewares/checkOrigin";
import errorHandler from "./middlewares/errorHandler";
import enkaRoute from "./routes/enka-route";
import cacheRoute from "./routes/cache-route";

// ===== ENV =====

const nodeEnv = process.env.NODE_ENV || "development";

const pathByEnv: Record<string, string> = {
  development: ".env.dev",
  production: ".env.prod",
};

dotenv.config({
  path: path.resolve(process.cwd(), pathByEnv[nodeEnv]),
});

const port = Number(process.env.PORT) || 3001;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:4201";
const allowedTestOrigin = process.env.ALLOWED_TEST_ORIGIN;

const allowedOrigins = [allowedOrigin];

if (allowedTestOrigin) {
  allowedOrigins.push(allowedTestOrigin);
}

// ===== APP =====

const app = express();

app.use(express.json());

app.use(checkOrigin(allowedOrigins));

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.includes(origin)) {
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

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.use("/enka", enkaRoute);

app.use("/cache", cacheRoute);

app.use(errorHandler);
