import "./env";
import express from "express";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated, test } from "./middlewares";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import { settings } from "cluster";
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

export const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(cors());
server.express.use(authenticateJwt);
server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: false }));
server.express.use(cookieParser());
server.express.use(fileUpload());
server.express.use("/public", express.static(__dirname + "/public"));

///////////////////////////

const setting = (TMPfolder, fileName) => {
  server.express.delete("/upload", (req, res, next) => {
    console.log("지우기 요청");
    if (fileName) {
      fs.unlink(`images/tmp/${TMPfolder}/${fileName}`, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });
    } else if (TMPfolder) {
      fs.rmdir(`images/tmp/${TMPfolder}`, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });
    }
  });

  const folder = TMPfolder;
  const name = fileName;
};
server.express.post("/upload", (req, res, next) => {
  const TMPfolder = Date.now() + " - " + req.files.file.md5;
  const fileName = Date.now() + "-" + req.files.file.name;
  const dir = `${TMPfolder}`;

  let uploadFile = req.files.file;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`images/tmp/${dir}`);
  }

  uploadFile.mv(`images/tmp/${dir}/${fileName}`, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(`images/tmp/${dir}/${fileName}`);
  });
  return setting(TMPfolder, fileName);
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
