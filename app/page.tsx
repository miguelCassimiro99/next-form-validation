'use client'

import BasicInfo from '@/components/Forms/BasicInfo/BasicInfo'
import { useStore } from '../store/SignatureForm'
import PlanSelect from '@/components/Forms/PlanSelect/PlanSelect'

export default function Home() {
  const { currentStep } = useStore((store) => store.state)

  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full">
      <section className="w-3/4 md:w-1/3 p-4 rounded-[8px] shadow-md blur-0 bg-slate-800 min-w-max flex justify-center items-center">
        {/* TODO: Transition between forms */}
        {currentStep == 1 && <BasicInfo />}

        {currentStep == 2 && <PlanSelect />}
      </section>
    </main>
  )
}
