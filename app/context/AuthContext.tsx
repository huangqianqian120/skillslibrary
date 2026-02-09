'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react'

interface User {
  email?: string | null
  name?: string | null
  image?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      })
    } else {
      setUser(null)
    }
  }, [session])

  const login = () => {
    signIn()
  }

  const logout = () => {
    signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading: status === 'loading', login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
