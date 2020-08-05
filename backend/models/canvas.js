const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CanvasSchema = new Schema({
  dateCreated: 'date',
  dateModified: 'date',
  canvasData: 'object',
  isMainCanvas: 'boolean', // todo put constraint so only one main canvas
});

module.exports = mongoose.model('Canvas', CanvasSchema);
