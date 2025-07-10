// server/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedPerson = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get args: node seedAdmin.js name email password role
  const [,, nameArg, emailArg, passwordArg, roleArg] = process.argv;
  const name = nameArg || 'Admin';
  const email = emailArg || 'admin@ngo.com';
  const password = passwordArg || 'admin123';
  const role = roleArg || 'admin';

  const userExists = await User.findOne({ email });

  if (!userExists) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    console.log(`✅ User created: ${name} (${email}, role: ${role})`);
  } else {
    console.log(`ℹ️ User already exists: ${email}`);
  }

  mongoose.disconnect();
};

seedPerson().catch((err) => {
  console.error('❌ Error seeding user:', err);
  mongoose.disconnect();
});
