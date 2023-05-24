const express = require("express");
const app = express();
const session = require('express-session')
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoute");
const port = 3000;

// middleware for route
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyrahasia",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: true,
    },
  })
);
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
