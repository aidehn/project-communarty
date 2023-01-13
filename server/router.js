const express = require('express');
const router = express.Router();
const imageController = require('./controller/images');

router.post('/upload', imageController.postArtwork);

module.exports = router