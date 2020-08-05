const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/lukislukis_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(console.error);

module.exports = mongoose;
