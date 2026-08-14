import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  team?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    team: { type: String, required: false, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'users' }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
