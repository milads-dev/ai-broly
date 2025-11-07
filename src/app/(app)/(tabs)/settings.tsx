import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

type Props = {};

const Page = (props: Props) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center py-11">
      <Text>Settings Page</Text>
      <Link href="/login" push asChild>
        <Button title="Go to Home" />
      </Link>
    </SafeAreaView>
  );
};

export default Page;
