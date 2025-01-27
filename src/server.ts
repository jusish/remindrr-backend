import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
});