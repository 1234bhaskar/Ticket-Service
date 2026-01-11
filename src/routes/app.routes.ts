import express, { type Request, type Response } from "express"
import { getIdController } from "../controllers/app.controller.js";

const router = express.Router();

router.get("/getId", getIdController);

export default router;