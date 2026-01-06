import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Supabase configuration
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Custom storage adapter for React Native using SecureStore
const ExpoSecureStoreAdapter = {
    getItem: async (key: string): Promise<string | null> => {
        return SecureStore.getItemAsync(key);
    },
    setItem: async (key: string, value: string): Promise<void> => {
        await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string): Promise<void> => {
        await SecureStore.deleteItemAsync(key);
    },
};

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// Database Types
export interface Profile {
    id: string;
    clerk_id: string;
    role: 'student' | 'instructor' | 'admin';
    name: string;
    email: string;
    avatar_url?: string;
    created_at: string;
}

export interface Instructor {
    id: string;
    profile_id: string;
    vehicle: string;
    rating: number;
    hourly_rate: number;
    bio?: string;
    profile?: Profile;
}

export interface Lesson {
    id: string;
    student_id: string;
    instructor_id: string;
    scheduled_at: string;
    duration_minutes: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'refunded';
    stripe_payment_id?: string;
    created_at: string;
    instructor?: Instructor;
    student?: Profile;
}

export interface Availability {
    id: string;
    instructor_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
}
