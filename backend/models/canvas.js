const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  dateModified: { type: Date, default: new Date() },
  canvasData: { type: Object, default: null },
  isMainCanvas: { type: Boolean, default: false }, // todo put constraint so only one main canvas
});

module.exports = mongoose.model('Canvas', CanvasSchema);
