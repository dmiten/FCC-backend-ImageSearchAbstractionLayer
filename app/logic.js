"use strict";

import Flickr from "flickrapi";

import handleDb from "./handledb.js";

let logic = {},
    flickr = {};

export default logic;

logic.start = () => {
  Flickr.tokenOnly(
      {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_SECRET
      },
      (err, obj) => {
        if (err) {
          console.error("Flickr API initialization: " + err);
        } else {
          console.log("Flickr API data fetched.");
          handleDb.start();
          flickr = obj;
        }
      }
  );
};

logic.search = (req, res) => {

  let page = req.query.page || 1,
      limit = req.query.limit || 10,
      timestamp = Date.now(),
      query = req.params.query;

  flickr.photos.search(
      { text: query, page: page, per_page: limit },
      (err, result) => {
        if (err) {
          console.log("Searching: " + err);
        } else {
          console.log("Founded: " + result.photos.total);
          res.status(200).json(logic.formatAnswer(result));
        }
      }
  );

  handleDb.SearchHistory.findOneAndUpdate(
      { query: query },
      { timestamp: timestamp },
      { upsert: true },
      (err, result) => {
        if (err) {
          console.log("DB insert/update: " + err);
        } else {
          console.log("DB inserted/updateed.");
        }
      }
  );
};

logic.history = (req, res) => {
  handleDb.SearchHistory
  .find()
  .select({ _id: 0, query: 1, timestamp: 1 })
  .sort({ timestamp: -1 })
  .limit(10)
  .then((result) => {
    console.log("Hisory sent.");
    res.status(200).json(result);
  });
};

logic.formatAnswer = (result) => {

  let photos = [];

  result.photos.photo.map(each => {
    photos.push(
        {
          url: "https://www.flickr.com/photos/" + each.owner + "/" + each.id,
          title: each.title
        }
    );
  });

  return {
    result: {
      page: result.photos.page,
      pages: result.photos.pages,
      perpage: result.photos.perpage,
      total: result.photos.total
    },
    photos
  };
};