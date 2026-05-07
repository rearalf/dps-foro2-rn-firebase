import useProfile from "@/hook/useProfile";
import styles from "@/styles/profileStyles";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilTabScreen() {
  const {
    user,
    displayName,
    currentPassword,
    newPassword,
    confirmNewPassword,
    isProcessing,
    error,
    success,
    userInitials,
    setDisplayName,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    handleLogout,
    handleUpdateDisplayName,
    handleChangePassword,
    handleDeleteAccount,
  } = useProfile();

  const handleConfirmDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Esta acción es irreversible. ¿Deseas continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            handleDeleteAccount();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil y seguridad</Text>
        <Text style={styles.subtitle}>
          Administra tu cuenta desde esta pantalla
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <Text style={styles.name}>{user?.displayName || "Usuario"}</Text>
          <Text style={styles.email}>{user?.email || "Sin correo"}</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Editar nombre de usuario</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={displayName}
              onChangeText={setDisplayName}
              editable={!isProcessing}
              autoCapitalize="words"
            />
          </View>
          <Pressable
            style={[
              styles.primaryButton,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={handleUpdateDisplayName}
            disabled={isProcessing}
          >
            <Text style={styles.primaryButtonText}>Guardar nombre</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Cambiar contrasena</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contrasena actual</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contrasena actual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              editable={!isProcessing}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Nueva contrasena</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimo 6 caracteres"
              value={newPassword}
              onChangeText={setNewPassword}
              editable={!isProcessing}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Confirmar nueva contrasena</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite la nueva contrasena"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              editable={!isProcessing}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={handleChangePassword}
            disabled={isProcessing}
          >
            <Text style={styles.primaryButtonText}>Actualizar contrasena</Text>
          </Pressable>
        </View>

        <View style={styles.dangerCard}>
          <Text style={styles.sectionTitle}>Zona de peligro</Text>
          <Text style={styles.dangerHint}>
            Para eliminar tu cuenta, se usara la contrasena actual para validar
            la operación.
          </Text>

          <Pressable
            style={[styles.deleteButton, isProcessing && styles.buttonDisabled]}
            onPress={handleConfirmDeleteAccount}
            disabled={isProcessing}
          >
            <Text style={styles.deleteText}>Eliminar cuenta</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.logoutButton, isProcessing && styles.buttonDisabled]}
          onPress={handleLogout}
          disabled={isProcessing}
        >
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
