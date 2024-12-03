import { Request, Response } from 'express';
import { stripe } from '../../services/stripe/config';
import { logger } from '../config/logger';

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { priceId, quantity = 1, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: req.user?._id?.toString()
      }
    });

    res.json({
      success: true,
      sessionId: session.id
    });
  } catch (error) {
    logger.error('Checkout session creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session'
    });
  }
}

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({
      success: false,
      error: 'Missing stripe signature or webhook secret'
    });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(400).json({
      success: false,
      error: 'Webhook error'
    });
  }
}

async function handleCheckoutCompleted(session: any) {
  // Update user's subscription status
  const { userId } = session.metadata;
  if (!userId) return;

  try {
    // Update user subscription status in your database
    logger.info(`Checkout completed for user ${userId}`);
  } catch (error) {
    logger.error('Error handling checkout completion:', error);
  }
}

async function handleSubscriptionCreated(subscription: any) {
  // Handle new subscription
  const { userId } = subscription.metadata;
  if (!userId) return;

  try {
    // Update user subscription details in your database
    logger.info(`Subscription created for user ${userId}`);
  } catch (error) {
    logger.error('Error handling subscription creation:', error);
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  // Handle subscription updates
  const { userId } = subscription.metadata;
  if (!userId) return;

  try {
    // Update subscription details in your database
    logger.info(`Subscription updated for user ${userId}`);
  } catch (error) {
    logger.error('Error handling subscription update:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  // Handle subscription cancellation
  const { userId } = subscription.metadata;
  if (!userId) return;

  try {
    // Update user subscription status in your database
    logger.info(`Subscription deleted for user ${userId}`);
  } catch (error) {
    logger.error('Error handling subscription deletion:', error);
  }
}