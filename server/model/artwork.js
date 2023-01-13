const mongoose = require('./db');

const ArtworkSchema = mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    belongs_to: {
      type: String,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'contributions',
    versionKey: false,
  }
);

const ArtworkModel = mongoose.model('contributions', ArtworkSchema);

module.exports = ArtworkModel;
