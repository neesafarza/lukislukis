require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./routes/router');

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '500MB', type: 'application/json' }));
app.use(express.urlencoded({ limit: '500MB', extended: true }));
app.use(router);
app.all('*', (req, res) => {
  res.status(404);
  res.send('<h3>Error 404: page not found</h3>');
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('Successfully connected to the Mongo database!');
    mongoose.connection.on('error', console.error);
    app.listen(PORT, () => console.info(`Server is running at port: ${PORT}`));
  })
  .catch(console.error);
