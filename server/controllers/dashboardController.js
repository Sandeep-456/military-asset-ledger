
const db = require('../db/database');

const getDashboardMetrics = async (req, res) => {
  try {
    const { date_from, date_to, base_id, equipment_type } = req.query;
    const userId = req.user.id;
    const userRole = req.user.role;
    const userBaseId = req.user.base_id;

    let baseFilter = '';
    let params = [];

    // Apply base filter based on user role
    if (userRole === 'Base Commander') {
      baseFilter = ' AND base_id = ?';
      params.push(userBaseId);
    } else if (base_id && userRole === 'Admin') {
      baseFilter = ' AND base_id = ?';
      params.push(base_id);
    }

    // Get opening balance (assets at start of period)
    const openingBalance = await new Promise((resolve) => {
      db.get(`
        SELECT COUNT(*) as count 
        FROM assets 
        WHERE created_at < COALESCE(?, '1900-01-01') ${baseFilter}
      `, [date_from, ...params], (err, row) => {
        resolve(row ? row.count : 0);
      });
    });

    // Get purchases in period
    const purchases = await new Promise((resolve) => {
      db.get(`
        SELECT COALESCE(SUM(quantity), 0) as count, COALESCE(SUM(total_cost), 0) as cost
        FROM purchases 
        WHERE purchase_date BETWEEN COALESCE(?, '1900-01-01') AND COALESCE(?, '2100-12-31') ${baseFilter}
      `, [date_from, date_to, ...params], (err, row) => {
        resolve({ count: row?.count || 0, cost: row?.cost || 0 });
      });
    });

    // Get transfers in
    const transfersIn = await new Promise((resolve) => {
      db.get(`
        SELECT COUNT(*) as count 
        FROM transfers 
        WHERE to_base_id ${userRole === 'Base Commander' ? '= ?' : (base_id ? '= ?' : 'IS NOT NULL')}
        AND transfer_date BETWEEN COALESCE(?, '1900-01-01') AND COALESCE(?, '2100-12-31')
        AND status = 'Completed'
      `, userRole === 'Base Commander' ? [userBaseId, date_from, date_to] : 
         (base_id ? [base_id, date_from, date_to] : [date_from, date_to]), (err, row) => {
        resolve(row ? row.count : 0);
      });
    });

    // Get transfers out
    const transfersOut = await new Promise((resolve) => {
      db.get(`
        SELECT COUNT(*) as count 
        FROM transfers 
        WHERE from_base_id ${userRole === 'Base Commander' ? '= ?' : (base_id ? '= ?' : 'IS NOT NULL')}
        AND transfer_date BETWEEN COALESCE(?, '1900-01-01') AND COALESCE(?, '2100-12-31')
        AND status = 'Completed'
      `, userRole === 'Base Commander' ? [userBaseId, date_from, date_to] : 
         (base_id ? [base_id, date_from, date_to] : [date_from, date_to]), (err, row) => {
        resolve(row ? row.count : 0);
      });
    });

    // Get assigned assets
    const assigned = await new Promise((resolve) => {
      db.get(`
        SELECT COUNT(*) as count 
        FROM assignments a
        JOIN assets ast ON a.asset_id = ast.id
        WHERE a.status = 'Active' 
        AND a.assignment_date BETWEEN COALESCE(?, '1900-01-01') AND COALESCE(?, '2100-12-31') ${baseFilter.replace('base_id', 'ast.base_id')}
      `, [date_from, date_to, ...params], (err, row) => {
        resolve(row ? row.count : 0);
      });
    });

    // Get expended assets
    const expended = await new Promise((resolve) => {
      db.get(`
        SELECT COUNT(*) as count 
        FROM expenditures e
        JOIN assets ast ON e.asset_id = ast.id
        WHERE e.expenditure_date BETWEEN COALESCE(?, '1900-01-01') AND COALESCE(?, '2100-12-31') ${baseFilter.replace('base_id', 'ast.base_id')}
      `, [date_from, date_to, ...params], (err, row) => {
        resolve(row ? row.count : 0);
      });
    });

    const netMovement = purchases.count + transfersIn - transfersOut;
    const closingBalance = openingBalance + netMovement - assigned - expended;

    res.json({
      openingBalance,
      closingBalance,
      netMovement,
      assigned,
      expended,
      purchases: purchases.count,
      purchasesCost: purchases.cost,
      transfersIn,
      transfersOut
    });

  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ message: 'Error fetching dashboard metrics' });
  }
};

const getNetMovementDetails = async (req, res) => {
  try {
    const { date_from, date_to, base_id } = req.query;
    const userRole = req.user.role;
    const userBaseId = req.user.base_id;

    let baseFilter = '';
    let params = [date_from || '1900-01-01', date_to || '2100-12-31'];

    if (userRole === 'Base Commander') {
      baseFilter = ' AND base_id = ?';
      params.push(userBaseId);
    } else if (base_id && userRole === 'Admin') {
      baseFilter = ' AND base_id = ?';
      params.push(base_id);
    }

    // Get purchases
    const purchasesQuery = `
      SELECT p.*, et.name as equipment_name, b.name as base_name, u.username as purchased_by_name
      FROM purchases p
      JOIN equipment_types et ON p.equipment_type_id = et.id
      JOIN bases b ON p.base_id = b.id
      JOIN users u ON p.purchased_by = u.id
      WHERE p.purchase_date BETWEEN ? AND ? ${baseFilter}
      ORDER BY p.purchase_date DESC
    `;

    const purchases = await new Promise((resolve) => {
      db.all(purchasesQuery, params, (err, rows) => {
        resolve(rows || []);
      });
    });

    // Get transfers in and out
    const transfersQuery = `
      SELECT t.*, a.serial_number, et.name as equipment_name,
             fb.name as from_base_name, tb.name as to_base_name, u.username as transferred_by_name
      FROM transfers t
      JOIN assets a ON t.asset_id = a.id
      JOIN equipment_types et ON a.equipment_type_id = et.id
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      JOIN users u ON t.transferred_by = u.id
      WHERE t.transfer_date BETWEEN ? AND ? AND t.status = 'Completed'
      ORDER BY t.transfer_date DESC
    `;

    const transfers = await new Promise((resolve) => {
      db.all(transfersQuery, [date_from || '1900-01-01', date_to || '2100-12-31'], (err, rows) => {
        resolve(rows || []);
      });
    });

    res.json({
      purchases,
      transfersIn: transfers.filter(t => 
        userRole === 'Base Commander' ? t.to_base_id === userBaseId : 
        (base_id ? t.to_base_id == base_id : true)
      ),
      transfersOut: transfers.filter(t => 
        userRole === 'Base Commander' ? t.from_base_id === userBaseId : 
        (base_id ? t.from_base_id == base_id : true)
      )
    });

  } catch (error) {
    console.error('Net movement details error:', error);
    res.status(500).json({ message: 'Error fetching net movement details' });
  }
};

module.exports = {
  getDashboardMetrics,
  getNetMovementDetails
};
