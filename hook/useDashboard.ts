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

function useDashboard() {
  const router = useRouter();
  const user = useAuthSessionStore((state) => state.user);
  const clearSession = useAuthSessionStore((state) => state.clearSession);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleLogout = async () => {
    await signOut(auth);
    clearSession();
    router.replace("/login");
  };

  const handleGetTransaccionesRecientes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user?.uid) {
        setError("Debe iniciar sesion para registrar un ingreso");
        return;
      }

      const ahora = new Date();

      const inicioDia = new Date(ahora);
      inicioDia.setHours(0, 0, 0, 0);

      const finDia = new Date(ahora);
      finDia.setHours(23, 59, 59, 999);

      const transactionsRef = collection(db, "transactions");
      const q = query(
        transactionsRef,
        where("userId", "==", user.uid),
        where("createdAt", ">=", Timestamp.fromDate(inicioDia)),
        where("createdAt", "<=", Timestamp.fromDate(finDia)),
      );

      const querySnapshot = await getDocs(q);

      const t: ITransaction[] = [];
      querySnapshot.forEach((doc) => {
        t.push({ id: doc.id, ...doc.data() } as ITransaction);
      });
      setTransactions(t);
    } catch (err: unknown) {
      let message = "No se pudo guardar el ingreso.";
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
    handleGetTransaccionesRecientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    error,
    isLoading,
    transactions,
    handleLogout,
    handleGetTransaccionesRecientes,
  };
}

export default useDashboard;
