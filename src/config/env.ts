import dotenv from "dotenv";
import path from "path";

const nodeEnv = process.env.NODE_ENV || "development";

const pathByEnv: Record<string, string> = {
  development: ".env.dev",
  production: ".env.prod",
};

dotenv.config({
  path: path.resolve(process.cwd(), pathByEnv[nodeEnv]),
});

interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[];
}

// const nodeEnv = process.env.NODE_ENV || "development";
const port = Number(process.env.PORT) || 3001;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:4201";
const allowedTestOrigin = process.env.ALLOWED_TEST_ORIGIN;

const allowedOrigins = [allowedOrigin];

if (allowedTestOrigin) {
  allowedOrigins.push(allowedTestOrigin);
}

const config: Config = {
  port,
  nodeEnv,
  allowedOrigins,
};

export default config;
