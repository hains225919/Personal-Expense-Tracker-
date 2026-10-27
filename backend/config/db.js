const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Auto-detect cached mongod executable so it boots immediately with zero network download
const candidateBinaries = [
  path.join(__dirname, '../node_modules/.cache/mongodb-memory-server/mongod-x64-win32-8.2.6.exe'),
  path.join(__dirname, '../../node_modules/.cache/mongodb-memory-server/mongod-x64-win32-8.2.6.exe'),
  path.join(__dirname, '../../../Casestudy2/node_modules/.cache/mongodb-memory-server/mongod-x64-win32-8.2.6.exe')
];
for (const binPath of candidateBinaries) {
  if (fs.existsSync(binPath)) {
    process.env.MONGOMS_SYSTEM_BINARY = binPath;
    break;
  }
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    if (!uri) {
      console.warn('⚠️  No MONGODB_URI found in environment variables. Starting local in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        binary: { version: '8.2.6' }
      });
      const localUri = mongod.getUri();
      const conn = await mongoose.connect(localUri);
      console.log(`✅ Connected to Local In-Memory MongoDB: ${conn.connection.host}`);
      return;
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000 // Quick timeout so it falls back gracefully if network fails
    });

    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`⚠️  MongoDB Atlas connection error: ${error.message}`);
    console.log('🔄 Attempting fallback to local In-Memory MongoDB server...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        binary: { version: '8.2.6' }
      });
      const localUri = mongod.getUri();
      const conn = await mongoose.connect(localUri);
      console.log(`✅ Successfully connected to Local In-Memory Fallback MongoDB: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`❌ Could not connect to fallback MongoDB: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
