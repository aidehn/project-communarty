const express = require('express');
const router = express.Router();
const imageController = require('./controller/images');
const userController = require('./controller/user');

router.post('/upload', imageController.postArtwork);
router.post('/canvas', imageController.getContributionsByCanvasId);
router.post('/create/user', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user', userController.getUserInfo);
router.post('/search', imageController.getCanvasesByUserId);
router.get('/user/artwork', imageController.getUserContributions);

module.exports = router;
