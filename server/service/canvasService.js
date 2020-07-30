const Canvas = require('../models/canvas');

exports.createCanvas = async (isMainCanvas) => {
    return await Canvas.create({
        dateCreated: Date.now(),
        dateModified: Date.now(),
        canvasData: null,
        isMainCanvas: isMainCanvas,
    })
}

exports.findCanvas = async(id) => {
    let canvas = await Canvas.findById(id);
    if(!canvas) {
        throw new Error(`Error canvas not found with id ${JSON.stringify(id)}`);

    }

    return canvas;
}

exports.findMainCanvas = async () => {
    let canvas = await Canvas.findOne({isMainCanvas: true});
    if(!canvas) {
        return createCanvas(true);
    }
    return canvas;
}

exports.updateCanvas = async(body) => {
    // todo put body validation here for id, canvas json etc. check for not null and correct format
    if (body) {
        let canvas = await Canvas.findById(body._id)
        if (canvas) {
            canvas.canvasData = body.canvasData;
            canvas.dateModified = Date.now();
            return await canvas.save()
        }
    }

    throw new Error(`Error canvas not found with id ${body._id}`);
}