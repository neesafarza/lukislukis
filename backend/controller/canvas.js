const canvasService = require('../service/canvasService');

exports.postCanvas = async (req, res) => {
  try {
    const canvas = await canvasService.createCanvas(false);
    res.status(200);
    res.json(canvas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getMainCanvas = async (req, res) => {
  try {
    const canvas = await canvasService.findMainCanvas();
    res.status(200);
    res.json(canvas);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

exports.getCanvas = async (req, res) => {
  try {
    const canvas = await canvasService.findCanvas(req.params);
    res.status(200);
    res.json(canvas);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

exports.putCanvas = async (req, res) => {
  // todo make a id validator to check for non hex id
  try {
    const canvas = await canvasService.updateCanvas(req.body);
    res.status(200);
    res.json(canvas);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};
