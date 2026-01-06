import { create } from 'zustand';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    avatar?: string;
    // Student Specific
    progress?: number;
    upcomingLesson?: {
        date: string;
        time: string;
        instructor: string;
    };
    // Instructor Specific
    totalHours?: number;
    rating?: number;
}

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (role: 'student' | 'instructor' | 'admin') => Promise<void>;
    logout: () => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

// Mock Data
const MOCK_USERS: Record<string, UserProfile> = {
    student: {
        id: 's1',
        name: 'Alex Johnson',
        email: 'alex.student@example.com',
        role: 'student',
        progress: 35,
        upcomingLesson: {
            date: '2024-03-20',
            time: '14:00',
            instructor: 'Mike Wilson'
        }
    },
    instructor: {
        id: 'i1',
        name: 'Mike Wilson',
        email: 'mike.instructor@drive.com',
        role: 'instructor',
        totalHours: 1250,
        rating: 4.9
    },
    admin: {
        id: 'a1',
        name: 'Sarah Connor',
        email: 'sarah.admin@drive.com',
        role: 'admin'
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (role) => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        set({
            user: MOCK_USERS[role],
            isAuthenticated: true,
            isLoading: false
        });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },

    updateProfile: (updates) => {
        set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null
        }));
    }
}));
