const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/index");

const errorHandler = require("./middleware/error-handler")

const {requestLogger, errorLogger} = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use("/", mainRouter);



app.use(requestLogger);

app.use(errorLogger);




console.log("testing");


app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).send({ message: 'An error occurred on the server' });
  
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send({ message: err.message });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
