import mongoose, { Schema, Types } from 'mongoose';

export interface IActivity {
  userId: Types.ObjectId;
  type: 'run' | 'cycle' | 'strength' | 'mobility' | 'yoga';
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'mobility', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { collection: 'activities' }
);

export const Activity =
  mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
