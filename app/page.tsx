'use client'

import BasicInfo from '@/components/Forms/BasicInfo/BasicInfo'
import { useStore } from '../store/signature-form'
import PlanSelect from '@/components/Forms/PlanSelect/PlanSelect'
import OptionalAddons from '@/components/Forms/OptionalAddons/OptionalAddons'
import ConfirmSignature from '../components/Forms/ConfirmSignature/ConfirmSignature'

export default function Home() {
  const { currentStep } = useStore((store) => store.state)
  const { setCurrentStep } = useStore((store) => store.actions)

  //TODO: define the default values as the expected
  //TODO: store on localstorage in case of reload

  function returnStep() {
    if (currentStep != 1) setCurrentStep(currentStep - 1)
  }

  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full relative max-w-[100vw]">
      <div className="steps-container h-1/4 bg-mobile-hero bg-cover object-center fixed top-0 w-full md:hidden"></div>

      <section className="absolute h-[70%] w-3/4 p-4 rounded-[8px] shadow-md bg-slate-800 min-w-max flex justify-start items-start gap-10 container md:justify-start md:max-w-4xl">
        <div className="h-full w-1/2 bg-desktop-side bg-bottom bg-cover bg-no-repeat hidden md:block rounded-[8px]"></div>

        {currentStep > 1 && (
          <button
            onClick={() => returnStep()}
            className="text-xs text-gray-100 font-thin absolute top-4 right-4">
            {' <- voltar'}
          </button>
        )}

        {/* TODO: Transition between forms */}
        {currentStep == 1 && <BasicInfo />}

        {currentStep == 2 && <PlanSelect />}

        {currentStep == 3 && <OptionalAddons />}

        {currentStep == 4 && <ConfirmSignature />}
      </section>
    </main>
  )
}
