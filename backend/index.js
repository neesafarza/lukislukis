const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');
// TODO: dotenv should be used

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json({ limit: '500MB', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '500MB', extended: true }));
app.use(express.json());
app.use(router);

mongoose
  .connect('mongodb://localhost:27017/lukislukis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('Successfully connected to the Mongo database!');
    app.listen(PORT, () => console.info(`Server is running at port: ${PORT}`));
  })
  .catch(console.error);
