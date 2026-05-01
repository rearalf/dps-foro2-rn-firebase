import styles from "@/styles/recordStyles";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const historyItems = [
  {
    id: "1",
    title: "Sueldo",
    category: "Ingreso",
    date: "Hoy",
    amount: "+$1,250.00",
    color: "#1F7A6F",
  },
  {
    id: "2",
    title: "Comida",
    category: "Gasto",
    date: "Hoy",
    amount: "-$18.50",
    color: "#C24747",
  },
  {
    id: "3",
    title: "Transporte",
    category: "Gasto",
    date: "Ayer",
    amount: "-$12.40",
    color: "#C24747",
  },
  {
    id: "4",
    title: "Freelance",
    category: "Ingreso",
    date: "Ayer",
    amount: "+$320.00",
    color: "#1F7A6F",
  },
  {
    id: "5",
    title: "Internet",
    category: "Gasto",
    date: "Lunes",
    amount: "-$29.90",
    color: "#C24747",
  },
];

export default function HistorialTabScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitle}>Todos tus movimientos recientes</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total ingresos</Text>
            <Text style={styles.incomeValue}>+$3,120.00</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total gastos</Text>
            <Text style={styles.expenseValue}>-$274.70</Text>
          </View>
        </View>

        <View style={styles.listCard}>
          {historyItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemMeta}>
                  {item.category} · {item.date}
                </Text>
              </View>
              <Text style={[styles.itemAmount, { color: item.color }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
