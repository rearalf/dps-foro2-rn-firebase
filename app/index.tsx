import useAuthSessionStore from "@/store/useAuthSessionStore";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const sessionUser = useAuthSessionStore((state) => state.user);
  const isHydrated = useAuthSessionStore((state) => state.isHydrated);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1F7A6F" />
      </View>
    );
  }

  return <Redirect href={sessionUser ? "/(tabs)/dashboard" : "/login"} />;
}
