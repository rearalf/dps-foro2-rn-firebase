import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-expense"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="add-income"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
