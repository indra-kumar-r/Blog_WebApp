const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let routes = require("./routers/routers");
require("dotenv").config();

let PORT = process.env.PORT || 9000;
let app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
