import { Request, Response } from "express";

import authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}



export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);
    if (typeof user === 'string') {
      res.status(200).json({ token: user });
    } else {
      res.status(400).json({ message: user.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}