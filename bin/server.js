#!/usr/bin/env node --harmony -r esm

import Debug from "debug";
import mongoose from "mongoose";

import { app, config, logger } from "../src";

const debug = Debug("store:server");
const { PORT, MONGODB_CONNECTION } = config;

logger.info(config, "config list");

/**
 * connect to mongodb
 */
mongoose.connect(MONGODB_CONNECTION, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  auto_reconnect: true,
  reconnectInterval: 30 * 1000,
  reconnectTries: 1000,
  keepAlive: true,
  connectTimeoutMS: 30 * 1000,
});

mongoose.connection.on("open", async () => {
  // logger.info("mongodb of .... connected")
  debug("mongodb connected");

  // console.log("========== sta ===========")
  // Object.getOwnPropertyNames(mongoose).forEach(prop => {
  //   console.log(prop);
  // });
  // console.log("========== end ===========")

  // const Schema = mongoose.Schema;
  // const ObjectId = Schema.ObjectId;
  // const BlogPost = new Schema({
  //   author: ObjectId,
  //   title: String,
  //   body: String,
  //   date: Date
  // });
  // logger.info(BlogPost)

  // const Comment = new Schema({
  //   name: { type: String, default: 'hahaha' },
  //   age: { type: Number, min: 18, index: true },
  //   bio: { type: String, match: /[a-z]/ },
  //   date: { type: Date, default: Date.now },
  //   buff: Buffer
  // });

  // const MyModel = mongoose.model('ModelName', schema);
  // const m = new MyModel;

  // const BlogPost = mongoose.model('BlogPost');

  // // create a blog post
  // const post = new BlogPost();

  // // create a comment
  // post.comments.push({ title: 'My comment' });

  // post.save(function (err) {
  //   if (!err) console.log('Success!');
  // });

});

mongoose.connection.on("error", () => {
  debug("mongodb connection error");
  logger.error("mongodb connection error");
});

/**
 * start app
 */
app.listen(PORT, () =>
  logger.info(`[${process.env.NODE_ENV}] http server start on port ${PORT} 🚀`)
);



app.on("error", err => console.error(err));
