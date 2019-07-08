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
import fs from "fs";

const PORT = process.env.PORT || 4000;

export const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.use(cors());
server.express.use(bodyParser.urlencoded({ extended: false }));
server.express.use(bodyParser.json());
server.express.use("/images", express.static("images"));

const checker = () => {};

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images/test");
  },
  filename: function(req, file, cb) {
    fs.exists(`images/test/${file.originalname}`, exists => {
      if (exists) {
        cb(null, file.originalname);
      } else {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });
  }
});

export const upload = multer({ storage }).array("file");

server.express.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.files);
  });
});

server.express.delete("/upload", function(req, res, next) {
  let path = req.body && req.body;
  console.log(path.difference, "path");
  path.difference.map(
    async item =>
      await fs.unlink(item, function(err) {
        if (err) {
          console.log(err);
          return false;
        }
        console.log("file deleted successfully");
        return true;
      })
  );
  next();
});
///////////////////////////

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
