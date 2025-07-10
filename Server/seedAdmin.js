const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@urbanfood.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('✅ Admin user already exists.');
      return;
    }
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('✅ Admin user seeded successfully!');
  } catch (err) {
    console.error('❌ Failed to seed admin user:', err.message);
  }
};

// Only run if called directly (not required as a module)
if (require.main === module) {
  require('dotenv').config();
  require('./config/Db')().then(seedAdmin);
}

module.exports = seedAdmin;
