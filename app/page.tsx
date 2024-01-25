'use client'

import BasicInfo from '@/components/Forms/BasicInfo/BasicInfo'
import { useStore } from '../store/SignatureForm'
import PlanSelect from '@/components/Forms/PlanSelect/PlanSelect'
import OptionalAddons from '@/components/Forms/OptionalAddons/OptionalAddons'

export default function Home() {
  const { currentStep } = useStore((store) => store.state)

  //TODO: define the default values as the expected
  //TODO: store on localstorage in case of reload

  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full">
      <section className="w-3/4 md:w-1/3 p-4 rounded-[8px] shadow-md blur-0 bg-slate-800 min-w-max flex justify-center items-center">
        {/* TODO: Transition between forms */}
        {currentStep == 1 && <BasicInfo />}

        {currentStep == 2 && <PlanSelect />}

        {currentStep == 3 && <OptionalAddons />}

        {currentStep == 4 && <span>Finish form</span>}
      </section>
    </main>
  )
}
