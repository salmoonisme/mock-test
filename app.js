require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoute");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const port = process.env.port;

// middleware for route
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.set("view engine", "ejs");
app.use("/api", appRoutes);

// error handling from next()
app.use((err, req, res, next) => {
  let status = err.statusCode || err.status || 500;
  const error = err.error || err.message || "Internal server error";
  if (err.error || err.message) {
    status = err.status || 500;
  }
  return res.status(status).json({
    status: status,
    message: "Error",
    error: error,
  });
});

// server
app.listen(port, () => {
  console.log(`Port running on localhost:${port}`);
});
