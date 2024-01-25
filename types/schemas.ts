import { z } from 'zod'
import { plansList } from '../components/Forms/PlanSelect/PlanSelect'
import { addOnsList } from '../components/Forms/OptionalAddons/OptionalAddons'

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

export const planSelectFormSchema = z.object({
  plan: z
    .string({ invalid_type_error: 'Please select one plan' })
    .refine((val) => plansList.map((plan) => plan.id).includes(val)),
})

export type PlanSelectFormData = z.infer<typeof planSelectFormSchema>

export const optionalAddonsFormSchema = z.object({
  addOn: z
    .string({ invalid_type_error: 'Invalid add-ons select' })
    .refine((val) => addOnsList.map((addon) => addon.id).includes(val))
    .array()
    .optional(),
})

export type AddOnsFormData = z.infer<typeof optionalAddonsFormSchema>
