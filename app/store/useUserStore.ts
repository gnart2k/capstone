import { create } from "zustand"

type State = {
  user: {
    id: string,
    image: string,
    name: string
  }
}

type Action = {
  setUser: (user: State['user']) => void
  initializeUser: (userId: String) => void
}

export const useUserStore = create<State & Action>((set) => ({
  user: {
    id: '',
    image: '',
    name: ''
  },
  setUser: (user) => set(() => {
    localStorage.setItem('user-info', JSON.stringify(user));
    return { user: user };
  }),

  initializeUser: (userId) => set((state) => {
      const storedUser = localStorage.getItem('user-info');
      const user = JSON.parse(storedUser)
    if (user && user?.id === userId) {
        try {
          return { user: user};
        } catch (e) {
          console.error("Failed to parse user info from localStorage", e);
        }
    }
    return state;
  })
}))


