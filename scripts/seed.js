const db = require('../config/database');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Check if data already exists
    const usersResult = await db.query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(usersResult.rows[0].count);
    
    if (userCount > 0) {
      console.log('ℹ️  Database already contains data. Skipping seed.');
      process.exit(0);
    }
    
    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const testPassword = await bcrypt.hash('test123', 10);
    
    // Insert sample users
    await db.query(`
      INSERT INTO users (username, email, password) VALUES
        ('admin', 'admin@zhidongjiaqu.com', $1),
        ('testuser', 'test@zhidongjiaqu.com', $2)
    `, [adminPassword, testPassword]);
    
    // Insert sample devices
    await db.query(`
      INSERT INTO devices (name, type, status, location) VALUES
        ('客厅灯', 'light', 'online', '客厅'),
        ('卧室空调', 'air_conditioner', 'offline', '卧室'),
        ('智能门锁', 'smart_lock', 'online', '门口'),
        ('厨房冰箱', 'refrigerator', 'online', '厨房'),
        ('客厅电视', 'tv', 'offline', '客厅')
    `);
    
    // Insert sample settings
    await db.query(`
      INSERT INTO settings (key, value, description) VALUES
        ('app_name', '智东家居服务', 'Application name'),
        ('version', '1.0.0', 'Application version'),
        ('maintenance_mode', 'false', 'Maintenance mode flag'),
        ('max_devices', '100', 'Maximum number of devices per user'),
        ('timezone', 'Asia/Shanghai', 'Default timezone')
    `);
    
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
