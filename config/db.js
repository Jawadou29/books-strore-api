const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to database succes");
  } catch (error) {
    console.log("connect to database faild");
  }
}

module.exports = connectToDB;