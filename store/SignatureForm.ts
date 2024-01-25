import { create } from 'zustand'
import { produce } from 'immer'

type StepsType = 1 | 2 | 3 | 4

interface IState {
  basicInfo: any
  basicInfoFormErrors: boolean
  currentStep: StepsType
}

interface IActions {
  setBasicInfo: (data: any) => void
  setBasicInfoFormErrors: (errors: any) => void
  setCurrentStep: (step: StepsType) => void
}

interface IStore {
  state: IState
  actions: IActions
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore)

  const initialState = undefined

  return {
    state: {
      basicInfo: initialState,
      basicInfoFormErrors: true,
      currentStep: 1,
    },

    actions: {
      setBasicInfo: (data: any) =>
        setState(({ state }: IStore) => {
          state.basicInfo = data
        }),
      setBasicInfoFormErrors: (hasErrors: boolean) => {
        setState(({ state }: IStore) => {
          state.basicInfoFormErrors = hasErrors
        })
      },
      setCurrentStep: (step: StepsType) => {
        setState(({ state }: IStore) => {
          state.currentStep = step
        })
      },
    },
  }
})
