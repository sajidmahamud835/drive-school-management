import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react-native';

const TODAY_LESSONS = [
    { id: 1, time: '09:00 AM - 11:00 AM', student: 'Alex Johnson', type: 'Practical Driving', location: 'Downtown', status: 'upcoming' },
    { id: 2, time: '01:00 PM - 03:00 PM', student: 'Emily Davis', type: 'Parking Maneuvers', location: 'Training Ground', status: 'pending' },
    { id: 3, time: '04:00 PM - 06:00 PM', student: 'Michael Brown', type: 'Highway Driving', location: 'Route 66', status: 'completed' },
];

export default function InstructorDashboard() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-gray-50 dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header */}
                <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-6 bg-white dark:bg-slate-800 rounded-b-[30px] shadow-sm mb-6">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm">Instructor Portal</Text>
                            <Text className="text-2xl font-bold text-gray-900 dark:text-white">Sarah Wilson</Text>
                        </View>
                        <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs uppercase">Online</Text>
                        </View>
                    </View>

                    <View className="flex-row mt-6 gap-4">
                        <View className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <Text className="text-blue-600 dark:text-blue-400 font-bold text-2xl">5.0</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs">Rating</Text>
                        </View>
                        <View className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-800">
                            <Text className="text-purple-600 dark:text-purple-400 font-bold text-2xl">8 hrs</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs">Today</Text>
                        </View>
                    </View>
                </View>

                {/* Schedule */}
                <View className="px-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Schedule</Text>

                    {TODAY_LESSONS.map((lesson) => (
                        <View key={lesson.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4">
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                                    <Text className="text-gray-600 dark:text-gray-300 font-medium text-xs">{lesson.time}</Text>
                                </View>
                                {lesson.status === 'completed' ? (
                                    <CheckCircle size={20} className="text-green-500" color="#22c55e" />
                                ) : (
                                    <View className="w-3 h-3 bg-blue-500 rounded-full" />
                                )}
                            </View>

                            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">{lesson.student}</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-4">{lesson.type}</Text>

                            <View className="flex-row items-center mb-4">
                                <MapPin size={16} className="text-gray-400" color="#94a3b8" />
                                <Text className="text-gray-500 dark:text-gray-400 text-sm ml-2">{lesson.location}</Text>
                            </View>

                            {lesson.status !== 'completed' && (
                                <View className="flex-row gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                                    <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-xl items-center">
                                        <Text className="text-white font-bold">Start Lesson</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl items-center justify-center border border-red-100 dark:border-red-800">
                                        <XCircle size={24} className="text-red-500" color="#ef4444" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
