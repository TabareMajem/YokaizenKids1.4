import { stripe, SUBSCRIPTION_PRICES } from './config';
import type { Stripe } from 'stripe';

export type SubscriptionPlan = 'SCHOOL_BASIC' | 'SCHOOL_PREMIUM' | 'FAMILY_BASIC' | 'FAMILY_PREMIUM';

export async function createSubscription(
  customerId: string,
  plan: SubscriptionPlan,
  paymentMethodId: string
): Promise<Stripe.Subscription> {
  try {
    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription
    const priceId = getPriceId(plan);
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  } catch (error) {
    console.error('Subscription creation error:', error);
    throw new Error('Failed to create subscription');
  }
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  try {
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    throw new Error('Failed to cancel subscription');
  }
}

export async function updateSubscription(
  subscriptionId: string,
  newPlan: SubscriptionPlan
): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = getPriceId(newPlan);

    return await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
    });
  } catch (error) {
    console.error('Subscription update error:', error);
    throw new Error('Failed to update subscription');
  }
}

function getPriceId(plan: SubscriptionPlan): string {
  switch (plan) {
    case 'SCHOOL_BASIC':
      return SUBSCRIPTION_PRICES.SCHOOL.BASIC;
    case 'SCHOOL_PREMIUM':
      return SUBSCRIPTION_PRICES.SCHOOL.PREMIUM;
    case 'FAMILY_BASIC':
      return SUBSCRIPTION_PRICES.FAMILY.BASIC;
    case 'FAMILY_PREMIUM':
      return SUBSCRIPTION_PRICES.FAMILY.PREMIUM;
    default:
      throw new Error('Invalid subscription plan');
  }
}