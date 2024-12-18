import Logo from '@/components/Logo'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutSign: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="min-h-screen bg-ui-900 w-full relative text-white pb-20">
      <nav className=" flex items-center mb-2 py-8 px-10">
        <Logo />
      </nav>
      <div className=" flex justify-center">{children}</div>
    </section>
  )
}

export default LayoutSign
