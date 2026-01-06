import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold mb-4">Login</Text>
            <Link href="/(student)/dashboard" className="p-4 bg-blue-500 rounded-lg">
                <Text className="text-white">Login as Student</Text>
            </Link>
            <Link href="/(instructor)/dashboard" className="p-4 bg-green-500 rounded-lg mt-4">
                <Text className="text-white">Login as Instructor</Text>
            </Link>
            <Link href="/(admin)/dashboard" className="p-4 bg-gray-800 rounded-lg mt-4">
                <Text className="text-white">Login as Admin</Text>
            </Link>
        </View>
    );
}
