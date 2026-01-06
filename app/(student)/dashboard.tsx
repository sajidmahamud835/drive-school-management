import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Calendar, ChevronRight, Clock, MapPin, User, Star } from 'lucide-react-native';

export default function StudentDashboard() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-gray-50 dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header */}
                <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-6 bg-white dark:bg-slate-800 rounded-b-[30px] shadow-sm">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
                                <User size={24} className="text-blue-600 dark:text-blue-400" color="#2563eb" />
                            </View>
                            <View>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">Welcome back,</Text>
                                <Text className="text-xl font-bold text-gray-900 dark:text-white">Alex Johnson</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full items-center justify-center">
                            <Bell size={20} className="text-gray-600 dark:text-gray-300" color="#475569" />
                            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Cards */}
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-600/20">
                            <Text className="text-blue-100 text-xs mb-1">Hours Completed</Text>
                            <Text className="text-3xl font-bold text-white">12<Text className="text-lg opacity-80">/40</Text></Text>
                        </View>
                        <View className="flex-1 bg-white dark:bg-slate-700 p-4 rounded-2xl border border-gray-100 dark:border-slate-600 shadow-sm">
                            <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">Upcoming</Text>
                            <Text className="text-2xl font-bold text-gray-900 dark:text-white">2 <Text className="text-sm font-normal text-gray-500">lessons</Text></Text>
                        </View>
                    </View>
                </View>

                <View className="px-6 mt-6">

                    {/* Action Buttons */}
                    <View className="flex-row gap-4 mb-8">
                        <TouchableOpacity className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl items-center shadow-sm border border-gray-100 dark:border-slate-700">
                            <View className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl items-center justify-center mb-2">
                                <Calendar size={24} color="#6366f1" />
                            </View>
                            <Text className="font-semibold text-gray-900 dark:text-white">Book Lesson</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl items-center shadow-sm border border-gray-100 dark:border-slate-700">
                            <View className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl items-center justify-center mb-2">
                                <MapPin size={24} color="#f97316" />
                            </View>
                            <Text className="font-semibold text-gray-900 dark:text-white">Routes</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Upcoming Lesson */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Next Lesson</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600 dark:text-blue-400 font-medium">See all</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <View className="flex-row justify-between items-start mb-4">
                            <View>
                                <Text className="font-bold text-lg text-gray-900 dark:text-white">Practical Driving</Text>
                                <Text className="text-gray-500 dark:text-gray-400">with Sarah Wilson</Text>
                            </View>
                            <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                                <Text className="text-green-700 dark:text-green-400 text-xs font-bold uppercase">Confirmed</Text>
                            </View>
                        </View>

                        <View className="space-y-3">
                            <View className="flex-row items-center">
                                <Calendar size={18} color="#94a3b8" />
                                <Text className="ml-3 text-gray-700 dark:text-gray-300">Tomorrow, 15 Oct</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Clock size={18} color="#94a3b8" />
                                <Text className="ml-3 text-gray-700 dark:text-gray-300">10:00 AM - 12:00 PM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <MapPin size={18} color="#94a3b8" />
                                <Text className="ml-3 text-gray-700 dark:text-gray-300">Downtown Training Center</Text>
                            </View>
                        </View>

                        <TouchableOpacity className="mt-5 w-full bg-gray-50 dark:bg-slate-700 py-3 rounded-xl items-center border border-gray-200 dark:border-slate-600">
                            <Text className="font-semibold text-gray-700 dark:text-gray-200">Reschedule / Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recent Progress */}
                    <View className="flex-row justify-between items-center mt-8 mb-4">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Recent Progress</Text>
                    </View>

                    <View className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mr-4">
                                <Star size={24} color="#9333ea" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 dark:text-white">Parallel Parking</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-xs">Passed on 12 Oct</Text>
                            </View>
                            <View className="flex-row">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} color="#fbbf24" fill="#fbbf24" style={{ marginLeft: 2 }} />
                                ))}
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
