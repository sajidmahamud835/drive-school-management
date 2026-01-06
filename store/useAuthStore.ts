import { create } from 'zustand';
import { getProfile, upsertProfile } from '../lib/api/profiles';
import { Profile } from '../lib/supabase';

interface UserProfile extends Profile {
    // Extended fields for UI display
    progress?: number;
    upcomingLesson?: {
        date: string;
        time: string;
        instructor: string;
    };
    // Instructor Specific
    totalHours?: number;
}

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProfile: (clerkId: string) => Promise<void>;
    syncClerkUser: (clerkUser: { id: string; firstName?: string | null; lastName?: string | null; emailAddresses?: { emailAddress: string }[]; imageUrl?: string }) => Promise<void>;
    logout: () => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    fetchProfile: async (clerkId: string) => {
        set({ isLoading: true, error: null });

        try {
            const profile = await getProfile(clerkId);

            if (profile) {
                set({
                    user: profile,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            set({
                error: 'Failed to fetch profile',
                isLoading: false
            });
        }
    },

    syncClerkUser: async (clerkUser) => {
        set({ isLoading: true, error: null });

        try {
            const profileData = {
                clerk_id: clerkUser.id,
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
                email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
                avatar_url: clerkUser.imageUrl,
                role: 'student' as const, // Default role for new users
            };

            const profile = await upsertProfile(profileData);

            if (profile) {
                set({
                    user: profile,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                throw new Error('Failed to sync profile');
            }
        } catch (error) {
            set({
                error: 'Failed to sync user profile',
                isLoading: false
            });
        }
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            error: null
        });
    },

    updateProfile: (updates) => {
        set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
        }));
    },

    clearError: () => set({ error: null }),
}));
