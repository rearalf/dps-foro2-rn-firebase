import styles from "@/styles/signupStyles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.gridPattern} />

      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Empieza a registrar cada ingreso y gasto desde hoy.
        </Text>

        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Nombre</Text>
            <TextInput
              placeholder="Tu nombre"
              placeholderTextColor="#8A8F99"
              style={styles.input}
            />
          </View>

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

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Confirmar contrasena</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#8A8F99"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Link href="/(tabs)/dashboard" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                Crear cuenta y continuar
              </Text>
            </Pressable>
          </Link>

          <View style={styles.footerLine}>
            <Text style={styles.footerText}>Ya tienes cuenta?</Text>
            <Link href="/login" style={styles.footerLink}>
              Iniciar sesion
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
