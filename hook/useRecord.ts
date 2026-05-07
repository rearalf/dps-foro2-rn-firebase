import { db } from "@/config/FirebaeConfig";
import { ITransaction } from "@/interfaces/trasactions";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
});

function getTransactionDateLabel(transaction: ITransaction) {
  const transactionDate = transaction.createdAt?.toDate?.();

  if (!transactionDate) {
    return "Sin fecha";
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay =
    transactionDate.getDate() === today.getDate() &&
    transactionDate.getMonth() === today.getMonth() &&
    transactionDate.getFullYear() === today.getFullYear();

  if (sameDay) {
    return "Hoy";
  }

  const isYesterday =
    transactionDate.getDate() === yesterday.getDate() &&
    transactionDate.getMonth() === yesterday.getMonth() &&
    transactionDate.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return "Ayer";
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(transactionDate);
}

function useRecord() {
  const user = useAuthSessionStore((state) => state.user);
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [incomeTotal, setIncomeTotal] = useState<number>(0);
  const [expenseTotal, setExpenseTotal] = useState<number>(0);

  const handleGetTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user?.uid) {
        setTransactions([]);
        setIncomeTotal(0);
        setExpenseTotal(0);
        setError("Debe iniciar sesion para ver el historial");
        return;
      }

      const transactionsRef = collection(db, "transactions");
      const q = query(
        transactionsRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const fetchedTransactions: ITransaction[] = [];

      querySnapshot.forEach((doc) => {
        fetchedTransactions.push({ id: doc.id, ...doc.data() } as ITransaction);
      });

      const incomes = fetchedTransactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);
      const expenses = fetchedTransactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

      setTransactions(fetchedTransactions);
      setIncomeTotal(incomes);
      setExpenseTotal(expenses);
    } catch (err: unknown) {
      let message = "No se pudo obtener el historial.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    handleGetTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, user?.uid]);

  return {
    error,
    isLoading,
    transactions: transactions.map((transaction) => ({
      ...transaction,
      formattedAmount: `${transaction.type === "expense" ? "-" : "+"}${currencyFormatter.format(transaction.amount)}`,
      formattedDate: getTransactionDateLabel(transaction),
      formattedType: transaction.type === "income" ? "Ingreso" : "Gasto",
      amountColor: transaction.type === "expense" ? "#C24747" : "#1F7A6F",
    })),
    formattedIncome: currencyFormatter.format(incomeTotal),
    formattedExpense: currencyFormatter.format(expenseTotal),
    handleGetTransactions,
  };
}

export default useRecord;
