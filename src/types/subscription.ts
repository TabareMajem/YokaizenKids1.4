export type SubscriptionStatus = 'active' | 'past_due' | 'canceled';

export interface Subscription {
  id: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  status: SubscriptionStatus;
  amount: number;
  nextBillingDate: string;
}