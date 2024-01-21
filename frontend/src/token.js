import { create } from 'zustand'

const useTokenStore = create((set) => ({
    token: null, username: "", role: "",
    setToken: (newToken) => {
        localStorage.setItem("token", newToken);
        set({ token: newToken });
    },
    setUsername: (newUsername) => set({ username: newUsername }),
    setRole: (newRole) => set({ role: newRole }),
}));

export default useTokenStore;