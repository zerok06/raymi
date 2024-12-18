import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

interface ButtonSubmitProps {
  children: React.ReactNode | string
  className?: string
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ children, className }) => {
  const state = useFormStatus()

  return (
    <Button disabled={state.pending} type="submit" className={cn(className)}>
      {children}
    </Button>
  )
}

export default ButtonSubmit
