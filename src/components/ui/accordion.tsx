'use client'

import * as React from 'react'
import { cn } from '@/utilities/ui'

interface AccordionContextValue {
  value?: string | string[]
  onValueChange: (itemValue: string) => void
  type?: 'single' | 'multiple'
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      collapsible = true,
      value: controlledValue,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (type === 'multiple' ? [] : ''),
    )

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        let nextValue: string | string[]

        if (type === 'single') {
          if (currentValue === itemValue) {
            nextValue = collapsible ? '' : itemValue
          } else {
            nextValue = itemValue
          }
        } else {
          const arr = Array.isArray(currentValue) ? currentValue : []
          if (arr.includes(itemValue)) {
            nextValue = arr.filter((v) => v !== itemValue)
          } else {
            nextValue = [...arr, itemValue]
          }
        }

        if (controlledValue === undefined) {
          setInternalValue(nextValue)
        }
        onValueChange?.(nextValue)
      },
      [collapsible, controlledValue, currentValue, onValueChange, type],
    )

    return (
      <AccordionContext.Provider
        value={{
          value: currentValue,
          onValueChange: handleValueChange,
          type,
          collapsible,
        }}
      >
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = 'Accordion'

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const isOpen = Array.isArray(context?.value)
      ? context.value.includes(value)
      : context?.value === value

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          className={className}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)

    if (!itemContext) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }

    const { isOpen, value } = itemContext

    return (
      <button
        ref={ref}
        type="button"
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        onClick={() => context?.onValueChange(value)}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  },
)
AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext)

    if (!itemContext) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const { isOpen } = itemContext

    if (!isOpen) {
      return null
    }

    return (
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('overflow-hidden text-sm transition-all', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
AccordionContent.displayName = 'AccordionContent'
