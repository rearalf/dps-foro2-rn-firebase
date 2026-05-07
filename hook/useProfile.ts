import { auth } from "@/config/FirebaeConfig";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import {
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    signOut,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import { useEffect, useMemo, useState } from "react";

function useProfile() {
  const router = useRouter();
  const sessionUser = useAuthSessionStore((state) => state.user);
  const clearSession = useAuthSessionStore((state) => state.clearSession);
  const setSessionFromFirebaseUser = useAuthSessionStore(
    (state) => state.setSessionFromFirebaseUser,
  );

  const [displayName, setDisplayName] = useState(
    sessionUser?.displayName ?? "",
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setDisplayName(sessionUser?.displayName ?? "");
  }, [sessionUser?.displayName]);

  const firebaseUser = auth.currentUser;

  const userInitials = useMemo(() => {
    const source =
      sessionUser?.displayName?.trim() ||
      firebaseUser?.displayName?.trim() ||
      "";

    if (!source) {
      const emailPrefix = (
        sessionUser?.email ||
        firebaseUser?.email ||
        ""
      ).split("@")[0];
      const letters = emailPrefix
        .replace(/[^a-zA-Z]/g, "")
        .slice(0, 2)
        .toUpperCase();
      return letters || "US";
    }

    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }, [
    firebaseUser?.displayName,
    firebaseUser?.email,
    sessionUser?.displayName,
    sessionUser?.email,
  ]);

  const setMessage = (nextError: string | null, nextSuccess: string | null) => {
    setError(nextError);
    setSuccess(nextSuccess);
  };

  const requiresPasswordReauth = () => {
    return (firebaseUser?.providerData ?? []).some(
      (provider) => provider.providerId === "password",
    );
  };

  const reauthenticateWithPasswordIfNeeded = async () => {
    if (!firebaseUser) {
      throw new Error("Debe iniciar sesion para realizar esta accion.");
    }

    if (!requiresPasswordReauth()) {
      return;
    }

    if (!firebaseUser.email) {
      throw new Error("No se pudo validar su correo para reautenticacion.");
    }

    if (!currentPassword) {
      throw new Error("Debe ingresar su contrasena actual.");
    }

    const credential = EmailAuthProvider.credential(
      firebaseUser.email,
      currentPassword,
    );

    await reauthenticateWithCredential(firebaseUser, credential);
  };

  const handleLogout = async () => {
    try {
      setIsProcessing(true);
      setMessage(null, null);
      await signOut(auth);
      clearSession();
      router.replace("/login");
    } catch {
      setMessage("No se pudo cerrar sesion. Intente nuevamente.", null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateDisplayName = async () => {
    try {
      setIsProcessing(true);
      setMessage(null, null);

      if (!firebaseUser) {
        setMessage("Debe iniciar sesion para actualizar su perfil.", null);
        return false;
      }

      const nextName = displayName.trim();
      if (!nextName) {
        setMessage("El nombre de usuario es obligatorio.", null);
        return false;
      }

      if (nextName.length < 2) {
        setMessage(
          "El nombre de usuario debe tener al menos 2 caracteres.",
          null,
        );
        return false;
      }

      await updateProfile(firebaseUser, { displayName: nextName });
      setSessionFromFirebaseUser(firebaseUser);
      setMessage(null, "Nombre de usuario actualizado correctamente.");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message, null);
      } else {
        setMessage("No se pudo actualizar el nombre de usuario.", null);
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsProcessing(true);
      setMessage(null, null);

      if (!firebaseUser) {
        setMessage("Debe iniciar sesion para cambiar su contrasena.", null);
        return false;
      }

      if (!newPassword || !confirmNewPassword) {
        setMessage(
          "Debe completar todos los campos de la nueva contrasena.",
          null,
        );
        return false;
      }

      if (newPassword.length < 6) {
        setMessage(
          "La nueva contrasena debe tener al menos 6 caracteres.",
          null,
        );
        return false;
      }

      if (newPassword !== confirmNewPassword) {
        setMessage("Las contrasenas no coinciden.", null);
        return false;
      }

      await reauthenticateWithPasswordIfNeeded();
      await updatePassword(firebaseUser, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setMessage(null, "Contrasena actualizada correctamente.");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        if ((err as { code?: string }).code === "auth/wrong-password") {
          setMessage("La contrasena actual es incorrecta.", null);
        } else if (
          (err as { code?: string }).code === "auth/requires-recent-login"
        ) {
          setMessage(
            "Por seguridad, vuelva a iniciar sesion para cambiar la contrasena.",
            null,
          );
        } else {
          setMessage(err.message, null);
        }
      } else {
        setMessage("No se pudo cambiar la contrasena.", null);
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsProcessing(true);
      setMessage(null, null);

      if (!firebaseUser) {
        setMessage("No se encontro una sesion activa para eliminar.", null);
        return false;
      }

      await reauthenticateWithPasswordIfNeeded();
      await deleteUser(firebaseUser);
      clearSession();
      router.replace("/login");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const authCode = (err as { code?: string }).code;
        if (authCode === "auth/wrong-password") {
          setMessage("La contrasena actual es incorrecta.", null);
        } else if (authCode === "auth/requires-recent-login") {
          setMessage(
            "Por seguridad, vuelva a iniciar sesion antes de eliminar su cuenta.",
            null,
          );
        } else {
          setMessage(err.message, null);
        }
      } else {
        setMessage("No se pudo eliminar la cuenta.", null);
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    user: sessionUser,
    displayName,
    currentPassword,
    newPassword,
    confirmNewPassword,
    isProcessing,
    error,
    success,
    userInitials,
    setDisplayName,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    handleLogout,
    handleUpdateDisplayName,
    handleChangePassword,
    handleDeleteAccount,
  };
}

export default useProfile;
