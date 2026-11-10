import { Router } from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';
import validateTask from '../middleware/validateTask.js';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.post('/', auth, validateTask, createTask);
router.put('/:id', auth, validateTask, updateTask);
router.delete('/:id', auth, requireAdmin, deleteTask);

export default router;
