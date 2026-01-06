import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

interface StripeConfigProps {
    children: React.ReactNode;
}

/**
 * Wraps the app in StripeProvider for payment functionality
 */
export function StripeConfig({ children }: StripeConfigProps): React.ReactElement {
    return (
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
            merchantIdentifier="merchant.com.driveschool"
        >
            <>{children}</>
        </StripeProvider>
    );
}

/**
 * Create a PaymentIntent via Supabase Edge Function
 * This should be called before presenting the Payment Sheet
 */
export async function createPaymentIntent(lessons: { lessonId: string; amount: number }[]): Promise<{
    clientSecret: string;
    ephemeralKey: string;
    customerId: string;
} | null> {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/create-payment-intent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({ lessons }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return null;
    }
}

/**
 * Default lesson prices (can be overridden by instructor)
 */
export const LESSON_PRICES = {
    standard: 5000, // $50.00 in cents
    premium: 7500,  // $75.00 in cents
    intensive: 12000, // $120.00 for 2-hour session
} as const;

/**
 * Format price from cents to display string
 */
export function formatPrice(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
}
