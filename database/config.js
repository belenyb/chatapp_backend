const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    console.log("Init db config");
    await mongoose.connect(process.env.DB_CONNECTION);
  } catch (error) {
    console.log(error);
    throw new Error(`Error in database: ${error}`)
  }
}

module.exports = { dbConnection }
