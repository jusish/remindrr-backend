import bcrypt from 'bcryptjs';
import User from '../models/User';
import { IUser } from '../models/User';
import { generateAcessToken, generateRefreshToken, verifyResfreshToken } from '../utils/tokenUtils';

export const register = async (userData: Partial<IUser>) => {
    const { first_name, last_name, email,phone, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');


    if (!password) throw new Error('Password is required');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ first_name, last_name, email, phone, password: hashedPassword });
    await user.save();

    return user;
};

export const login = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;

    // Find user
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    // Generate tokens
    const accessTokens = generateAcessToken(user.id.toString());
    const refreshTokens = generateRefreshToken(user.id.toString());

    // Save refresh token to user
    user.refresh_tokens.push(refreshTokens);
    await user.save();

    return { accessTokens, refreshTokens };
};

export const logout = async (refreshToken: string) => {
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) return;

    // Remove refresh token from user
    user.refresh_tokens = user.refresh_tokens.filter((token) => token !== refreshToken);
    await user.save();
};

export const refreshAccessToken = async (refreshToken: string) => {
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) throw new Error('Invalid refresh token');

    // Verify refresh token
    const decoded = verifyResfreshToken(refreshToken);
    if (!decoded) throw new Error('Invalid refresh token');

    // Generate new access token
    const accessToken = generateAcessToken(decoded.id);

    return { accessToken };
};



export default { register, login, logout, refreshAccessToken };