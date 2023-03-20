const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const { questionRouter } = require('./routes/question.router')

const PORT = 4000;
const URL = 'mongodb+srv://artemh:artem12345@cluster0.wbufwsp.mongodb.net/?retryWrites=true&w=majority'

const app = express();
app.use(cors())

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>  console.log('Connected to MongoDB'))
  .catch((error) =>  console.log(error))

app.use('/questions', express.json(), questionRouter);


app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`API is working on http://localhost:${PORT}`)
});
