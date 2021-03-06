"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const socket = require("./utils/socket");
socket.initIo(http);
const sockInterface = require("./src/socketInterface");

const adminRoutes = require("./src/admin/route");
const visitorRoutes = require("./src/visitor/route");

const init = require("./utils/init");
init();

const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "sn8Q~+Nzxs?/&(*4ghv",
    resave: false,
    saveUninitialized: false
  })
);
//setting views and template engine
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));
app.set("view engine", "ejs");

app.use("/", visitorRoutes);
app.use("/admin", adminRoutes);
app.use((req, res, next) => {
  res.status(404).render("layouts/404");
});
app.use((err, req, res, next) => {
  res.status(404).render("layouts/error");
});
module.exports = { app, http };
