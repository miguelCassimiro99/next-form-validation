'use client'

import BasicInfo from '@/components/Forms/BasicInfo/BasicInfo'
import { useStore } from '../store/SignatureForm'

export default function Home() {
  const { basicInfo, basicInfoFormErrors, currentStep } = useStore(
    (store) => store.state
  )

  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full">
      <section className="max-w-sm p-4 rounded-[8px] shadow-md blur-0 bg-slate-800 min-w-max">
        {/* TODO: Transition between forms */}
        {currentStep == 1 && <BasicInfo />}

        {currentStep == 2 && <span className="text-slate-300">Step 2</span>}
      </section>
    </main>
  )
}
