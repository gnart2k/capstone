import { BookingFormSchema } from '@/schema'
import { create } from 'zustand'

type State = {
  state: typeof BookingFormSchema
}

type Action = {
  setState: (state: State['state']) => void
}

export const useAddressStore = create<State & Action>((set) => ({
  state: null,
  setState: (state: State['state']) => set(() => ({ state: state }))
}))


