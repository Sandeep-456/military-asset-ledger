
const express = require('express');
const { getDashboardMetrics, getNetMovementDetails } = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');
const { auditLogger } = require('../middleware/logger');

const router = express.Router();

router.get('/metrics', authenticateToken, auditLogger('DASHBOARD_VIEW'), getDashboardMetrics);
router.get('/net-movement', authenticateToken, auditLogger('NET_MOVEMENT_VIEW'), getNetMovementDetails);

module.exports = router;
