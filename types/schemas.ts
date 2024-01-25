import { z } from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const basicInfoFormSchema = z.object({
  name: z
    .string({ required_error: 'The field name is required' })
    .min(6, 'The name need to have at least 6 chars'),
  email: z
    .string()
    .min(1, 'The field e-mail is required')
    .email('Invalid e-mail'),
  phone: z
    .string()
    .min(1, 'The Field phone is required')
    .regex(phoneRegex, 'Invalid number'),
})

export type BasicInfoFormData = z.infer<typeof basicInfoFormSchema>