import useRecord from "@/hook/useRecord";
import styles from "@/styles/recordStyles";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistorialTabScreen() {
  const {
    error,
    isLoading,
    transactions,
    formattedIncome,
    formattedExpense,
    handleGetTransactions,
  } = useRecord();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleGetTransactions}
          />
        }
      >
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitle}>Todos tus movimientos recientes</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total ingresos</Text>
            <Text style={styles.incomeValue}>+{formattedIncome}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total gastos</Text>
            <Text style={styles.expenseValue}>-{formattedExpense}</Text>
          </View>
        </View>

        <View style={styles.listCard}>
          {transactions.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.itemTitle}>{item.category}</Text>
                <Text style={styles.itemMeta}>
                  {item.formattedType} · {item.formattedDate}
                </Text>
              </View>
              <Text style={[styles.itemAmount, { color: item.amountColor }]}>
                {item.formattedAmount}
              </Text>
            </View>
          ))}

          {!isLoading && transactions.length === 0 && !error ? (
            <Text style={styles.emptyText}>
              Todavia no hay movimientos registrados.
            </Text>
          ) : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
