import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1F7A6F",
        tabBarInactiveTintColor: "#7B8794",
        tabBarStyle: {
          height: 86,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: "#E3E8EF",
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="record"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>
              <FontAwesomeFreeSolid name="rotate-left" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>
              {" "}
              <FontAwesomeFreeSolid name="home" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>
              <FontAwesomeFreeSolid name="user" />
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
