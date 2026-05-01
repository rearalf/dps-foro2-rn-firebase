import styles from "@/styles/loginStyles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.backgroundOrbTop} />
      <View style={styles.backgroundOrbBottom} />

      <View style={styles.container}>
        <View style={styles.brandBlock}>
          <Text style={styles.appName}>Fluxo</Text>
          <Text style={styles.subtitle}>
            Controla ingresos y gastos sin complicarte.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Iniciar sesion</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Correo</Text>
            <TextInput
              placeholder="tu@email.com"
              placeholderTextColor="#8A8F99"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contrasena</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#8A8F99"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Link href="/(tabs)/dashboard" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Entrar al dashboard</Text>
            </Pressable>
          </Link>

          <View style={styles.footerLine}>
            <Text style={styles.footerText}>No tienes cuenta?</Text>
            <Link href="/signup" style={styles.footerLink}>
              Crear una
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
