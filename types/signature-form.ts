export type basicInfoType = {
  name: string
  email: string
  phone: string
}

export type planItemType = {
  name: string
  id: string
  price: number
}

export type planSelectedType = {
  plan: string
}

export type addOnType = string

export type addOnsItemType = {
  id: string
  name: string
  price: number
  description: string
}
