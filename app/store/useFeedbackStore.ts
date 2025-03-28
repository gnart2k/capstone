import { create } from 'zustand'
export type FeedbackType = {
  id: String
  text: String
  rate: number
  userId: String
  requestId: number
}

type State = {
  feedback: FeedbackType[]
}

type Action = {
  setFeedback: (staffs: State['feedback']) => void
}

export const useStaffStore = create<State & Action>((set) => ({
  feedback: [],
  setFeedback: (feedback: FeedbackType[]) => set(() => (
    { feedback: feedback }
  )),
}))



