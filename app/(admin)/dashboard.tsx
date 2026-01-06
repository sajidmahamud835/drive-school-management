import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, Car, DollarSign, TrendingUp, Settings } from 'lucide-react-native';

const STATS = [
    { title: 'Students', value: '124', icon: Users, color: 'bg-blue-500' },
    { title: 'Instructors', value: '12', icon: User, color: 'bg-indigo-500' },
    { title: 'Vehicles', value: '8', icon: Car, color: 'bg-orange-500' },
    { title: 'Revenue', value: '$12.4k', icon: DollarSign, color: 'bg-green-500' },
];

export default function AdminDashboard() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-gray-50 dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header */}
                <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-6 bg-white dark:bg-slate-800 rounded-b-[30px] shadow-sm mb-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</Text>
                        <TouchableOpacity className="p-2 bg-gray-100 dark:bg-slate-700 rounded-full">
                            <Settings size={24} className="text-gray-600 dark:text-gray-300" color="#475569" />
                        </TouchableOpacity>
                    </View>

                    {/* Grid Stats */}
                    <View className="flex-row flex-wrap gap-4">
                        {STATS.map((stat) => (
                            <View key={stat.title} className="w-[47%] bg-gray-50 dark:bg-slate-700 p-4 rounded-2xl border border-gray-100 dark:border-slate-600">
                                <View className={`w-10 h-10 ${stat.color} rounded-xl items-center justify-center mb-3 shadow-sm`}>
                                    <stat.icon size={20} color="white" />
                                </View>
                                <Text className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-xs">{stat.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="px-6 mb-8">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Management</Text>
                    <View className="gap-3">
                        <TouchableOpacity className="bg-white dark:bg-slate-800 p-4 rounded-xl flex-row items-center border border-gray-100 dark:border-slate-700">
                            <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
                                <Users size={20} className="text-blue-600" color="#2563eb" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 dark:text-white">Manage Users</Text>
                                <Text className="text-gray-500 text-xs">Add, remove or edit accounts</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white dark:bg-slate-800 p-4 rounded-xl flex-row items-center border border-gray-100 dark:border-slate-700">
                            <View className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full items-center justify-center mr-4">
                                <Car size={20} className="text-orange-600" color="#ea580c" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 dark:text-white">Fleet Management</Text>
                                <Text className="text-gray-500 text-xs">Track vehicle status</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

// Helper mock
import { User } from 'lucide-react-native';
