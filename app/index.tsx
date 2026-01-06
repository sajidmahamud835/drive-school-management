import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle, Calendar, Shield, Smartphone, ChevronRight } from 'lucide-react-native';

export default function LandingPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

                {/* Navigation Bar */}
                <View style={{ paddingTop: insets.top + 10 }} className="px-6 flex-row justify-between items-center mb-8">
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-blue-600 rounded-xl items-center justify-center mr-2 shadow-sm">
                            <Text className="text-white font-bold text-xl">DS</Text>
                        </View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">DriveSchool</Text>
                    </View>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity className="bg-gray-100 dark:bg-slate-800 px-5 py-2.5 rounded-full border border-gray-200 dark:border-slate-700">
                            <Text className="font-semibold text-gray-900 dark:text-white">Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Hero Section */}
                <View className="px-6 mb-16">
                    <View className="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-6 self-start border border-blue-100 dark:border-blue-900/30">
                        <Text className="text-blue-600 dark:text-blue-400 font-bold px-2 text-sm uppercase tracking-wider">The Modern Way to Learn</Text>
                    </View>

                    <Text className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                        Master the Road with <Text className="text-blue-600">Confidence.</Text>
                    </Text>
                    <Text className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
                        Streamline your driving education. Book lessons, track progress, and manage your driving school – all in one platform.
                    </Text>

                    <View className="flex-row gap-4 mb-12">
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity className="bg-blue-600 px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/30 flex-row items-center">
                                <Text className="text-white font-bold text-lg mr-2">Get Started</Text>
                                <ChevronRight size={20} color="white" />
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-8 py-4 rounded-2xl items-center justify-center">
                            <Text className="text-gray-900 dark:text-white font-bold text-lg text-center">Learn More</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Hero Image / Abstract Visual */}
                    <View className="w-full h-64 md:h-96 bg-gray-100 dark:bg-slate-800 rounded-3xl overflow-hidden relative items-center justify-center border border-gray-100 dark:border-slate-700">
                        {/* Placeholder for a hero image */}
                        <View className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                        <View className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl flex-row items-center z-10 max-w-[80%]">
                            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                                <CheckCircle size={24} className="text-green-600" color="#16a34a" />
                            </View>
                            <View>
                                <Text className="font-bold text-gray-900 dark:text-white text-lg">License Obtained!</Text>
                                <Text className="text-gray-500 text-sm">Alex just passed the road test</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Features Grid */}
                <View className="px-6 py-12 bg-gray-50 dark:bg-slate-950/30">
                    <View className="mb-12 items-center">
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">Everything You Need</Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-center max-w-xl">
                            Whether you're a student, instructor, or business owner, we have the tools to help you succeed.
                        </Text>
                    </View>

                    <View className="flex-row flex-wrap gap-6 justify-center">
                        <FeatureCard
                            icon={Smartphone}
                            color="text-blue-600"
                            bg="bg-blue-100"
                            title="Mobile First"
                            desc="Book lessons and track progress on the go with our dedicated mobile app."
                        />
                        <FeatureCard
                            icon={Calendar}
                            color="text-purple-600"
                            bg="bg-purple-100"
                            title="Smart Scheduling"
                            desc="Real-time availability for stress-free booking and instructor management."
                        />
                        <FeatureCard
                            icon={Shield}
                            color="text-orange-600"
                            bg="bg-orange-100"
                            title="Secure Platform"
                            desc="Enterprise-grade security for your data, payments, and personal information."
                        />
                    </View>
                </View>

                {/* CTA Section */}
                <View className="px-6 py-16">
                    <View className="bg-blue-600 rounded-[40px] p-8 md:p-12 items-center shadow-2xl shadow-blue-600/20">
                        <Text className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Ready to Start Your Engines?</Text>
                        <Text className="text-blue-100 text-center mb-8 max-w-lg">Join thousands of students and instructors using DriveSchool today.</Text>
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity className="bg-white px-10 py-4 rounded-2xl">
                                <Text className="text-blue-600 font-bold text-lg">Get Started Now</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

                {/* Footer */}
                <View className="px-6 pb-10 items-center">
                    <Text className="text-gray-400 text-sm">© 2024 DriveSchool Management System. All rights reserved.</Text>
                </View>

            </ScrollView>
        </View>
    );
}

function FeatureCard({ icon: Icon, title, desc, color, bg }: { icon: any, title: string, desc: string, color: string, bg: string }) {
    return (
        <View className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 w-full md:w-[340px] shadow-sm">
            <View className={`w-14 h-14 ${bg} dark:bg-opacity-20 rounded-2xl items-center justify-center mb-6`}>
                <Icon size={28} className={color} color={color === 'text-blue-600' ? '#2563eb' : color === 'text-purple-600' ? '#9333ea' : '#ea580c'} />
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</Text>
            <Text className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {desc}
            </Text>
        </View>
    )
}
