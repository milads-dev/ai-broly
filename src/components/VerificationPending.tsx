import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  emailAddress: string;
};

const VerificationPending: React.FC<Props> = ({ emailAddress }) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4 rounded-2xl w-20 h-20">
        <Ionicons name="mail" size={40} color="white" />
      </View>
      <Text className="mb-2 font-bold text-gray-900 text-3xl text-center">
        Check Your Email
      </Text>
      <Text className="text-gray-600 text-lg text-center">
        We have sent a verification code to{"\n"}
        {emailAddress}
      </Text>
    </View>
  );
};

export default VerificationPending;
