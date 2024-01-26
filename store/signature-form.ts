import { create } from 'zustand'
import { produce } from 'immer'
import { basicInfoType, planSelectedType } from '@/types/signature-form'

type StepsType = 1 | 2 | 3 | 4 | number

interface IState {
  hasFormErros: boolean
  basicInfo: basicInfoType
  planSelected: planSelectedType
  optionalAddons: any
  currentStep: StepsType
}

interface IActions {
  setBasicInfo: (data: any) => void
  setHasFormErros: (errors: any) => void
  setCurrentStep: (step: StepsType) => void
  setPlanSelected: (plan: any) => void
  setOptionalAddons: (data: any) => void
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
      basicInfo: {
        name: '',
        email: '',
        phone: '',
      },
      hasFormErros: true,
      currentStep: 1,
      planSelected: {
        plan: 'ARC',
      },
      optionalAddons: [''],
    },

    actions: {
      setBasicInfo: (data: basicInfoType) =>
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
      setPlanSelected: (data: planSelectedType) =>
        setState(({ state }: IStore) => {
          state.planSelected = data
        }),
      setOptionalAddons: (data) =>
        setState(({ state }: IStore) => {
          console.log(data)
          state.optionalAddons = data
          console.log(state.optionalAddons)
        }),
    },
  }
})
