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
    console.log(TMPfolder, "이걸 확인해", fileName, "파일네임");

    if (fileName) {
      if (!fs.existsSync(fileName)) {
        fs.unlink(`images/tmp/${TMPfolder}/${fileName}`, function(err) {
          if (err) {
            console.log(err.path.split("-")[0], "errrr");
            fs.rmdir(err.path, function(err) {
              if (err) {
                console.log(err, "unlink error");
                return res.status(500).send(err);
              }
            });
            console.log(err);
            return res.status(500).send(err);
          }
        });
      }
    }
    if (TMPfolder) {
      if (!fs.existsSync(TMPfolder)) {
        fs.rmdir(`images/tmp/${TMPfolder}`, function(err) {
          if (err) {
            console.log(err, "체크해 이걸");
            fs.rmdir(err.path, function(err) {
              if (err) {
                console.log(err, "rm dir error");
                return res.status(500).send(err);
              }
            });
            return res.status(500).send(err);
          }
        });
      }
    }
  });

  const folder = TMPfolder;
  const name = fileName;
};
server.express.post("/upload", (req, res, next) => {
  const TMPfolder = Date.now() + "_" + req.files.file.md5;
  const fileName = Date.now() + "-" + req.files.file.name;
  const dir = `${TMPfolder}`;

  let uploadFile = req.files.file;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`images/tmp/${dir}`);
  }

  uploadFile.mv(`images/tmp/${dir}/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(req, "여긴 업로드 부분");
    res.send(`images/tmp/${dir}/${fileName}`);
  });
  return setting(TMPfolder, fileName);
});

///////////////////////////

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
