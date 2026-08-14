"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
const Activity_1 = require("./models/Activity");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
// Middleware
app.use(express_1.default.json());
// Database connection
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        baseUrl: API_BASE_URL,
    });
});
app.get('/api/users', async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        res.status(503).json({ message: 'Database is not connected yet' });
        return;
    }
    try {
        const users = await User_1.User.find().limit(100).lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/activities', async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        res.status(503).json({ message: 'Database is not connected yet' });
        return;
    }
    try {
        const activities = await Activity_1.Activity.find()
            .populate('userId', 'name email')
            .limit(100)
            .lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API base URL: ${API_BASE_URL}`);
});
//# sourceMappingURL=index.js.map