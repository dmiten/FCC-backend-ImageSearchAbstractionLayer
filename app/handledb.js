"use strict";

import mongoose from "mongoose";

import server from "./server.js";

let handleDb = {},
    searchHistorySchema = mongoose.Schema(
        { timestamp: Number, query: String },
        { capped: { size: 5242880, max: 50, autoIndexId: true } }
    );

export default handleDb;

handleDb.SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

handleDb.start = () => {

  let mongodb = process.env.MONGOLAB_URI || "mongodb://localhost:27017";

  searchHistorySchema.index({ timestamp: 1 });
  mongoose.Promise = global.Promise;
  mongoose.connect(mongodb, { useMongoClient: true })
  .catch(err => {
    console.log(err);
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection open.");
    server.start();
  });

  mongoose.connection.on("error", err => {
    console.log("Mongoose connection error: " + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose disconnected through app termination.");
      process.exit(0);
    });
  });
};