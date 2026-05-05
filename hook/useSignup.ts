import { auth } from "@/config/FirebaeConfig";
import useGoogleAuth from "@/hook/useGoogleAuth";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

function useSignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSessionUser = useAuthSessionStore((state) => state.setSessionUser);

  const {
    loading: googleLoading,
    error: googleError,
    handleSignInWithGoogle,
  } = useGoogleAuth();

  const isLoading = loading || googleLoading;

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/dashboard");
      }
    });

    return subscriber;
  }, [router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateWithSignInEmailPassword = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        setError("Debe de llenar todos los campos");
        return false;
      }

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email.trim())) {
        setError("El correo no es valido");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return false;
      }

      if (password.length < 6) {
        setError("La contrasena debe tener al menos 6 caracteres");
        return false;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name.trim(),
      });

      setSessionUser({
        uid: user.uid,
        email: user.email ?? email.trim(),
        displayName: name.trim(),
      });

      router.replace("/(tabs)/dashboard");
      return true;
    } catch (err: unknown) {
      let message = "No se pudo crear la cuenta.";
      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use")) {
          message = "El correo ya existe";
        } else if (err.message.includes("auth/weak-password")) {
          message = "La contrasena es demasiado debil";
        } else {
          message = err.message;
        }
      }
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    loading,
    googleLoading,
    error,
    googleError,
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleCreateWithSignInEmailPassword,
    handleSignInWithGoogle,
  };
}

export default useSignUp;
