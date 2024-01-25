'use client'

import Button from '@/components/Button'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../Composition/Index'
import { BasicInfoFormData, basicInfoFormSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

export default function BasicInfo() {
  const [output, setOutput] = useState('')

  const basicInfoForm = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoFormSchema),
    mode: 'all',
  })

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, isLoading, errors },
  } = basicInfoForm

  function handleBasicInfo(data: any) {
    console.log('Errors: ')
    //? If not errors we can go to the other form
    setOutput(JSON.stringify(data, null, 2))
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

              <Button label="Avancar" />
            </div>
          </div>
        </form>
      </FormProvider>

      <pre>{output}</pre>
    </div>
  )
}
