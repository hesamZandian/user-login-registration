const mongoose = require("mongoose");

module.exports.connect = () => {
  // connecting to the database
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.once("open", (_) => {
    console.log("database connected:", process.env.MONGO_URI);
  });

  db.on("error", (error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
  });
};
