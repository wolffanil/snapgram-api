const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.URL_DB);

      // async function deleteTokens() {
      //   await Token.deleteMany();
      //   console.log("tokens delete all");
      // }

      // deleteTokens();

      console.log("Успешное подключение к базе данных!");
    } else {
      console.log("Подключение к базе данных уже установлено.");
    }
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error.message);
  }
};

module.exports = connectToDatabase;
