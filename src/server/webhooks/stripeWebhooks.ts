import { Request, Response } from 'express';
import { stripe } from '../../services/stripe/config';
import { getDb } from '../../lib/db/client';
import { ObjectId } from 'mongodb';
import { logger } from '../config/logger';
import { sendEmail } from '../../services/email/sender';

export async function handleStripeWebhook(req: Request, res: Response) {
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

    const db = await getDb();

    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object, db);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object, db);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object, db);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object, db);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object, db);
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

async function handleSubscriptionCreated(subscription: any, db: any) {
  try {
    const { userId } = subscription.metadata;
    if (!userId) return;

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'subscription.id': subscription.id,
          'subscription.status': subscription.status,
          'subscription.planId': subscription.items.data[0].price.id,
          'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
        }
      }
    );

    // Send welcome email
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (user) {
      await sendEmail(user.email, 'subscriptionConfirmation', {
        planName: subscription.items.data[0].price.nickname
      });
    }

    logger.info(`Subscription created for user ${userId}`);
  } catch (error) {
    logger.error('Subscription creation handler error:', error);
  }
}

async function handleSubscriptionUpdated(subscription: any, db: any) {
  try {
    const { userId } = subscription.metadata;
    if (!userId) return;

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'subscription.status': subscription.status,
          'subscription.planId': subscription.items.data[0].price.id,
          'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
        }
      }
    );

    logger.info(`Subscription updated for user ${userId}`);
  } catch (error) {
    logger.error('Subscription update handler error:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any, db: any) {
  try {
    const { userId } = subscription.metadata;
    if (!userId) return;

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'subscription.status': 'canceled',
          'subscription.canceledAt': new Date()
        }
      }
    );

    logger.info(`Subscription canceled for user ${userId}`);
  } catch (error) {
    logger.error('Subscription deletion handler error:', error);
  }
}

async function handlePaymentSucceeded(invoice: any, db: any) {
  try {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const { userId } = subscription.metadata;
    if (!userId) return;

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'subscription.lastPaymentStatus': 'succeeded',
          'subscription.lastPaymentDate': new Date()
        }
      }
    );

    logger.info(`Payment succeeded for subscription ${invoice.subscription}`);
  } catch (error) {
    logger.error('Payment success handler error:', error);
  }
}

async function handlePaymentFailed(invoice: any, db: any) {
  try {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const { userId } = subscription.metadata;
    if (!userId) return;

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'subscription.lastPaymentStatus': 'failed',
          'subscription.lastPaymentFailure': new Date()
        }
      }
    );

    // Send payment failure notification
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (user) {
      await sendEmail(user.email, 'paymentFailed', {
        invoiceUrl: invoice.hosted_invoice_url
      });
    }

    logger.info(`Payment failed for subscription ${invoice.subscription}`);
  } catch (error) {
    logger.error('Payment failure handler error:', error);
  }
}