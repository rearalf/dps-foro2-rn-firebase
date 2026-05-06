import { auth } from "@/config/FirebaeConfig";
import useGoogleAuth from "@/hook/useGoogleAuth";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";

function useLogin() {
  const router = useRouter();

  const setSessionFromFirebaseUser = useAuthSessionStore(
    (state) => state.setSessionFromFirebaseUser,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loading: googleLoading,
    error: googleError,
    handleSignInWithGoogle,
  } = useGoogleAuth();

  const isLoading = loading || googleLoading;

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setSessionFromFirebaseUser(firebaseUser);
      if (firebaseUser) {
        router.replace("/(tabs)/dashboard");
      }
    });

    return subscriber;
  }, [setSessionFromFirebaseUser, router]);

  const handleSignInWithEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!email.trim() || !password) {
        setError("Debe de llenar todos los campos");
        return;
      }

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email.trim())) {
        setError("El correo no es valido");
        return;
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(tabs)/dashboard");
    } catch (err: any) {
      let errorMessage = "Ocurrió un error inesperado.";

      switch (err.code) {
        case "auth/invalid-credential":
          errorMessage = "El correo o la contraseña son incorrectos.";
          break;
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo.";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Intenta más tarde.";
          break;
        default:
          errorMessage = err.message || "No se pudo iniciar sesión.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    isLoading,
    loading,
    googleLoading,
    error,
    googleError,
    user,
    handleSignInWithEmail,
    handleSignInWithGoogle,
  };
}

export default useLogin;
