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
server.express.use("/image", express.static(__dirname + "/tmp"));

///////////////////////////

server.express.post("/upload", (req, res, next) => {
  let TMPfolder = Date.now() + "_" + req.files.file.md5;
  let fileName = Date.now() + "-" + req.files.file.name;
  let dir = `${TMPfolder}`;

  let uploadFile = req.files.file;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`images/tmp/${dir}`);
  }

  uploadFile.mv(`images/tmp/${dir}/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(req.files.file.name, "여긴 업로드 부분");
    res.send(`images/tmp/${dir}/${fileName}`);
  });
});

server.express.delete("/upload", (req, res, next) => {
  console.log(req.body.id, "지우기 요청");
  const roomName = req.body.id.split("/")[2];
  console.log(roomName, "??");
  if (req.body.id) {
    fs.unlink(req.body.id, function(err) {
      if (err) {
        console.log(err, "errrr");
        return res.status(500).send(err);
      }
    });
  }
  if (!fs.existsSync(roomName)) {
    fs.rmdir(`images/tmp/${roomName}`, err => {
      console.log(err, "방도 지움");
    });
  }
});

///////////////////////////

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
