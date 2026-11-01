import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, default: 'general' },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    time: { type: String, default: 'Just now' },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export default Activity;
