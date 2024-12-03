import { stripe } from './config';
import type { Stripe } from 'stripe';

export async function createCustomer(
  email: string,
  name: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Customer> {
  try {
    return await stripe.customers.create({
      email,
      name,
      metadata
    });
  } catch (error) {
    console.error('Customer creation error:', error);
    throw new Error('Failed to create customer');
  }
}

export async function updateCustomer(
  customerId: string,
  data: Partial<Stripe.CustomerUpdateParams>
): Promise<Stripe.Customer> {
  try {
    return await stripe.customers.update(customerId, data);
  } catch (error) {
    console.error('Customer update error:', error);
    throw new Error('Failed to update customer');
  }
}

export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer> {
  try {
    return await stripe.customers.retrieve(customerId) as Stripe.Customer;
  } catch (error) {
    console.error('Customer retrieval error:', error);
    throw new Error('Failed to retrieve customer');
  }
}

export async function deleteCustomer(
  customerId: string
): Promise<Stripe.DeletedCustomer> {
  try {
    return await stripe.customers.del(customerId);
  } catch (error) {
    console.error('Customer deletion error:', error);
    throw new Error('Failed to delete customer');
  }
}