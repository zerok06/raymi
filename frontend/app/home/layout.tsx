import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutHome: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>
}

export default LayoutHome
