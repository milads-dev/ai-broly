import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Page = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      {/* [#1F1F1F] */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-6">
          {/* Header Section */}
          <View className="flex-1 justify-center">
            {/* <Text>Welcome Back!</Text> */}
            <View className="items-center mb-1">
              <View className="justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4 rounded-2xl w-30 h-30">
                <Ionicons name="fitness" size={75} color="white" />
              </View>
              <Text className="mb-2 font-bold text-gray-900 text-3xl">
                AI Broly
              </Text>
              <Text className="text-gray-600 text-lg text-center">
                Your fitness journey continues here.
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View className="bg-white shadow-sm mb-6 p-6 border border-gray-100 rounded-2xl">
            <Text className="mb-2 font-medium text-gray-700 text-2xl text-center">
              Welcome Back
            </Text>

            {/* Email Field */}
            <View>
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
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  editable={!isLoading}
                />
              </View>
              {/* Password Field */}
              <View className="mb-6">
                <Text className="mb-2 font-medium text-gray-700 text-sm">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-50 p-4 border-gray-200 rounded-xl">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6B7280"
                  />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900"
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Actions Section */}
          <TouchableOpacity
            onPress={onSignInPress}
            className={`rounded-xl py-4 mb-4 shadow-sm ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            }`}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <View className="flex-row justify-center items-center">
              {isLoaded ? (
                <Ionicons name="log-in-outline" size={20} color="white" />
              ) : (
                <Ionicons name="refresh-outline" size={20} color="white" />
              )}
              <Text className="ml-2 font-semibold text-white text-lg">
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-4">
            <View className="flex-1 bg-gray-300 h-px" />
            <Text className="mx-4 text-gray-500 text-sm">OR</Text>
            <View className="flex-1 bg-gray-300 h-px" />
          </View>
          <GoogleSignInButton />

          <View className="items-center pt-8">
            <Link href="/sign-up">
              <Text>Don't have an account? Sign Up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Page;
