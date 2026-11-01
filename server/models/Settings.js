import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: 'SHOP.CO' },
    supportEmail: { type: String, default: 'admin@shop.co' },
    currency: { type: String, default: 'PKR (Rs.)' },
    timezone: { type: String, default: 'UTC+05:00 (Pakistan Standard Time)' },
    orderAlerts: { type: Boolean, default: true },
    lowStockAlerts: { type: Boolean, default: true },
    customerSignups: { type: Boolean, default: true },
    stripeEnabled: { type: Boolean, default: true },
    paypalEnabled: { type: Boolean, default: true },
    codEnabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
export default Settings;
