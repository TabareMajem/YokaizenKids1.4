import { Request, Response } from 'express';
import { Content } from '../models/Content';
import { ContentApproval } from '../models/ContentApproval';
import { sendEmail } from '../../services/email/sender';
import { logger } from '../config/logger';

export async function submitForApproval(req: Request, res: Response) {
  try {
    const { contentId } = req.params;
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    // Create approval request
    const approval = await ContentApproval.create({
      contentId: content._id,
      version: content.version,
      status: 'pending'
    });

    // Update content status
    content.status = 'pending';
    await content.save();

    // Notify reviewers
    // In a real app, you would fetch the list of reviewers from the database
    const reviewers = ['admin@example.com'];
    await Promise.all(reviewers.map(reviewer => 
      sendEmail(reviewer, 'contentReview', {
        contentTitle: content.title,
        contentId: content._id
      })
    ));

    res.json({
      success: true,
      data: approval
    });
  } catch (error) {
    logger.error('Content approval submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit content for approval'
    });
  }
}

export async function reviewContent(req: Request, res: Response) {
  try {
    const { contentId } = req.params;
    const { status, comments } = req.body;

    const approval = await ContentApproval.findOne({
      contentId,
      status: 'pending'
    });

    if (!approval) {
      return res.status(404).json({
        success: false,
        error: 'Approval request not found'
      });
    }

    // Update approval status
    approval.status = status;
    approval.reviewerId = req.user._id;
    approval.comments = comments;
    await approval.save();

    // Update content status
    const content = await Content.findById(contentId);
    if (content) {
      content.status = status === 'approved' ? 'published' : 'draft';
      if (status === 'approved') {
        content.publishedAt = new Date();
      }
      await content.save();

      // Notify content creator
      await sendEmail(content.createdBy.email, 'contentReviewComplete', {
        contentTitle: content.title,
        status,
        comments
      });
    }

    res.json({
      success: true,
      data: approval
    });
  } catch (error) {
    logger.error('Content review error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to review content'
    });
  }
}

export async function getApprovalHistory(req: Request, res: Response) {
  try {
    const { contentId } = req.params;
    
    const approvals = await ContentApproval.find({ contentId })
      .sort({ createdAt: -1 })
      .populate('reviewerId', 'name email');

    res.json({
      success: true,
      data: approvals
    });
  } catch (error) {
    logger.error('Approval history retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve approval history'
    });
  }
}