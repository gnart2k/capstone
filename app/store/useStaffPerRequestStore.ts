import { create } from 'zustand'

type State = {
  onSelectedStaffId: string;
  selectedStaffId: string[]
}

type Action = {
  setSelectedStaffId: (staffId: State['selectedStaffId']) => void
  setOnSelectedStaffId: (staffId: string) => void
}

export const useStaffPerRequestStore = create<State & Action>((set) => ({
  onSelectedStaffId: '',
  selectedStaffId: [],
  setSelectedStaffId: (staffId: string[]) => set(() => (
    { selectedStaffId: staffId }
  )),
  setOnSelectedStaffId: (staffId: string) => set(() => (
    { onSelectedStaffId: staffId }
  )),

}))



