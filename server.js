const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const db = require("./config/database");
const routes = require("./routes/routes");
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);


db.connect();

// routes
app.use("/api", routes);

server.listen(process.env.PORT, () => {
  console.log("running on port: ", process.env.PORT);
});

