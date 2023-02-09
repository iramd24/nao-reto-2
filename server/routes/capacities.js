import express from 'express';
import {getCapacities} from '../controllers/capacities.js';

const router = express.Router();


router.get('/', getCapacities);
//router.put('/', updateCapacities);

export default router;