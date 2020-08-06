const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
  dateCreated: Date,
  dateModified: Date,
  canvasData: Object,
  isMainCanvas: Boolean, // todo put constraint so only one main canvas
});

module.exports = mongoose.model('Canvas', CanvasSchema);
