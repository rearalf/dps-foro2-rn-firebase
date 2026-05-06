import { auth, db } from "@/config/FirebaeConfig";
import { ITransaction } from "@/interfaces/trasactions";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
});

function useDashboard() {
  const router = useRouter();
  const user = useAuthSessionStore((state) => state.user);
  const clearSession = useAuthSessionStore((state) => state.clearSession);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [incomeTotal, setIncomeTotal] = useState<number>(0);
  const [expenseTotal, setExpenseTotal] = useState<number>(0);
  const [balanceTotal, setBalanceTotal] = useState<number>(0);

  const handleLogout = async () => {
    await signOut(auth);
    clearSession();
    router.replace("/login");
  };

  const handleGetRecentTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user?.uid) {
        setError("Debe iniciar sesion para registrar un ingreso");
        return;
      }

      const ahora = new Date();

      const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);
      finMes.setHours(23, 59, 59, 999);

      const transactionsRef = collection(db, "transactions");
      const q = query(
        transactionsRef,
        where("userId", "==", user.uid),
        where("createdAt", ">=", Timestamp.fromDate(inicioMes)),
        where("createdAt", "<=", Timestamp.fromDate(finMes)),
      );

      const querySnapshot = await getDocs(q);

      const t: ITransaction[] = [];
      querySnapshot.forEach((doc) => {
        t.push({ id: doc.id, ...doc.data() } as ITransaction);
      });

      const orderedTransactions = t.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.()?.getTime() ?? 0;
        const dateB = b.createdAt?.toDate?.()?.getTime() ?? 0;
        return dateB - dateA;
      });

      const incomes = orderedTransactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);
      const expenses = orderedTransactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

      setIncomeTotal(incomes);
      setExpenseTotal(expenses);
      setBalanceTotal(incomes - expenses);
      setTransactions(orderedTransactions.slice(0, 5));
    } catch (err: unknown) {
      let message = "No se pudo obtener el resumen del dashboard.";
      if (err instanceof Error) {
        message = err.message;
      }
      console.log(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetRecentTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    error,
    isLoading,
    transactions,
    formattedIncome: currencyFormatter.format(incomeTotal),
    formattedExpense: currencyFormatter.format(expenseTotal),
    formattedBalance: currencyFormatter.format(balanceTotal),
    handleLogout,
    handleGetRecentTransactions,
  };
}

export default useDashboard;
