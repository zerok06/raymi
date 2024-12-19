import React from 'react'

interface WrapperProps {
  children?: React.ReactNode | string
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>
}

export default Wrapper
