import Button from '@/components/Button'
import { useStore } from '@/store/SignatureForm'
import { AddOnsFormData, optionalAddonsFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../Composition/Index'
import Checkbox from '../Composition/Checkbox'

export const addOnsList = [
  {
    id: 'OS',
    name: 'Online Service',
    price: 0.99,
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod',
  },
  {
    id: 'LS',
    name: 'Larger Storage',
    price: 0.99,
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod',
  },
  {
    id: 'CP',
    name: 'Customizable Profile',
    price: 0.99,
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod',
  },
]

export default function OptionalAddons() {
  const { setOptionalAddons, setHasFormErros, setCurrentStep } = useStore(
    (store) => store.actions
  )

  const optionalAddonsForm = useForm<AddOnsFormData>({
    resolver: zodResolver(optionalAddonsFormSchema),
    mode: 'all',
  })

  const {
    handleSubmit,
    formState: { errors },
  } = optionalAddonsForm

  function handleFormSelect(data: any) {
    if (errors.addOn) return setHasFormErros(true)

    setOptionalAddons(data)
    setCurrentStep(4)
  }

  return (
    <>
      <FormProvider {...optionalAddonsForm}>
        <form
          onSubmit={handleSubmit(handleFormSelect)}
          className="flex flex-col gap-2 w-full">
          {addOnsList.map((addon) => (
            <div
              key={addon.id}
              className="flex p-3 bg-slate-300 rounded-[8px] justify-between items-center gap-4">
              <Form.Checkbox name="addOn" id={addon.name} />
              <Form.ErrorMessage field={addon.name} />
              <Form.Label
                htmlFor={addon.name}
                className="cursor-pointer flex-1">
                <p className="text-lg font-bold text-slate-800">{addon.name}</p>
                <p className="text-xs font-medium text-gray-500">
                  {addon.description}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  ${addon.price}
                </p>
              </Form.Label>
            </div>
          ))}

          <Button label="Avancar" className="w-fit ml-auto" />
        </form>
      </FormProvider>
    </>
  )
}
