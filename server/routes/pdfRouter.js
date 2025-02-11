const express = require("express");
const router = express.Router();
const {
  creditReport,
  experianReport,
  transunionReport,
  equifaxReport,
  multiReport,
} = require("../controllers/pdfController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

//POST - parse uploaded pdf files
router.route("/").post(upload.any(), creditReport);

router.route("/experian").post(upload.any(), experianReport);
router.route("/transunion").post(upload.any(), transunionReport);
router.route("/equifax").post(upload.any(), equifaxReport);
router.route("/multi").post(upload.any(), multiReport);

module.exports = router;
