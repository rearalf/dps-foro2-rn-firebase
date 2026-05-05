import useLogin from "@/hook/useLogin";
import styles from "@/styles/loginStyles";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    loading,
    googleLoading,
    error,
    googleError,
    handleSignInWithEmail,
    handleSignInWithGoogle,
  } = useLogin();

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
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor="#8A8F99"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contrasena</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#8A8F99"
              secureTextEntry
              style={styles.input}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {googleError ? (
            <Text style={styles.errorText}>{googleError}</Text>
          ) : null}

          <Pressable
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleSignInWithEmail}
            disabled={isLoading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Entrar con correo</Text>
            )}
          </Pressable>

          <Pressable
            style={[styles.googleButton, isLoading && styles.buttonDisabled]}
            onPress={handleSignInWithGoogle}
            disabled={isLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#e45733" />
            ) : (
              <Text style={styles.googleButtonText}>
                <Ionicons name="logo-google" size={18} color={"#e45733"} />
                {"   "}Entrar con Google
              </Text>
            )}
          </Pressable>

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
