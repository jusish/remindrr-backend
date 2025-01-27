import jwt from 'jsonwebtoken'

const jwt_scret = process.env.JWT_SECRET as string;


exports.generateJwtToken = (userId: string) => {
    return jwt.sign({ userId }, jwt_scret, { expiresIn: '1h' });
}