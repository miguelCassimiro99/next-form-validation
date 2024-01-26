import { PlanSelectFormData, planSelectFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useStore } from '../../../store/signature-form'
import Button from '@/components/Button'
import { Form } from '../Composition/Index'

export const plansList = [
  {
    id: 'ARC',
    name: 'Arcade',
    price: 0.99,
  },
  {
    id: 'ADV',
    name: 'Advanced',
    price: 2.99,
  },
  {
    id: 'PRO',
    name: 'PRO',
    price: 3.99,
  },
]

export default function PlanSelect() {
  const { setPlanSelected, setCurrentStep, setHasFormErros } = useStore(
    (store) => store.actions
  )

  const { planSelected } = useStore((store) => store.state)

  const planSelectForm = useForm<PlanSelectFormData>({
    resolver: zodResolver(planSelectFormSchema),
    mode: 'all',
    defaultValues: {
      ...planSelected,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = planSelectForm

  function handleFormSelect(data: any) {
    setPlanSelected(data)
    setCurrentStep(3)
  }

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
      <FormProvider {...planSelectForm}>
        <form
          onSubmit={handleSubmit(handleFormSelect)}
          className="flex flex-col gap-2 w-full py-4 md:py-6">
          <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
            Select your plan
          </h2>

          <p className="text-sm text-gray-300 mb-4 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {plansList.map((plan) => (
            <div
              key={plan.id}
              className="flex p-3 bg-slate-100 rounded-[8px] justify-between">
              <Form.Label htmlFor={plan.name} className="cursor-pointer flex-1">
                <p className="text-lg font-bold text-slate-800">{plan.name}</p>
                <p className="text-sm font-medium text-gray-500">
                  ${plan.price}
                </p>
              </Form.Label>
              <Form.Radio name="plan" id={plan.name} value={plan.id} />
              <Form.ErrorMessage field={plan.name} />
            </div>
          ))}

          <Button label="Próximo" className="w-fit ml-auto mt-4" />
        </form>
      </FormProvider>
    </div>
  )
}
