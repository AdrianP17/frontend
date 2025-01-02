import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";
type State = {
  token: string;
  user: User;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => ({
      token: "",
      user: {
        sub: 0,
        username: "",
        iat: 0,
        exp: 0,
      },
      isAuth: false,
      setToken: (token: string) =>
        set((state) => ({
          token,
          user: jwtDecode(token),
          isAuth: true,
        })),
      setUser: (user: any) =>
        set((state) => ({
          user: user,
        })),
      logout: () =>
        set((state) => ({
          token: "",
          user: {
            sub: 0,
            username: "",
            iat: 0,
            exp: 0,
          },
          isAuth: false,
        })),
      checkAuth: () => {
        const {token, user, logout} = get()
        if(!token) return false;

        // Verificar expiracion del token
        const currentTime = Date.now() / 1000;
        if(user.exp < currentTime) {
          logout()
          return false;
        }
      return true
      }
    }),
    { name: "auth" }
  )
);
