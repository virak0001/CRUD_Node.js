const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/',studentController.index);
router.get('/create',studentController.create);
router.post('/store',studentController.store);
router.post('/update',studentController.update);
router.get('/edit/:id',studentController.edit);
router.get('/:id/delete',studentController.delete);

module.exports = router;