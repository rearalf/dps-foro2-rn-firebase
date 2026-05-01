import styles from "@/styles/addExpenseStyles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpenseScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo gasto</Text>
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
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Categoria</Text>
            <TextInput
              placeholder="Comida, transporte..."
              placeholderTextColor="#8A8F99"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Descripcion</Text>
            <TextInput
              placeholder="Detalle del gasto"
              placeholderTextColor="#8A8F99"
              multiline
              numberOfLines={3}
              style={[styles.input, styles.inputArea]}
            />
          </View>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Guardar gasto</Text>
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
