const express = require('express');
const router = express.Router();
const imageController = require('./controller/images');
const userController = require('./controller/user');

router.post('/upload', imageController.postArtwork);
router.post('/canvas', imageController.getContributionsByCanvasId);
router.post('/create/user', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
