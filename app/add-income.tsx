import useAddIncome from "@/hook/useAddIncome";
import styles from "@/styles/addIncomeStyles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddIncomeScreen() {
  const {
    monto,
    fuente,
    descripcion,
    error,
    isLoading,
    handleSave,
    handleMonto,
    setFuente,
    setDescripcion,
  } = useAddIncome();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo ingreso</Text>
          <Link href="/(tabs)/dashboard" style={styles.closeLink}>
            Cerrar
          </Link>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Monto</Text>
            <TextInput
              placeholder="$0.00"
              placeholderTextColor="#8A8F99"
              keyboardType="numeric"
              style={styles.input}
              value={monto}
              onChangeText={handleMonto}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Fuente</Text>
            <TextInput
              placeholder="Sueldo, freelance..."
              placeholderTextColor="#8A8F99"
              style={styles.input}
              value={fuente}
              onChangeText={setFuente}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Descripcion</Text>
            <TextInput
              placeholder="Detalle del ingreso"
              placeholderTextColor="#8A8F99"
              multiline
              numberOfLines={3}
              style={[styles.input, styles.inputArea]}
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={styles.primaryButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.primaryButtonText}>
              {isLoading ? "Guardando..." : "Guardar ingreso"}
            </Text>
          </Pressable>

          <Link href="/(tabs)/dashboard" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Cancelar</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
