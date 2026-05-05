import useDashboard from "@/hook/useDashboard";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/dashboardStyles";

const movements = [
  {
    id: "1",
    title: "Supermercado",
    type: "Gasto",
    amount: "-$48.20",
    color: "#C24747",
  },
  {
    id: "2",
    title: "Freelance",
    type: "Ingreso",
    amount: "+$320.00",
    color: "#207E61",
  },
  {
    id: "3",
    title: "Transporte",
    type: "Gasto",
    amount: "-$12.40",
    color: "#C24747",
  },
  {
    id: "4",
    title: "Sueldo",
    type: "Ingreso",
    amount: "+$1,250.00",
    color: "#207E61",
  },
];

export default function DashboardScreen() {
  const { user, handleLogout } = useDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
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
          <Text style={styles.balanceAmount}>$2,845.30</Text>

          <View style={styles.kpiRow}>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiTitle}>Ingresos</Text>
              <Text style={[styles.kpiValue, styles.incomeColor]}>
                +$3,120.00
              </Text>
            </View>

            <View style={styles.kpiDivider} />

            <View style={styles.kpiBox}>
              <Text style={styles.kpiTitle}>Gastos</Text>
              <Text style={[styles.kpiValue, styles.expenseColor]}>
                -$274.70
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
          {movements.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemType}>{item.type}</Text>
              </View>
              <Text style={[styles.itemAmount, { color: item.color }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Link href="/add-expense" asChild>
        <Pressable style={styles.fabButton}>
          <Text style={styles.fabText}>+ Gasto</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
