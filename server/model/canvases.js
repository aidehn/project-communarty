const mongoose = require('./db');

const CanvasSchema = mongoose.Schema(
  {
    canvas_id: {
      type: String,
      required: true,
    },
    owner: {
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
