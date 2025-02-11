const expressAsyncHandler = require("express-async-handler");
const parsePDFData = require("../middleware/test");

// @desc receive 3 pdf reports and send parsed data
// @route POST /
// @access Public
const creditReport = expressAsyncHandler(async (req, res) => {
  //if there are no files attached
  if (!req?.files) {
    res
      .status(400)
      .json({ message: "Please upload the required credit reports" });
  }
  const { files } = req;
  const experian = files.filter((file) => file.fieldname === "Experian")[0]
    .path;
  const transUnion = files.filter((file) => file.fieldname === "TransUnion")[0]
    .path;
  const equifax = files.filter((file) => file.fieldname === "Equifax")[0].path;
  //if Experian report not sent
  if (!experian) {
    res.status(400).json({ message: "You are missing an Experian report" });
  }
  //if transunion report not sent
  if (!transUnion) {
    res.status(400).json({ message: "You are missing a TransUnion report" });
  }
  //if equifax report not sent
  if (!equifax) {
    res.status(400).json({ message: "You are missing an Equifax report" });
  }

  const client = {
    experian: "",
    transUnion: "",
    equifax: "",
  };

  client.experian = await parsePDFData(experian, "Experian");
  client.transUnion = await parsePDFData(transUnion, "TransUnion");
  client.equifax = await parsePDFData(equifax, "Equifax");
  res.json({ data: client });
});

//@desc receive 1 pdf report - experian only
//@route POST /experian
//@access Public
const experianReport = expressAsyncHandler(async (req, res) => {
  if (!req?.files) {
    res
      .status(400)
      .json({ message: "Please upload the required credit reports" });
  }
  const { files } = req;

  const experian = files.filter((file) => file.fieldname === "Experian")[0]
    .path;
  //if no Experian report sent
  if (!experian) {
    res.status(400).json({ message: "You are missing an Experian report" });
  }
  const client = {
    experian: "",
  };

  client.experian = await parsePDFData(experian, "Experian");
  res.json({ data: client });
});

//@desc receive 1 pdf report - transUnion only
//@route POST /experian
//@access Public
const transunionReport = expressAsyncHandler(async (req, res) => {
  if (!req?.files) {
    res
      .status(400)
      .json({ message: "Please upload the required credit reports" });
  }
  const { files } = req;
  const transunion = files.filter((file) => file.fieldname === "TransUnion")[0]
    .path;
  //if no TransUnion report sent
  if (!transunion) {
    res.status(400).json({ message: "You are missing a TransUnion report" });
  }
  const client = {
    transUnion: "",
  };

  client.transUnion = await parsePDFData(transunion, "TransUnion");
  res.json({ data: client });
});

//@desc receive 1 pdf report - equifax only
//@route POST /experian
//@access Public
const equifaxReport = expressAsyncHandler(async (req, res) => {
  if (!req?.files) {
    res
      .status(400)
      .json({ message: "Please upload the required credit reports" });
  }
  const { files } = req;
  const equifax = files.filter((file) => file.fieldname === "Equifax")[0].path;
  //if no Equifax report sent
  if (!equifax) {
    res.status(400).json({ message: "You are missing an Equifax report" });
  }
  const client = {
    equifax: "",
  };

  client.equifax = await parsePDFData(equifax, "Equifax");
  res.json({ data: client });
});

const multiReport = expressAsyncHandler(async (req, res) => {
  if (!req?.files) {
    res
      .status(400)
      .json({ message: "Please upload the required credit reports" });
  }
  const { files } = req;
  const experian = files.filter((file) => file.fieldname === "Experian");

  const transUnion = files.filter((file) => file.fieldname === "TransUnion");

  const equifax = files.filter((file) => file.fieldname === "Equifax");
  const client = {};
  if (experian.length) {
    client.experian = await parsePDFData(experian[0].path, "Experian");
  }
  if (transUnion.length) {
    client.transUnion = await parsePDFData(transUnion[0].path, "TransUnion");
  }
  if (equifax.length) {
    client.equifax = await parsePDFData(equifax[0].path, "Equifax");
  }
  res.json({ data: client });
});

module.exports = {
  creditReport,
  experianReport,
  transunionReport,
  equifaxReport,
  multiReport,
};
