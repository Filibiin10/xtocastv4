import express from 'express';
import { FundraiserController } from '../controllers/FundraiserController.js';

const router = express.Router();

// Route to create a new fundraiser
router.post('/create', FundraiserController);

export default router;
