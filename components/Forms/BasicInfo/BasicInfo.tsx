'use client'

import Button from '@/components/Button'
import { BasicInfoFormData, basicInfoFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useStore } from '../../../store/SignatureForm'
import { Form } from '../Composition/Index'

export default function BasicInfo() {
  const {
    setBasicInfo,
    setHasFormErros: setBasicInfoFormErrors,
    setCurrentStep,
  } = useStore((store) => store.actions)

  const basicInfoForm = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoFormSchema),
    mode: 'all',
  })

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, isLoading, errors, touchedFields },
  } = basicInfoForm

  function handleBasicInfo(data: any) {
    if (errors.email || errors.name || errors.phone)
      return setBasicInfoFormErrors(true)

    setBasicInfoFormErrors(false)
    setBasicInfo(data)
    setCurrentStep(2)
  }

  return (
    <div>
      <FormProvider {...basicInfoForm}>
        <form onSubmit={handleSubmit(handleBasicInfo)}>
          <div className="flex flex-col items-center justify-start gap-y-4 md:items-strech">
            <div className="flex flex-col justify-start items-start w-full gap-4">
              <Form.Field>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Input type="text" name="name" />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="phone">E-mail</Form.Label>
                <Form.Input type="text" name="email" />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="phone">Phone</Form.Label>
                <Form.Input type="text" name="phone" />
                <Form.ErrorMessage field="phone" />
              </Form.Field>

              {/* disabled: !data || erros */}
              <Button
                label="Avancar"
                disabled={Object.keys(errors).length > 0}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
