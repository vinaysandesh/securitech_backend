 

const express = require('express'); 
const authMiddleware = require('../middlewares/authMiddleware');   
const { updateManualAlerts } = require('../controllers/manualScan');
const router = express.Router(); 
router.post('/add-manual-alert',authMiddleware,updateManualAlerts) 
module.exports = router;
