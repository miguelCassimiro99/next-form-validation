import { useStore } from '../../../store/signature-form'

export default function ConfirmSignature() {
  const { currentStep } = useStore((store) => store.state)

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
      <div className="flex flex-col gap-2 w-full py-4 md:py-6">
        <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
          Finishing up
        </h2>

        <p className="text-sm text-gray-300 mb-4 max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  )
}
