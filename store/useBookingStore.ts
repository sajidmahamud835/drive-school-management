import { create } from 'zustand';

export interface Instructor {
    id: string;
    name: string;
    rating: number;
    vehicle: string;
    image?: string;
    availability: string[]; // e.g., ["10:00", "14:00"]
}

interface BookingState {
    selectedDate: Date;
    selectedTime: string | null;
    selectedInstructor: Instructor | null;
    availableInstructors: Instructor[];

    // Actions
    setDate: (date: Date) => void;
    setTime: (time: string) => void;
    setInstructor: (instructor: Instructor) => void;
    fetchAvailableInstructors: (date: Date) => Promise<void>;
    confirmBooking: () => Promise<boolean>;
    resetBooking: () => void;
}

// Mock Instructors
const MOCK_INSTRUCTORS: Instructor[] = [
    { id: 'i1', name: 'Mike Wilson', rating: 4.9, vehicle: 'Toyota Corolla 2023', availability: ['09:00', '10:00', '14:00'] },
    { id: 'i2', name: 'Sarah Connor', rating: 4.8, vehicle: 'Honda Civic 2022', availability: ['11:00', '13:00', '15:00'] },
    { id: 'i3', name: 'John Doe', rating: 4.7, vehicle: 'Tesla Model 3', availability: ['09:00', '16:00'] },
];

export const useBookingStore = create<BookingState>((set, get) => ({
    selectedDate: new Date(),
    selectedTime: null,
    selectedInstructor: null,
    availableInstructors: [],

    setDate: (date) => {
        set({ selectedDate: date, selectedTime: null, selectedInstructor: null });
        get().fetchAvailableInstructors(date);
    },

    setTime: (time) => set({ selectedTime: time }),

    setInstructor: (instructor) => set({ selectedInstructor: instructor }),

    fetchAvailableInstructors: async (date) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Randomly filter instructors to simulate availability
        const available = MOCK_INSTRUCTORS.filter(() => Math.random() > 0.3);
        set({ availableInstructors: available });
    },

    confirmBooking: async () => {
        const { selectedDate, selectedTime, selectedInstructor } = get();
        if (!selectedTime || !selectedInstructor) return false;

        // Simulate API Booking
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Booking Confirmed: ${selectedInstructor.name} on ${selectedDate.toDateString()} at ${selectedTime}`);

        return true;
    },

    resetBooking: () => set({
        selectedDate: new Date(),
        selectedTime: null,
        selectedInstructor: null,
        availableInstructors: []
    })
}));
