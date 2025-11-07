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
        {/* Header Section */}
        <View className="flex-1 justify-center">
          {/* <Text>Welcome Back!</Text> */}
          <View className="items-center mb-8">
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
        <Text>Sign in</Text>

        <TouchableOpacity onPress={onSignInPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Link href="/sign-up">
            <Text>Sign up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Page;
