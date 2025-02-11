const express = require("express");
const path = require("path");

const cors = require("cors");
const { corsOptions } = require("./config/corsOptions.js");
const { credentials } = require("./middleware/credentials.js");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", require("./routes/pdfRouter.js"));

if (process.env.NODE_ENV === "production") {
  console.log(__dirname);
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
