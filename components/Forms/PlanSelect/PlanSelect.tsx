import { PlanSelectFormData, planSelectFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useStore } from '../../../store/SignatureForm'
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

  const planSelectForm = useForm<PlanSelectFormData>({
    resolver: zodResolver(planSelectFormSchema),
    mode: 'all',
    defaultValues: {
      plan: plansList[0].id,
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
    <>
      <FormProvider {...planSelectForm}>
        <form
          onSubmit={handleSubmit(handleFormSelect)}
          className="flex flex-col gap-2 w-full">
          {plansList.map((plan) => (
            <div
              key={plan.id}
              className="flex p-3 bg-slate-300 rounded-[8px] justify-between">
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

          <Button label="Avancar" className="w-fit ml-auto" />
        </form>
      </FormProvider>
    </>
  )
}
