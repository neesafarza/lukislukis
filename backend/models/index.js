const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/lukislukis_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log('err', err);
  });

module.exports = mongoose;
