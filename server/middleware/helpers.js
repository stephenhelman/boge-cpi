const PDF = require("pdf-parse");

const parsePDFData = async (report) => {
  const data = await PDF(report);
  return data;
};

module.exports = parsePDFData;
