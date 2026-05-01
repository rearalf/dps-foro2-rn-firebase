import styles from "@/styles/profileStyles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilTabScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Administra tus datos y preferencias</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VV</Text>
          </View>
          <Text style={styles.name}>Valeria Vargas</Text>
          <Text style={styles.email}>valeria@email.com</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Movimientos</Text>
            <Text style={styles.statValue}>128</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Categorias</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Editar perfil</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Metas de ahorro</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Notificaciones</Text>
          </Pressable>
        </View>

        <Link href="/login" asChild>
          <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar sesion</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
