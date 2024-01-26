'use client'

import { useStore } from '../../../store/signature-form'
import { plansList } from '../PlanSelect/PlanSelect'
import { addOnsItemType, planItemType } from '../../../types/signature-form'
import { addOnsList } from '../OptionalAddons/OptionalAddons'
import Button from '@/components/Button'

export default function ConfirmSignature() {
  const { basicInfo, planSelected, optionalAddons } = useStore(
    (store) => store.state
  )

  let seletedPlan: planItemType = {
    name: '',
    id: '',
    price: 0,
  }

  plansList.forEach((plan) => {
    if (plan.id == planSelected.plan) seletedPlan = plan
  })

  let addOnsSelecteds = [] as addOnsItemType[]

  let total = seletedPlan.price

  addOnsList.forEach((addon) => {
    optionalAddons.addOn.forEach((opt) => {
      if (addon.id == opt) addOnsSelecteds.push(addon)
    })
  })

  total += addOnsSelecteds.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
      <div className="flex flex-col gap-2 w-full py-4 md:py-6">
        <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
          Finishing up
        </h2>

        <p className="text-sm text-gray-300 mb-4 max-w-xs">
          Check all info before finish the signature
        </p>

        <div className="rounded-[8px] bg-slate-500 flex flex-col shadow-lg">
          <div className="p-3 flex flex-col justify-between gap-4">
            <div className="flex flex-col justify-start items-start">
              <span className="text-gray-300 text-base font-semibold truncate">
                {basicInfo.name.split(' ', 1)}
              </span>
              <span className="text-xs text-gray-300">{basicInfo.email}</span>
            </div>

            <div className="flex flex-col">
              {seletedPlan && (
                <div className="py-3 flex justify-between">
                  <span className="text-gray-200 font-medium text-sm">
                    {seletedPlan.name}
                  </span>
                  <span className="text-gray-200 font-bold">
                    ${seletedPlan.price}
                  </span>
                </div>
              )}

              {addOnsSelecteds.length > 0 &&
                addOnsSelecteds &&
                addOnsSelecteds.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <span className="text-gray-200 font-medium text-sm">
                      {item.name}
                    </span>
                    <span className="text-gray-200 font-bold">
                      ${item.price}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <span className="text-gray-200 font-medium">Total</span>
          <span className="font-bold text-lg text-gray-200">${total}</span>
        </div>

        <Button
          label="Concluído"
          theme="accent"
          className="mt-8"
          asLink
          link="/"
        />
      </div>
    </div>
  )
}
