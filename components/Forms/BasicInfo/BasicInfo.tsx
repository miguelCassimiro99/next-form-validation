'use client'

import Button from '@/components/Button'
import { BasicInfoFormData, basicInfoFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useStore } from '../../../store/signature-form'
import { Form } from '../Composition/Index'

export default function BasicInfo() {
  const {
    setBasicInfo,
    setHasFormErros: setBasicInfoFormErrors,
    setCurrentStep,
  } = useStore((store) => store.actions)

  const { basicInfo } = useStore((store) => store.state)

  const basicInfoForm = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoFormSchema),
    mode: 'all',
    defaultValues: basicInfo,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = basicInfoForm

  function handleBasicInfo(data: any) {
    if (errors.email || errors.name || errors.phone)
      return setBasicInfoFormErrors(true)

    setBasicInfoFormErrors(false)
    setBasicInfo(data)
    setCurrentStep(2)
  }

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
      <FormProvider {...basicInfoForm}>
        <form
          onSubmit={handleSubmit(handleBasicInfo)}
          className="py-4 md:py-6 overflow-hidden max-w-md">
          <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
            Personal Info
          </h2>

          <p className="text-sm text-gray-300 mb-4 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex flex-col items-center justify-start gap-y-4">
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <Form.Field className="w-full">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Input type="text" name="name" />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field className="w-full">
                <Form.Label htmlFor="phone">E-mail</Form.Label>
                <Form.Input type="text" name="email" />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field className="w-full">
                <Form.Label htmlFor="phone">Phone</Form.Label>
                <Form.Input type="text" name="phone" />
                <Form.ErrorMessage field="phone" />
              </Form.Field>

              {/* disabled: !data || erros */}
              <Button
                label="Próximo"
                className="ml-auto mt-4"
                disabled={Object.keys(errors).length > 0}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
