const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const homepage = require("./routes/homepage");
const logger = require("./middleware/logger");
const auther = require("./auther");
const helmet = require("helmet");
const morgan = require("morgan");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", homepage);

console.log(`Application name: ${config.get("name")}`);
console.log(`Mail server: ${config.get("mail.host")}`);
console.log(`App password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled");
}

dbDebugger("Connected to DB");

app.use(logger);

app.use(auther);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening port ${port}...`);
});

function validateCourse(course) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(6).required(),
  });

  return schema.validate(course);
}

console.log(`process.env.PORT: ${process.env.PORT}`);
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
