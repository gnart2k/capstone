import { create } from 'zustand'

type State = {
  input: string
}

type Action = {
  setInput: (data: any) => void
}

export const useEditWrapperStore = create<State & Action>((set) => ({
  input: '',
  setInput: (data: any) => set(() => (
    { input: data }
  ))
}))



