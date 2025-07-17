import express from 'express';
import { getChores, addChore, updateChore, deleteChore } from '../controllers/choreController.js';
const router = express.Router();
router.get('/', getChores);
router.post('/', addChore);
router.put('/:id', updateChore);
router.delete('/:id', deleteChore);
export default router;