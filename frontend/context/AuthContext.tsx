'use client'

import { createContext, useContext } from 'react'
import React from 'react'

interface HomeContextProps {
  id: number | null
  email: string | null
}

export const HomeContext = createContext<HomeContextProps>({
  id: 0,
  email: '',
})

interface AuthContextProps {
  children: React.ReactNode
  context: HomeContextProps
}

const AuthContext: React.FC<AuthContextProps> = ({ children, context }) => {
  return (
    <HomeContext.Provider value={{ ...context }}>
      {children}
    </HomeContext.Provider>
  )
}

export default AuthContext

export const useHomeContext = () => {
  return useContext(HomeContext)
}
