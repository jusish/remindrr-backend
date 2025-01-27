const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload: any, done: (error: any, user?: any) => void) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            return done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
}));