import { useContext } from "react";
import { AuthContext } from "./createAuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("You used AuthContext outside AuthProvider");
  return context;
}

export { useAuth };
