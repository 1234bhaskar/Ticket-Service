import type { Request, Response } from "express";
import { generateRandomIdService } from "../services/randomId.service.js";

export const getIdController = async (req: Request, res: Response) => {
    const randomID = await generateRandomIdService();
    res.status(200).json({ status: 'Success', randomID });
}

