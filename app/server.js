"use strict";

import express from "express";
import dotenv from "dotenv";
import path from "path";

import logic from "./logic.js";

export default function server() {
  dotenv.config({ silent: true });
  logic.start();
};

server.start = () => {

  let app = express(),
      port = process.env.PORT || 8080,
      fileName = path.resolve("index.html");

  app.listen(port, () => {
    console.log("Listening on port: " + port);
  });

  app.get("/", (req, res) => {
    res.status(200).sendFile(fileName);
    console.log("Sent " + fileName);
  });

  app.get("/api/search/:query", (req, res) => {
    logic.search(req, res);
  });

  app.get("/api/history", (req, res) => {
    logic.history(req, res);
  });

  app.use((req, res, next) => {
    console.log("Status 404.");
    res.status(404).send("Wrong address used.");
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error.");
  });

};