require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_SECRET = "adfghgfargetydfgsethrf";

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET
};
