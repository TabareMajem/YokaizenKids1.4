import { Request, Response } from 'express';
import { PromptTemplate } from '../models/PromptTemplate';
import { PromptChange } from '../models/PromptChange';
import { logger } from '../config/logger';

export async function getPromptTemplates(req: Request, res: Response) {
  try {
    const templates = await PromptTemplate.find()
      .sort({ lastModified: -1 })
      .populate('createdBy', 'name email');

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    logger.error('Prompt templates retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve prompt templates'
    });
  }
}

export async function getPromptTemplate(req: Request, res: Response) {
  try {
    const template = await PromptTemplate.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Prompt template not found'
      });
    }

    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    logger.error('Prompt template retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve prompt template'
    });
  }
}

export async function createPromptTemplate(req: Request, res: Response) {
  try {
    const template = await PromptTemplate.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: template
    });
  } catch (error) {
    logger.error('Prompt template creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create prompt template'
    });
  }
}

export async function updatePromptTemplate(req: Request, res: Response) {
  try {
    const template = await PromptTemplate.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Prompt template not found'
      });
    }

    // Record changes
    const changes = Object.entries(req.body).map(([field, newValue]) => ({
      field,
      oldValue: template[field as keyof typeof template],
      newValue
    }));

    // Create change record
    await PromptChange.create({
      templateId: template._id,
      userId: req.user._id,
      oldVersion: template.version,
      newVersion: template.version + 1,
      changes
    });

    // Update template
    const updatedTemplate = await PromptTemplate.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        version: template.version + 1,
        lastModified: new Date()
      },
      { new: true }
    ).populate('createdBy', 'name email');

    res.json({
      success: true,
      data: updatedTemplate
    });
  } catch (error) {
    logger.error('Prompt template update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update prompt template'
    });
  }
}

export async function deletePromptTemplate(req: Request, res: Response) {
  try {
    const template = await PromptTemplate.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Prompt template not found'
      });
    }

    await template.remove();

    res.json({
      success: true,
      message: 'Prompt template deleted successfully'
    });
  } catch (error) {
    logger.error('Prompt template deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete prompt template'
    });
  }
}

export async function getPromptHistory(req: Request, res: Response) {
  try {
    const changes = await PromptChange.find({ templateId: req.params.id })
      .sort({ timestamp: -1 })
      .populate('userId', 'name email');

    res.json({
      success: true,
      data: changes
    });
  } catch (error) {
    logger.error('Prompt history retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve prompt history'
    });
  }
}