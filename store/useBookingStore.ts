import { create } from 'zustand';
import { getInstructors, getAvailableSlots } from '../lib/api/instructors';
import { createLesson, getStudentLessons, cancelLesson } from '../lib/api/lessons';
import { createPaymentIntent, LESSON_PRICES } from '../lib/stripe';
import { Instructor, Lesson } from '../lib/supabase';

interface BookingState {
    // Selection state
    selectedDate: Date;
    selectedTime: string | null;
    selectedInstructor: (Instructor & { profile?: { name: string; avatar_url?: string } }) | null;

    // Data
    availableInstructors: Instructor[];
    availableSlots: string[];
    studentLessons: Lesson[];

    // UI state
    isLoading: boolean;
    isBooking: boolean;
    error: string | null;

    // Actions
    setDate: (date: Date) => void;
    setTime: (time: string) => void;
    setInstructor: (instructor: Instructor) => void;
    fetchInstructors: () => Promise<void>;
    fetchAvailableSlots: (instructorId: string, date: Date) => Promise<void>;
    fetchStudentLessons: (studentId: string) => Promise<void>;
    confirmBooking: (studentId: string) => Promise<{ success: boolean; lessonId?: string }>;
    cancelBooking: (lessonId: string) => Promise<boolean>;
    resetBooking: () => void;
    clearError: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    selectedDate: new Date(),
    selectedTime: null,
    selectedInstructor: null,
    availableInstructors: [],
    availableSlots: [],
    studentLessons: [],
    isLoading: false,
    isBooking: false,
    error: null,

    setDate: (date) => {
        set({ selectedDate: date, selectedTime: null });
        const instructor = get().selectedInstructor;
        if (instructor) {
            get().fetchAvailableSlots(instructor.id, date);
        }
    },

    setTime: (time) => set({ selectedTime: time }),

    setInstructor: (instructor) => {
        set({ selectedInstructor: instructor, selectedTime: null });
        get().fetchAvailableSlots(instructor.id, get().selectedDate);
    },

    fetchInstructors: async () => {
        set({ isLoading: true, error: null });

        try {
            const instructors = await getInstructors();
            set({ availableInstructors: instructors, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch instructors', isLoading: false });
        }
    },

    fetchAvailableSlots: async (instructorId, date) => {
        set({ isLoading: true, error: null });

        try {
            const slots = await getAvailableSlots(instructorId, date);
            set({ availableSlots: slots, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch available slots', isLoading: false });
        }
    },

    fetchStudentLessons: async (studentId) => {
        set({ isLoading: true, error: null });

        try {
            const lessons = await getStudentLessons(studentId);
            set({ studentLessons: lessons, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch lessons', isLoading: false });
        }
    },

    confirmBooking: async (studentId) => {
        const { selectedDate, selectedTime, selectedInstructor } = get();

        if (!selectedTime || !selectedInstructor) {
            set({ error: 'Please select time and instructor' });
            return { success: false };
        }

        set({ isBooking: true, error: null });

        try {
            // Combine date and time
            const scheduledAt = new Date(selectedDate);
            const [hours, minutes] = selectedTime.split(':').map(Number);
            scheduledAt.setHours(hours, minutes, 0, 0);

            // Create lesson in database
            const lesson = await createLesson({
                student_id: studentId,
                instructor_id: selectedInstructor.id,
                scheduled_at: scheduledAt.toISOString(),
                duration_minutes: 60,
            });

            if (!lesson) {
                throw new Error('Failed to create booking');
            }

            // Create payment intent for the lesson
            const paymentData = await createPaymentIntent([{
                lessonId: lesson.id,
                amount: selectedInstructor.hourly_rate * 100 || LESSON_PRICES.standard,
            }]);

            if (!paymentData) {
                console.warn('Payment intent creation failed - lesson created but pending payment');
            }

            set({ isBooking: false });
            get().resetBooking();

            return { success: true, lessonId: lesson.id };
        } catch (error) {
            set({ error: 'Failed to confirm booking', isBooking: false });
            return { success: false };
        }
    },

    cancelBooking: async (lessonId) => {
        set({ isLoading: true, error: null });

        try {
            const success = await cancelLesson(lessonId);

            if (success) {
                // Remove from local state
                set((state) => ({
                    studentLessons: state.studentLessons.filter(l => l.id !== lessonId),
                    isLoading: false,
                }));
            }

            return success;
        } catch (error) {
            set({ error: 'Failed to cancel lesson', isLoading: false });
            return false;
        }
    },

    resetBooking: () => set({
        selectedDate: new Date(),
        selectedTime: null,
        selectedInstructor: null,
        availableSlots: [],
        error: null,
    }),

    clearError: () => set({ error: null }),
}));

// Re-export Instructor type for convenience
export type { Instructor };
