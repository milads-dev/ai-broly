import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
  emailAddress: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
};

const SignUpForm: React.FC<Props> = ({
  emailAddress,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 p-6">
      <View className="flex-1 justify-center">
        {/* Header Section */}
        <View className="items-center mb-6">
          <View className="justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-2xl w-30 h-30">
            <Ionicons name="fitness" size={75} color="white" />
          </View>
          <Text className="mb-2 font-bold text-gray-900 text-3xl">
            Join AI BROLY
          </Text>
          <Text className="text-gray-900 text-lg text-center">
            Start your fitness journey{"\n"}and achieve your goals
          </Text>
        </View>

        {/* Form Card */}
        <View className="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
          <Text className="mb-4 font-medium text-gray-700 text-2xl text-center">
            Create your Account
          </Text>

          {/* Email Field */}
          <View className="mb-4">
            <Text className="mb-2 font-medium text-gray-700 text-sm">
              Email
            </Text>
            <View className="flex-row items-center bg-gray-50 p-4 border-gray-200 rounded-xl">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900"
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                onChangeText={onEmailChange}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Password Field */}
          <View className="mb-6">
            <Text className="mb-2 font-medium text-gray-700 text-sm">
              Password
            </Text>
            <View className="flex-row items-center bg-gray-50 p-4 border-gray-200 rounded-xl">
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900"
                value={password}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                onChangeText={onPasswordChange}
                editable={!isLoading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            <Text className="mt-1 text-gray-500 text-xs">
              Must be at least 8 characters long
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={onSubmit}
            className={`rounded-xl py-4 shadow-sm mb-4 ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            }`}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <View className="flex-row justify-center items-center">
              {isLoading ? (
                <Ionicons name="refresh" size={20} color="white" />
              ) : (
                <Ionicons name="person-add-outline" size={20} color="white" />
              )}
              <Text className="ml-2 font-semibold text-white text-lg">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </View>
          </TouchableOpacity>

          <Text className="text-gray-600 text-xs text-center">
            By signing up, you agree to our Terms & Conditions and Privacy
            Policy.
          </Text>
        </View>

        {/* Sign-in Link */}
        <View className="flex-row justify-center items-center mt-6">
          <Text>Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="font-semibold text-blue-600">Sign in</Text>
          </Link>
        </View>
      </View>

      <Text className="pb-6 text-gray-500 text-xs text-center">
        © AI BROLY. All rights reserved.
      </Text>
    </View>
  );
};

export default SignUpForm;
