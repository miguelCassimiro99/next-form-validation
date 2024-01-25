'use client'

import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import { useForm, useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export default function Input({ className, ...props }: InputProps) {
  const { register } = useFormContext()

  const styles = classNames(
    'rounded-[8px] border border-zinc-300 px-3 py-2 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500',
    classNames
  )

  return (
    <input
      id={props.name}
      className={styles}
      {...register(props.name)}
      {...props}
    />
  )
}
