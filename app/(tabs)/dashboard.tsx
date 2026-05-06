import useDashboard from "@/hook/useDashboard";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/dashboardStyles";

export default function DashboardScreen() {
  const {
    user,
    error,
    isLoading,
    transactions,
    formattedBalance,
    formattedIncome,
    formattedExpense,
    handleLogout,
    handleGetRecentTransactions,
  } = useDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleGetRecentTransactions}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.displayName}</Text>
            <Text style={styles.subtitle}>Resumen financiero de este mes</Text>
          </View>
          <Pressable onPress={handleLogout}>
            <Text style={styles.logoutLink}>
              Cerrar sessión{" "}
              <FontAwesomeFreeSolid
                name="arrow-right-from-bracket"
                color={styles.logoutLink.color}
              />
            </Text>
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance actual</Text>
          <Text style={styles.balanceAmount}>{formattedBalance}</Text>

          <View style={styles.kpiRow}>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiTitle}>Ingresos</Text>
              <Text style={[styles.kpiValue, styles.incomeColor]}>
                +{formattedIncome}
              </Text>
            </View>

            <View style={styles.kpiDivider} />

            <View style={styles.kpiBox}>
              <Text style={styles.kpiTitle}>Gastos</Text>
              <Text style={[styles.kpiValue, styles.expenseColor]}>
                -{formattedExpense}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Link
            href="/add-expense"
            asChild
            style={[styles.actionButton, styles.expenseAction]}
          >
            <Pressable>
              <Text style={styles.actionText}>+ Registrar gasto</Text>
            </Pressable>
          </Link>

          <Link
            href="/add-income"
            asChild
            style={[styles.actionButton, styles.incomeAction]}
          >
            <Pressable>
              <Text style={styles.actionText}>+ Registrar ingreso</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ultimos movimientos</Text>
          <Pressable>
            <Text style={styles.sectionLink}>Ver todos</Text>
          </Pressable>
        </View>

        <View style={styles.listCard}>
          {transactions.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View>
                <Text style={styles.itemTitle}>{item.category}</Text>
                <Text style={styles.itemType}>
                  {item.type === "income" ? "Ingreso" : "Gasto"}
                </Text>
              </View>
              <Text
                style={[
                  styles.itemAmount,
                  { color: item.type === "expense" ? "#C24747" : "#207E61" },
                ]}
              >
                {item.type === "expense" ? "-" : "+"}
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "USD",
                }).format(item.amount)}
              </Text>
            </View>
          ))}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>
      {/* <Link href="/add-expense" asChild>
        <Pressable style={styles.fabButton}>
          <Text style={styles.fabText}>+ Gasto</Text>
        </Pressable>
      </Link> */}
    </SafeAreaView>
  );
}
