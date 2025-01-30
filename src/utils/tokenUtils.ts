import jwt from "jsonwebtoken";

const generateAcessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "", {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET || "") as {
      id: string;
    };
  } catch (error) {
    return null;
  }
};

const verifyResfreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || "") as {
      id: string;
    };
  } catch (error) {
    return null;
  }
};



export { generateAcessToken, generateRefreshToken, verifyAccessToken, verifyResfreshToken };