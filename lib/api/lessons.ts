import { supabase, Lesson } from '../supabase';

interface CreateLessonData {
    student_id: string;
    instructor_id: string;
    scheduled_at: string;
    duration_minutes?: number;
}

/**
 * Create a new lesson booking
 */
export async function createLesson(data: CreateLessonData): Promise<Lesson | null> {
    const { data: lesson, error } = await supabase
        .from('lessons')
        .insert({
            ...data,
            duration_minutes: data.duration_minutes || 60,
            status: 'pending',
            payment_status: 'pending',
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating lesson:', error);
        return null;
    }

    return lesson;
}

/**
 * Get all lessons for a student
 */
export async function getStudentLessons(studentId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select(`
      *,
      instructor:instructors(
        *,
        profile:profiles(name, avatar_url)
      )
    `)
        .eq('student_id', studentId)
        .order('scheduled_at', { ascending: false });

    if (error) {
        console.error('Error fetching student lessons:', error);
        return [];
    }

    return data || [];
}

/**
 * Get all lessons for an instructor
 */
export async function getInstructorLessons(instructorId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select(`
      *,
      student:profiles!lessons_student_id_fkey(name, avatar_url, email)
    `)
        .eq('instructor_id', instructorId)
        .order('scheduled_at', { ascending: true });

    if (error) {
        console.error('Error fetching instructor lessons:', error);
        return [];
    }

    return data || [];
}

/**
 * Update lesson status
 */
export async function updateLessonStatus(
    lessonId: string,
    status: Lesson['status']
): Promise<Lesson | null> {
    const { data, error } = await supabase
        .from('lessons')
        .update({ status })
        .eq('id', lessonId)
        .select()
        .single();

    if (error) {
        console.error('Error updating lesson status:', error);
        return null;
    }

    return data;
}

/**
 * Update payment status after Stripe payment
 */
export async function updatePaymentStatus(
    lessonId: string,
    paymentStatus: Lesson['payment_status'],
    stripePaymentId?: string
): Promise<Lesson | null> {
    const updates: Partial<Lesson> = { payment_status: paymentStatus };
    if (stripePaymentId) {
        updates.stripe_payment_id = stripePaymentId;
    }
    if (paymentStatus === 'paid') {
        updates.status = 'confirmed';
    }

    const { data, error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', lessonId)
        .select()
        .single();

    if (error) {
        console.error('Error updating payment status:', error);
        return null;
    }

    return data;
}

/**
 * Cancel a lesson
 */
export async function cancelLesson(lessonId: string): Promise<boolean> {
    const { error } = await supabase
        .from('lessons')
        .update({ status: 'cancelled' })
        .eq('id', lessonId);

    if (error) {
        console.error('Error cancelling lesson:', error);
        return false;
    }

    return true;
}
