
const express = require('express');
const { body } = require('express-validator');
const { login, register, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { auditLogger } = require('../middleware/logger');

const router = express.Router();

// Login
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], auditLogger('USER_LOGIN'), login);

// Register
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['Admin', 'Base Commander', 'Logistics Officer'])
], auditLogger('USER_REGISTER'), register);

// Get profile
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
