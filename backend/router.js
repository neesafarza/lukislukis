const router = require('express').Router();
const controller = require('./controller/canvas');

router.get('/main-canvas', controller.getMainCanvas);
router.get('/canvas/:_id', controller.getCanvas);
router.post('/canvas', controller.postCanvas);
router.put('/canvas', controller.putCanvas);

module.exports = router;