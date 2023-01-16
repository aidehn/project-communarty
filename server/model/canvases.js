const mongoose = require('./db');

const CanvasSchema = mongoose.Schema(
  {
    // _id is the canvas_id
    owner_id: {
      type: String,
      required: true,
    },
    img_url: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'canvases',
    versionKey: false,
  }
);

const CanvasModel = mongoose.model('canvases', CanvasSchema);

module.exports = CanvasModel;
