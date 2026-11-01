import dns from 'node:dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root or server dir
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Ensure Google DNS is used to resolve MongoDB SRV records reliably on all networks (including Windows)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://javedabuzar969_db_user:Bi3OVZk6Ck6TyyuC@cluster0.q6nn75c.mongodb.net/shopco?retryWrites=true&w=majority&appName=Cluster0';

let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB] Connection error:', error.message);
    throw error;
  }
}

export default connectDB;
