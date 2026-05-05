import { auth } from "@/config/FirebaeConfig";
import useAuthSessionStore from "@/store/useAuthSessionStore";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

function useDashboard() {
  const router = useRouter();
  const user = useAuthSessionStore((state) => state.user);
  const clearSession = useAuthSessionStore((state) => state.clearSession);

  const handleLogout = async () => {
    await signOut(auth);
    clearSession();
    router.replace("/login");
  };

  return {
    user,
    handleLogout,
  };
}

export default useDashboard;
