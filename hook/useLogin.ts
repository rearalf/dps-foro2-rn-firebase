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
    } catch (err: unknown) {
      let message = "No se pudo iniciar sesion.";
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-credential")) {
          message = "Correo o contrasena incorrectos";
        } else if (err.message.includes("auth/too-many-requests")) {
          message = "Demasiados intentos. Intente de nuevo mas tarde";
        } else {
          message = err.message;
        }
      }
      setError(message);
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
