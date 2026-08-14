import mongoose, { Types } from 'mongoose';
export interface IActivity {
    userId: Types.ObjectId;
    type: 'run' | 'cycle' | 'strength' | 'mobility' | 'yoga';
    durationMinutes: number;
    caloriesBurned: number;
    performedAt: Date;
}
export declare const Activity: mongoose.Model<any, {}, {}, {}, any, any, any>;
//# sourceMappingURL=Activity.d.ts.map