const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json({ limit: '500MB', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '500MB', extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.info(`listening at ${PORT}`));
