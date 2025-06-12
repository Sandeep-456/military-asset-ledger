
const winston = require('winston');
const db = require('../db/database');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'military-asset-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

const auditLogger = (action, tableName = null, recordId = null, oldValues = null, newValues = null) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      const userId = req.user ? req.user.id : null;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      
      // Log to database
      db.run(`
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [userId, action, tableName, recordId, JSON.stringify(oldValues), JSON.stringify(newValues), ipAddress, userAgent]);

      // Log to winston
      logger.info({
        action,
        userId,
        tableName,
        recordId,
        ipAddress,
        userAgent,
        statusCode: res.statusCode
      });

      originalSend.call(this, data);
    };

    next();
  };
};

module.exports = { logger, auditLogger };
