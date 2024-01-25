import { create } from 'zustand'
import { produce } from 'immer'

type StepsType = 1 | 2 | 3 | 4

interface IState {
  basicInfo: any
  hasFormErros: boolean
  planSelected: any
  currentStep: StepsType
}

interface IActions {
  setBasicInfo: (data: any) => void
  setHasFormErros: (errors: any) => void
  setCurrentStep: (step: StepsType) => void
  setPlanSelected: (plan: any) => void
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
      hasFormErros: true,
      currentStep: 1,
      planSelected: initialState,
    },

    actions: {
      setBasicInfo: (data: any) =>
        setState(({ state }: IStore) => {
          state.basicInfo = data
        }),
      setHasFormErros: (hasErrors: boolean) => {
        setState(({ state }: IStore) => {
          state.hasFormErros = hasErrors
        })
      },
      setCurrentStep: (step: StepsType) => {
        setState(({ state }: IStore) => {
          state.currentStep = step
        })
      },
      setPlanSelected: (data: any) =>
        setState(({ state }: IStore) => {
          state.planSelected = data
        }),
    },
  }
})
