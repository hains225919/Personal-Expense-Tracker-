/**
 * Seed Database with Sample Expenses for Testing & Verification
 * Run using: npm run seed
 */
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

const Expense = require('./backend/models/Expense');
const connectDB = require('./backend/config/db');

const sampleExpenses = [
  {
    title: 'Supermarket Grocery & Produce',
    amount: 68.50,
    category: 'Food',
    date: new Date('2026-10-25')
  },
  {
    title: 'Metro Monthly Transit Card',
    amount: 55.00,
    category: 'Travel',
    date: new Date('2026-10-24')
  },
  {
    title: 'High-Speed Fiber Internet Bill',
    amount: 49.99,
    category: 'Bills',
    date: new Date('2026-10-23')
  },
  {
    title: 'Ergonomic Office Chair Cushion',
    amount: 34.90,
    category: 'Shopping',
    date: new Date('2026-10-22')
  },
  {
    title: 'Team Coffee & Cafe Meeting',
    amount: 14.50,
    category: 'Food',
    date: new Date('2026-10-21')
  },
  {
    title: 'Electricity & Utility Bill',
    amount: 82.20,
    category: 'Bills',
    date: new Date('2026-10-20')
  },
  {
    title: 'Cloud Storage & Dev Subscription',
    amount: 12.00,
    category: 'Other',
    date: new Date('2026-10-19')
  },
  {
    title: 'Weekend Fuel & Toll Pass',
    amount: 45.00,
    category: 'Travel',
    date: new Date('2026-10-18')
  }
];

async function seedData() {
  try {
    console.log('🌱 Connecting to database for seeding...');
    await connectDB();

    console.log('🧹 Clearing old expenses (if any)...');
    await Expense.deleteMany({});

    console.log('📥 Inserting sample expense records...');
    const inserted = await Expense.insertMany(sampleExpenses);
    
    const total = inserted.reduce((sum, item) => sum + item.amount, 0);

    console.log(`✅ Successfully seeded ${inserted.length} expense records!`);
    console.log(`💰 Total amount calculated: $${total.toFixed(2)}`);
    
    await mongoose.connection.close();
    console.log('🔒 Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seedData();
