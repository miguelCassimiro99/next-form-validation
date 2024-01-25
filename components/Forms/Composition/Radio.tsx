import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: 'radio'
  className?: string
}

export default function Radio({
  type = 'radio',
  className,
  ...props
}: RadioProps) {
  const { register } = useFormContext()

  const styles = classNames(
    'h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
    className
  )

  return (
    <input
      id={props.name}
      className={className}
      {...register(props.name)}
      {...props}
      type={type}
    />
  )
}
