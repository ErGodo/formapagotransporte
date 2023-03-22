const express = require('express');
const router = express.Router();

const formapagoController = require('../controllers/formapagoController');

router.get('/', formapagoController.list);
router.get('/:pkidformaPago', formapagoController.listByID);
router.post('/new', formapagoController.save);
router.delete('/delete/:pkidformaPago', formapagoController.delete);
router.post('/edit/:pkidformaPago', formapagoController.edit);

module.exports = router; 