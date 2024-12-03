import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import {
  getPromptTemplates,
  getPromptTemplate,
  createPromptTemplate,
  updatePromptTemplate,
  deletePromptTemplate,
  getPromptHistory
} from '../controllers/promptTemplates';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// Get all prompt templates
router.get('/', getPromptTemplates);

// Get single prompt template
router.get('/:id', getPromptTemplate);

// Create new prompt template
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('template').trim().notEmpty().withMessage('Template is required'),
    body('variables').isArray().withMessage('Variables must be an array')
  ],
  validateRequest,
  createPromptTemplate
);

// Update prompt template
router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('template').optional().trim().notEmpty(),
    body('variables').optional().isArray()
  ],
  validateRequest,
  updatePromptTemplate
);

// Delete prompt template
router.delete('/:id', deletePromptTemplate);

// Get prompt template history
router.get('/:id/history', getPromptHistory);

export default router;