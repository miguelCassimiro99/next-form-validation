import { LabelHTMLAttributes } from 'react'

export default function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm text-zinc-400" {...props} />
}
