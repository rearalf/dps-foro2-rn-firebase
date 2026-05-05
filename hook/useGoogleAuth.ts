import { auth } from "@/config/FirebaeConfig";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";

type GoogleSigninModule =
  typeof import("@react-native-google-signin/google-signin");

const WEB_CLIENT_ID =
  "1094967591447-a0g2sleq4thgnhrlhl7ivk7209fnoudp.apps.googleusercontent.com";

let googleSigninModulePromise: Promise<GoogleSigninModule> | null = null;

const getGoogleSigninModule = async () => {
  if (!googleSigninModulePromise) {
    googleSigninModulePromise =
      import("@react-native-google-signin/google-signin");
  }

  return googleSigninModulePromise;
};

function useGoogleAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSessionFromFirebaseUser = useAuthSessionStore(
    (state) => state.setSessionFromFirebaseUser,
  );

  const handleSignInWithGoogle = async () => {
    let googleSigninModule: GoogleSigninModule | null = null;

    try {
      setLoading(true);
      setError(null);

      try {
        googleSigninModule = await getGoogleSigninModule();
      } catch {
        googleSigninModulePromise = null;
        setError(
          "Google Sign-In no esta disponible en este cliente. Usa un Development Build (expo run:android) o inicia con correo.",
        );
        return false;
      }

      const { GoogleSignin } = googleSigninModule;

      // El módulo pudo resolverse pero el native module no está registrado (Expo Go)
      if (typeof GoogleSignin?.configure !== "function") {
        setError(
          "Google Sign-In requiere un Development Build. Inicia sesion con correo.",
        );
        return false;
      }

      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        setError("No se pudo obtener el token de Google");
        return false;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);

      setSessionFromFirebaseUser(result.user);
      router.replace("/(tabs)/dashboard");
      return true;
    } catch (err: unknown) {
      if (googleSigninModule) {
        const { isErrorWithCode, statusCodes } = googleSigninModule;

        if (typeof isErrorWithCode === "function" && isErrorWithCode(err)) {
          switch (err.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              // El usuario canceló, no se muestra error
              return false;
            case statusCodes.IN_PROGRESS:
              setError("Inicio de sesion ya en progreso");
              return false;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              setError("Google Play Services no disponible");
              return false;
            default:
              setError(err.message ?? "Error al iniciar sesion con Google");
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al iniciar sesion con Google");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesion con Google");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSignInWithGoogle };
}

export default useGoogleAuth;
