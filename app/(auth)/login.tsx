import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen() {
    const { login, isLoading } = useAuthStore();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'student' | 'instructor' | 'admin'>('student');

    const handleLogin = async () => {
        try {
            await login(role);
            if (role === 'student') router.replace('/(student)/dashboard');
            if (role === 'instructor') router.replace('/(instructor)/dashboard');
            if (role === 'admin') router.replace('/(admin)/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }} className="flex-1 px-6 justify-center">

                    {/* Header */}
                    <View className="items-center mb-10">
                        <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
                            <Text className="text-4xl font-bold text-white">DS</Text>
                        </View>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center">Welcome Back</Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">Sign in to continue your journey</Text>
                    </View>

                    {/* Role Selector (Mock) */}
                    <View className="flex-row justify-center mb-8 bg-gray-200 dark:bg-slate-800 p-1 rounded-xl">
                        {['student', 'instructor', 'admin'].map((r) => (
                            <TouchableOpacity
                                key={r}
                                onPress={() => setRole(r as any)}
                                className={`px-4 py-2 rounded-lg ${role === r ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                            >
                                <Text className={`capitalize ${role === r ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {r}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Form */}
                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2 ml-1">Email Address</Text>
                            <View className="flex-row items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 h-14 focus:border-blue-500">
                                <Mail size={20} color="#94a3b8" />
                                <TextInput
                                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                                    placeholder="name@example.com"
                                    placeholderTextColor="#94a3b8"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View>
                            <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2 ml-1">Password</Text>
                            <View className="flex-row items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 h-14">
                                <Lock size={20} color="#94a3b8" />
                                <TextInput
                                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                                    placeholder="Enter your password"
                                    placeholderTextColor="#94a3b8"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#94a3b8" />}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity className="self-end mt-2">
                                <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm">Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={isLoading}
                            className={`bg-blue-600 h-14 rounded-xl items-center justify-center flex-row shadow-lg shadow-blue-600/30 mt-4 ${isLoading ? 'opacity-70' : ''}`}
                        >
                            <Text className="text-white font-bold text-lg mr-2">{isLoading ? 'Signing In...' : 'Sign In'}</Text>
                            {!isLoading && <ArrowRight size={20} color="white" />}
                        </TouchableOpacity>

                    </View>

                    {/* Footer */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-500 dark:text-gray-400">Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600 dark:text-blue-400 font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
