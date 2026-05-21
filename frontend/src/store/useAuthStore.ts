
import { persist } from "zustand/middleware";
import { create  } from "zustand";

interface AuthState{
    isAuthenticated : boolean;
    user : string | null
    login : (nim : string) => void;
    logout : () => void;

}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (nim: string) => 
                set ({isAuthenticated: true, user: nim}),
            logout: () => set({ isAuthenticated: false, user:null}),

        }),
        {
            name: "auth-storage",
        },
    ),
);