import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { type User } from "../types/User";
import { type AuthTokenPayload } from "../types/AuthTokenPayload";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string) => {
    try {
      localStorage.setItem("auth_token", token);
      const decodedToken = jwtDecode<AuthTokenPayload>(token);

      const userData: User = {
        user_id: decodedToken.sub || decodedToken.subject || "",
        email: decodedToken.email || decodedToken.user_metadata?.email || "",
        name: decodedToken.user_metadata?.nome || "",
        user_type: decodedToken.user_type || decodedToken.user_metadata?.user_type || "aluno",
        token,
      };

      setUser(userData);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      try {
        const decodedToken = jwtDecode<AuthTokenPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          const userData: User = {
            user_id: decodedToken.sub || decodedToken.subject || "",
            email: decodedToken.email || decodedToken.user_metadata?.email || "",
            name: decodedToken.user_metadata?.nome || "",
            user_type: decodedToken.user_type || decodedToken.user_metadata?.user_type || "aluno",
            token,
          };
          setUser(userData);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
