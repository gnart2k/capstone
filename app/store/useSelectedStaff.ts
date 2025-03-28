import { staffSelectType } from '@/components/custom/MultiSelect'
import { MapType } from '@/type/location'
import { StaffDataType, StaffType } from '@/type/staff'
import { create } from 'zustand'

type State = {
  selectedList: staffSelectType[]
}

type Action = {
  setSelectedList: (staffs: State['selectedList']) => void
  addStaffToSelectedList: (staff: staffSelectType) => void
}

export const useStaffStore = create<State & Action>((set) => ({
  selectedList: [],
  setSelectedList: (staff: staffSelectType[]) => set(() => (
    { selectedList: staff }
  )),
  addStaffToSelectedList: (staff: staffSelectType) =>
    set((state) => ({ selectedList: [...state.selectedList, staff] }))
}))


