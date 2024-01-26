'use client'

import classnames from 'classnames'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  asLink?: boolean
  label: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  theme?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'link'
    | 'remove'
    | 'confirm'
    | 'light'
  onClick?: MouseEventHandler<HTMLButtonElement>
  link?: string
  colors?: string
  className?: string
}

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs rounded',
  sm: 'px-3 py-2 text-sm leading-4 rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-4 py-2 text-base rounded-md',
  xl: 'px-6 py-3 text-base rounded-md',
}

const themeClasses = {
  primary: 'bg-amber-500 hover:bg-amber-400 focus:ring-amber-600 text-white',
  accent: 'bg-indigo-400 hover:bg-indigo-700 focus:ring-indigo-500 text-white',
  secondary:
    'bg-white hover:bg-slate-100 focus:ring-indigo-500 border border-slate-300 text-gray-600',
  light:
    'bg-slate-100 hover:bg-slate-200 focus:ring-indigo-500 border border-slate-300 text-gray-600',
  remove: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white',
  confirm: 'bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 text-white',
  link: 'bg-transparent shadow-none text-indigo-500 focus:bg-slate-200 focus:ring-0 focus:ring-offset-0',
}

export default function Button({
  type = 'submit',
  theme = 'primary',
  asLink,
  size,
  label,
  link,
  className,
  colors,
  ...props
}: IButton) {
  const classes = classnames(
    'inline-flex justify-center items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all',
    sizeClasses[size || 'md'],
    colors || themeClasses[theme || 'secondary'],
    className,
    {
      'opacity-50': props.disabled,
    }
  )

  return asLink ? (
    <a href={link} className={classes}>
      {label}
    </a>
  ) : (
    <button type={type} className={classes} {...props}>
      {label}
    </button>
  )
}
