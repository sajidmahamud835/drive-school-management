import { supabase, Instructor, Availability } from '../supabase';

/**
 * Get all active instructors with their profiles
 */
export async function getInstructors(): Promise<Instructor[]> {
    const { data, error } = await supabase
        .from('instructors')
        .select(`
      *,
      profile:profiles(*)
    `)
        .order('rating', { ascending: false });

    if (error) {
        console.error('Error fetching instructors:', error);
        return [];
    }

    return data || [];
}

/**
 * Get a single instructor by ID
 */
export async function getInstructor(id: string): Promise<Instructor | null> {
    const { data, error } = await supabase
        .from('instructors')
        .select(`
      *,
      profile:profiles(*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching instructor:', error);
        return null;
    }

    return data;
}

/**
 * Get instructor's availability schedule
 */
export async function getInstructorAvailability(instructorId: string): Promise<Availability[]> {
    const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('instructor_id', instructorId)
        .order('day_of_week', { ascending: true });

    if (error) {
        console.error('Error fetching availability:', error);
        return [];
    }

    return data || [];
}

/**
 * Get available time slots for an instructor on a specific date
 */
export async function getAvailableSlots(instructorId: string, date: Date): Promise<string[]> {
    const dayOfWeek = date.getDay();

    // Get instructor's availability for this day
    const { data: availability, error: availError } = await supabase
        .from('availability')
        .select('start_time, end_time')
        .eq('instructor_id', instructorId)
        .eq('day_of_week', dayOfWeek);

    if (availError || !availability?.length) {
        return [];
    }

    // Get booked lessons for this date
    const dateStr = date.toISOString().split('T')[0];
    const { data: bookedLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('scheduled_at, duration_minutes')
        .eq('instructor_id', instructorId)
        .gte('scheduled_at', `${dateStr}T00:00:00`)
        .lte('scheduled_at', `${dateStr}T23:59:59`)
        .neq('status', 'cancelled');

    if (lessonsError) {
        console.error('Error fetching booked lessons:', lessonsError);
        return [];
    }

    // Generate available slots (1-hour intervals)
    const slots: string[] = [];
    const bookedTimes = new Set(
        (bookedLessons || []).map(l => new Date(l.scheduled_at).toISOString().slice(11, 16))
    );

    for (const av of availability) {
        const startHour = parseInt(av.start_time.split(':')[0]);
        const endHour = parseInt(av.end_time.split(':')[0]);

        for (let hour = startHour; hour < endHour; hour++) {
            const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
            if (!bookedTimes.has(timeSlot)) {
                slots.push(timeSlot);
            }
        }
    }

    return slots;
}
