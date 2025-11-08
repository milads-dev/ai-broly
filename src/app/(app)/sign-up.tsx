import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setLoading] = React.useState(false);

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 p-6">
          <View className="flex-1 justify-center">
            <View className="items-center mb-6">
              <View className="justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg rounded-2xl w-30 h-30">
                <Ionicons name="fitness" size={75} color="white" />
              </View>
              <Text className="mb-2 font-bold text-gray-900 text-3xl">
                Join AI BROLY
              </Text>
              <Text className="text-gray-900 text-lg text-center">
                Start your fitness journey{"\n"} and achieve your goals
              </Text>
            </View>
            <View className="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
              <Text className="mb-4 font-medium text-gray-700 text-2xl text-center">
                Create your Account
              </Text>
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
                    onChangeText={(emailAddress) =>
                      setEmailAddress(emailAddress)
                    }
                    editable={!isLoading}
                  />
                </View>
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
                  <Text className="mt-1 text-gray-500 text-xs">
                    Must be at least 8 characters long
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onSignUpPress}
                  className={`rounded-xl py-4 shadown-sm mb-4 ${
                    isLoading ? "bg-gray-400" : "bg-blue-600"
                  }`}
                  activeOpacity={0.8}
                  disabled={isLoading}
                >
                  <View className="flex-row justify-center items-center">
                    {isLoading ? (
                      <Ionicons name="refresh" size={20} color="white" />
                    ) : (
                      <Ionicons
                        name="person-add-outline"
                        size={20}
                        color="white"
                      />
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
            </View>
            <View className="flex-row justify-center items-center mt-6">
              <Text>Already have an account? </Text>
              <Link href="/sign-in">
                <Text className="font-semibold text-blue-600">Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
        <Text className="pb-6 text-gray-500 text-xs text-center">
          © AI BROLY. All rights reserved.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
