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
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
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
    }),
    { name: "auth" }
  )
);
