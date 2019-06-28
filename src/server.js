import "./env";
import express from "express";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated, test } from "./middlewares";
import cors from "cors";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 4000;

export const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use("/images", express.static("test"));
server.express.use(authenticateJwt);
server.express.use(cors());
server.express.use(bodyParser.urlencoded({ extended: false }));
server.express.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images/test");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
export const upload = multer({ storage }).single("file");
server.express.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

///////////////////////////

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

//var storage = multer.diskStorage({
//  destination: function(req, file, cb) {
//    cb(null, "images");
// },
// filename: function(req, file, cb) {
//   cb(null, Date.now() + "-" + file.originalname);
//  }
//});
//
///var upload = multer({ storage });

//server.express.post("/upload", upload.single("file"), function(req, res, next) {
//  console.log(req.file.path, "레큐바디");
//  next();
//});

////////////////////////////
