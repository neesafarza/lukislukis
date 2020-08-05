const Canvas = require('../models/canvas');

exports.createCanvas = async (isMainCanvas) => {
  Canvas.create({
    dateCreated: Date.now(),
    dateModified: Date.now(),
    canvasData: null,
    isMainCanvas,
  });
};

exports.findCanvas = async (id) => {
  const canvas = await Canvas.findById(id);
  if (!canvas) {
    throw new Error(`Error canvas not found with id ${JSON.stringify(id)}`);
  }
  return canvas;
};

exports.findMainCanvas = async () => {
  const canvas = await Canvas.findOne({ isMainCanvas: true });
  if (!canvas) {
    return this.createCanvas(true);
  }
  return canvas;
};

exports.updateCanvas = async (body) => {
  // todo put body validation here for id, canvas json etc. check for not null and correct format
  if (body) {
    const canvas = await Canvas.findById(body._id);
    if (canvas) {
      canvas.canvasData = body.canvasData;
      canvas.dateModified = Date.now();
      return canvas.save();
    }
  }

  throw new Error(`Error canvas not found with id ${body._id}`);
};
