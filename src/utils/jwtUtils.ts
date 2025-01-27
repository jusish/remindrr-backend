const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Verify JWT token and return user ID
interface DecodedToken {
    userId: string;
}

const verifyJwtToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        return decoded.userId;
    } catch (err) {
        return null; // Token is invalid or expired
    }
};


export default verifyJwtToken;