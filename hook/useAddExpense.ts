import { db } from "@/config/FirebaeConfig";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

function useAddExpense() {
  const router = useRouter();
  const user = useAuthSessionStore((state) => state.user);

  const [monto, setMonto] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMonto = (value: string) => {
    const cleanValue = value.replace(/,/g, ".");
    setMonto(cleanValue);
  };

  const handleCategoria = (value: string) => {
    setCategoria(value);
  };

  const handleDescripcion = (value: string) => {
    setDescripcion(value);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user?.uid) {
        setError("Debe iniciar sesion para registrar un gasto");
        return;
      }

      const amount = Number(monto);
      if (!monto.trim() || Number.isNaN(amount) || amount <= 0) {
        setError("Ingrese un monto valido mayor a 0");
        return;
      }

      if (!categoria.trim()) {
        setError("La categoria es obligatoria");
        return;
      }

      await addDoc(collection(db, "transactions"), {
        userId: user.uid,
        type: "expense",
        amount,
        category: categoria.trim(),
        description: descripcion.trim(),
        createdAt: serverTimestamp(),
      });

      router.replace("/(tabs)/dashboard");
    } catch (err: unknown) {
      let message = "No se pudo guardar el gasto.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    monto,
    error,
    isLoading,
    categoria,
    descripcion,
    handleSave,
    handleMonto,
    handleCategoria,
    handleDescripcion,
    setCategoria,
    setDescripcion,
  };
}

export default useAddExpense;
