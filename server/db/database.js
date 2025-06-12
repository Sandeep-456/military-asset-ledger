
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const dbPath = process.env.DB_PATH || './db/military_assets.db';
const dbDir = path.dirname(dbPath);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

const initializeDatabase = async () => {
  const queries = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'Logistics Officer',
      base_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (base_id) REFERENCES bases(id)
    )`,

    // Bases table
    `CREATE TABLE IF NOT EXISTS bases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      location VARCHAR(255),
      commander_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (commander_id) REFERENCES users(id)
    )`,

    // Equipment Types table
    `CREATE TABLE IF NOT EXISTS equipment_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50),
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // Assets table
    `CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serial_number VARCHAR(100) UNIQUE NOT NULL,
      equipment_type_id INTEGER NOT NULL,
      base_id INTEGER NOT NULL,
      status VARCHAR(20) DEFAULT 'Available',
      condition_status VARCHAR(20) DEFAULT 'Good',
      purchase_date DATE,
      purchase_cost DECIMAL(10,2),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (equipment_type_id) REFERENCES equipment_types(id),
      FOREIGN KEY (base_id) REFERENCES bases(id)
    )`,

    // Purchases table
    `CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipment_type_id INTEGER NOT NULL,
      base_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_cost DECIMAL(10,2) NOT NULL,
      total_cost DECIMAL(10,2) NOT NULL,
      supplier VARCHAR(255),
      purchase_date DATE NOT NULL,
      purchased_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (equipment_type_id) REFERENCES equipment_types(id),
      FOREIGN KEY (base_id) REFERENCES bases(id),
      FOREIGN KEY (purchased_by) REFERENCES users(id)
    )`,

    // Transfers table
    `CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_id INTEGER NOT NULL,
      from_base_id INTEGER NOT NULL,
      to_base_id INTEGER NOT NULL,
      transfer_date DATE NOT NULL,
      reason TEXT,
      status VARCHAR(20) DEFAULT 'Pending',
      transferred_by INTEGER NOT NULL,
      approved_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (asset_id) REFERENCES assets(id),
      FOREIGN KEY (from_base_id) REFERENCES bases(id),
      FOREIGN KEY (to_base_id) REFERENCES bases(id),
      FOREIGN KEY (transferred_by) REFERENCES users(id),
      FOREIGN KEY (approved_by) REFERENCES users(id)
    )`,

    // Assignments table
    `CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_id INTEGER NOT NULL,
      assigned_to VARCHAR(255) NOT NULL,
      assigned_by INTEGER NOT NULL,
      assignment_date DATE NOT NULL,
      return_date DATE,
      status VARCHAR(20) DEFAULT 'Active',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (asset_id) REFERENCES assets(id),
      FOREIGN KEY (assigned_by) REFERENCES users(id)
    )`,

    // Expenditures table
    `CREATE TABLE IF NOT EXISTS expenditures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_id INTEGER NOT NULL,
      expended_by INTEGER NOT NULL,
      expenditure_date DATE NOT NULL,
      reason VARCHAR(100) NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (asset_id) REFERENCES assets(id),
      FOREIGN KEY (expended_by) REFERENCES users(id)
    )`,

    // Audit Logs table
    `CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action VARCHAR(100) NOT NULL,
      table_name VARCHAR(50),
      record_id INTEGER,
      old_values TEXT,
      new_values TEXT,
      ip_address VARCHAR(45),
      user_agent TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  ];

  // Execute all table creation queries
  for (const query of queries) {
    await new Promise((resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Insert sample data
  await insertSampleData();
};

const insertSampleData = async () => {
  try {
    // Insert bases
    const bases = [
      { name: 'Fort Alpha', location: 'Northern Region' },
      { name: 'Base Bravo', location: 'Central Command' },
      { name: 'Outpost Charlie', location: 'Southern Frontier' }
    ];

    for (const base of bases) {
      await new Promise((resolve) => {
        db.run('INSERT OR IGNORE INTO bases (name, location) VALUES (?, ?)', 
               [base.name, base.location], resolve);
      });
    }

    // Insert equipment types
    const equipmentTypes = [
      { name: 'M4 Carbine', category: 'Weapons', description: 'Standard assault rifle' },
      { name: 'Night Vision Goggles', category: 'Optics', description: 'Advanced night vision system' },
      { name: 'Body Armor', category: 'Protection', description: 'Ballistic protection vest' },
      { name: 'Radio Set', category: 'Communications', description: 'Tactical communication device' },
      { name: 'Medical Kit', category: 'Medical', description: 'First aid medical supplies' }
    ];

    for (const equipment of equipmentTypes) {
      await new Promise((resolve) => {
        db.run('INSERT OR IGNORE INTO equipment_types (name, category, description) VALUES (?, ?, ?)', 
               [equipment.name, equipment.category, equipment.description], resolve);
      });
    }

    // Insert admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await new Promise((resolve) => {
      db.run(`INSERT OR IGNORE INTO users (username, email, password_hash, role, base_id) 
              VALUES (?, ?, ?, ?, ?)`, 
             ['admin', 'admin@military.gov', adminPassword, 'Admin', 1], resolve);
    });

    // Insert base commander
    const commanderPassword = await bcrypt.hash('commander123', 10);
    await new Promise((resolve) => {
      db.run(`INSERT OR IGNORE INTO users (username, email, password_hash, role, base_id) 
              VALUES (?, ?, ?, ?, ?)`, 
             ['commander', 'commander@military.gov', commanderPassword, 'Base Commander', 1], resolve);
    });

    // Insert logistics officer
    const logisticsPassword = await bcrypt.hash('logistics123', 10);
    await new Promise((resolve) => {
      db.run(`INSERT OR IGNORE INTO users (username, email, password_hash, role, base_id) 
              VALUES (?, ?, ?, ?, ?)`, 
             ['logistics', 'logistics@military.gov', logisticsPassword, 'Logistics Officer', 1], resolve);
    });

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

module.exports = db;
