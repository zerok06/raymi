import Link from 'next/link'
import React from 'react'

interface LogoProps {
  href?: string
}

const Logo: React.FC<LogoProps> = ({ href = '/home' }) => {
  return (
    <Link href={href}>
      <img src="/assets/logo.png" alt="Logo" className="h-16" />
    </Link>
  )
}

export default Logo
