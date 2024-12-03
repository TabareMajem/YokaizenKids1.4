<content>import { Request, Response } from 'express';
import { Content } from '../models/Content';
import { logger } from '../config/logger';
import { generateSEOMetadata } from '../../services/ai/contentGeneration';

export async function createContent(req: Request, res: Response) {
  try {
    // Generate SEO metadata if not provided
    if (!req.body.metadata?.seoTitle || !req.body.metadata?.seoDescription) {
      const seoData = await generateSEOMetadata(
        `${req.body.title}\n\n${req.body.description}\n\n${req.body.content}`,
        req.body.metadata?.language || 'en'
      );
      req.body.metadata = {
        ...req.body.metadata,
        seoTitle: seoData.title,
        seoDescription: seoData.description,
        keywords: seoData.keywords
      };
    }

    const content = await Content.create({
      ...req.body,
      createdBy: req.user._id,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create content'
    });
  }
}

export async function updateContent(req: Request, res: Response) {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    // Update SEO metadata if content changed significantly
    if (
      req.body.title !== content.title ||
      req.body.description !== content.description ||
      req.body.content !== content.content
    ) {
      const seoData = await generateSEOMetadata(
        `${req.body.title || content.title}\n\n${req.body.description || content.description}\n\n${req.body.content || content.content}`,
        req.body.metadata?.language || content.metadata?.language || 'en'
      );
      req.body.metadata = {
        ...content.metadata,
        ...req.body.metadata,
        seoTitle: seoData.title,
        seoDescription: seoData.description,
        keywords: seoData.keywords
      };
    }

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        version: content.version + 1,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedContent
    });
  } catch (error) {
    logger.error('Content update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update content'
    });
  }
}

export async function getContent(req: Request, res: Response) {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve content'
    });
  }
}

export async function listContent(req: Request, res: Response) {
  try {
    const {
      type,
      category,
      status,
      page = 1,
      limit = 10,
      search
    } = req.query;

    const query: any = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const contents = await Content.find(query)
      .sort({ updatedAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Content.countDocuments(query);

    res.json({
      success: true,
      data: contents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    logger.error('Content listing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list content'
    });
  }
}

export async function deleteContent(req: Request, res: Response) {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    await content.remove();

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    logger.error('Content deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete content'
    });
  }
}

export async function publishContent(req: Request, res: Response) {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    content.status = 'published';
    content.publishedAt = new Date();
    await content.save();

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content publishing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to publish content'
    });
  }
}</content>