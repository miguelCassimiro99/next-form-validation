import BasicInfo from '@/components/Forms/BasicInfo/BasicInfo'

export default function Home() {
  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full">
      <section className="max-w-sm p-4 rounded-[8px] shadow-md blur-0 bg-slate-800 min-w-max">
        <BasicInfo />
      </section>
    </main>
  )
}
