import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'