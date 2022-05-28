const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const file = req.file;
  console.log("file: ", file);
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

app.listen((port = process.env.PORT || 3000), () => {
  console.log("Your app is listening on port " + port);
});
