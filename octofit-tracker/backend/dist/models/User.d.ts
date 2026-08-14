import mongoose from 'mongoose';
export interface IUser {
    name: string;
    email: string;
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    team?: string;
    createdAt: Date;
}
export declare const User: mongoose.Model<any, {}, {}, {}, any, any, any>;
//# sourceMappingURL=User.d.ts.map