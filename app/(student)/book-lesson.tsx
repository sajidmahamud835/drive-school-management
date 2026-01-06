import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import clsx from 'clsx';
import { useBookingStore } from '../../store/useBookingStore';

const DATES = [
    { day: 'Mon', date: '14', full: '2023-10-14' },
    { day: 'Tue', date: '15', full: '2023-10-15' },
    { day: 'Wed', date: '16', full: '2023-10-16' },
    { day: 'Thu', date: '17', full: '2023-10-17' },
    { day: 'Fri', date: '18', full: '2023-10-18' },
    { day: 'Sat', date: '19', full: '2023-10-19' },
];

const TIME_SLOTS = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookLessonScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const {
        selectedDate, selectedTime, selectedInstructor, availableInstructors,
        setDate, setTime, setInstructor, confirmBooking, resetBooking, fetchAvailableInstructors
    } = useBookingStore();

    // Init with first date
    React.useEffect(() => {
        if (!selectedDate) setDate(new Date(DATES[1].full));
    }, []);

    const handleBook = async () => {
        const success = await confirmBooking();
        if (success) {
            alert('Booking Confirmed!');
            router.back();
            resetBooking();
        } else {
            alert('Please select a time and instructor');
        }
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-slate-900">
            <View style={{ paddingTop: insets.top }} className="bg-white dark:bg-slate-800 shadow-sm z-10">
                <View className="flex-row items-center px-4 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <ChevronLeft size={24} className="text-gray-900 dark:text-white" color="#333" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold ml-2 text-gray-900 dark:text-white">Book Lesson</Text>
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Date Selection */}
                <View className="mt-6 px-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Date</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
                        {DATES.map((item) => {
                            const isSelected = selectedDate ? selectedDate.toISOString().split('T')[0] === item.full : false;
                            return (
                                <TouchableOpacity
                                    key={item.full}
                                    onPress={() => setDate(new Date(item.full))}
                                    className={clsx(
                                        "mr-4 items-center justify-center w-16 h-20 rounded-2xl border",
                                        isSelected ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/30" : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                                    )}
                                >
                                    <Text className={clsx("text-sm mb-1", isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400")}>{item.day}</Text>
                                    <Text className={clsx("text-xl font-bold", isSelected ? "text-white" : "text-gray-900 dark:text-white")}>{item.date}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Time Selection */}
                <View className="mt-8 px-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Available Slots</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {TIME_SLOTS.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                                <TouchableOpacity
                                    key={time}
                                    onPress={() => setTime(time)}
                                    className={clsx(
                                        "px-4 py-3 rounded-xl border w-[46%]",
                                        isSelected ? "bg-blue-600 border-blue-600" : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                                    )}
                                >
                                    <Text className={clsx("text-center font-medium", isSelected ? "text-white" : "text-gray-700 dark:text-gray-200")}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Instructor Selection (Mock) */}
                <View className="mt-8 px-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Instructor</Text>
                    {/* Render Mock Instructor options if available or just one for placeholder */}
                    <TouchableOpacity
                        onPress={() => setInstructor({ id: 'i1', name: 'Sarah Wilson', rating: 4.9, vehicle: 'Toyota Corolla', availability: [] })}
                        className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border ${selectedInstructor?.id === 'i1' ? 'border-blue-600' : 'border-gray-200 dark:border-slate-700'} flex-row items-center justify-between`}
                    >
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                            <View>
                                <Text className="font-bold text-gray-900 dark:text-white">{selectedInstructor?.name || 'Select Instructor'}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">Toyota Corolla (Auto)</Text>
                            </View>
                        </View>
                        {selectedInstructor && <CheckCircle size={24} color="#2563eb" className="text-blue-600" />}
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 p-6 border-t border-gray-100 dark:border-slate-700" style={{ paddingBottom: insets.bottom + 10 }}>
                <TouchableOpacity
                    onPress={handleBook}
                    className="bg-blue-600 w-full py-4 rounded-xl items-center shadow-lg shadow-blue-600/20"
                >
                    <Text className="text-white font-bold text-lg">Confirm Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
