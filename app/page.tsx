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
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full relative">
      <div className="steps-container h-1/4 bg-mobile-hero bg-cover object-center fixed top-0 w-full md:hidden"></div>

      <section className="absolute h-[70%] w-3/4 md:w-full p-4 rounded-[8px] shadow-md bg-slate-800 min-w-max flex justify-center items-center gap-10 md:py-4 container md:justify-start">
        <div className="h-full w-1/2 bg-desktop-side bg-bottom bg-cover bg-no-repeat hidden md:block rounded-[8px]"></div>

        {/* TODO: Transition between forms */}
        {currentStep == 1 && <BasicInfo />}

        {currentStep == 2 && <PlanSelect />}

        {currentStep == 3 && <OptionalAddons />}

        {currentStep == 4 && <span>Finish form</span>}
      </section>
    </main>
  )
}
