import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: 'checkbox'
}

export default function Checkbox({
  type = 'checkbox',
  className,
  ...props
}: CheckboxProps) {
  const { register } = useFormContext()
  const styles = classNames(
    'h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
    className
  )
  return (
    <input
      id={props.name}
      className={styles}
      {...register(props.name)}
      {...props}
      type="checkbox"
    />
  )
}
