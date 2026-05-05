import useSignUp from "@/hook/useSignup";
import styles from "@/styles/signupStyles";
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

export default function SignupScreen() {
  const {
    name,
    error,
    googleError,
    email,
    isLoading,
    loading,
    googleLoading,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleCreateWithSignInEmailPassword,
    handleSignInWithGoogle,
  } = useSignUp();

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
              value={name}
              onChangeText={setName}
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
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contrasena</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#8A8F99"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Confirmar contrasena</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#8A8F99"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {googleError ? (
            <Text style={styles.errorText}>{googleError}</Text>
          ) : null}

          <Pressable
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleCreateWithSignInEmailPassword}
            disabled={isLoading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                Crear cuenta y continuar
              </Text>
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
                {"   "}Continuar con Google
              </Text>
            )}
          </Pressable>

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
