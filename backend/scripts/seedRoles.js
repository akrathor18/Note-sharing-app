import mongoose from 'mongoose';
import Role from '../models/Roles.js'; 
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URI;

await mongoose.connect(url);

const roles = ['admin', 'teacher', 'student'];

for (const role_name of roles) {
  const exists = await Role.findOne({ role_name });
  if (!exists) {
    await Role.create({ role_name });
    console.log(`Role "${role_name}" added`);
  } else {
    console.log(`Role "${role_name}" already exists`);
  }
}

await mongoose.disconnect();
console.log('✅ Role seeding completed');
