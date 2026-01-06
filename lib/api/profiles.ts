import { supabase, Profile } from '../supabase';

/**
 * Get user profile by Clerk ID
 */
export async function getProfile(clerkId: string): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', clerkId)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
}

/**
 * Create or update user profile
 */
export async function upsertProfile(profile: Partial<Profile> & { clerk_id: string }): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .upsert(profile, { onConflict: 'clerk_id' })
        .select()
        .single();

    if (error) {
        console.error('Error upserting profile:', error);
        return null;
    }

    return data;
}

/**
 * Update profile fields
 */
export async function updateProfile(clerkId: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('clerk_id', clerkId)
        .select()
        .single();

    if (error) {
        console.error('Error updating profile:', error);
        return null;
    }

    return data;
}
