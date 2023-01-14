const express = require('express');
const router = express.Router();
const imageController = require('./controller/images');
const userController = require('./controller/images');

router.post('/upload', imageController.postArtwork);
router.post('/canvas', imageController.getContributionsByCanvasId);
router.post('create/user', userController.createUser);

module.exports = router;
