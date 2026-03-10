import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// ─── Constantes ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'gh:auth'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    // Descarta se o token tiver expirado
    if (data.expiresAt && Date.now() > data.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function writeStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

/**
 * AuthProvider
 *
 * Envolva o <App /> com este provider.
 * Mantém token e dados do usuário no localStorage.
 * Persiste entre refreshes. Limpa no logout ou expiração.
 *
 * Estado exposto:
 *   user          object | null    Dados do usuário autenticado
 *   token         string | null    JWT / token da API
 *   isAuth        bool             true se há sessão válida
 *
 * Ações expostas:
 *   login(token, user, expiresIn?)   Salva sessão (expiresIn em ms, default 8h)
 *   logout()                         Limpa sessão
 *   updateUser(partial)              Atualiza campos do usuário sem re-login
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStorage())

  // Verifica expiração periodicamente (a cada minuto)
  useEffect(() => {
    const id = setInterval(() => {
      const stored = readStorage()
      if (!stored) setSession(null)
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const login = useCallback((token, user, expiresIn = 8 * 60 * 60 * 1000) => {
    const data = {
      token,
      user,
      expiresAt: Date.now() + expiresIn,
    }
    writeStorage(data)
    setSession(data)
  }, [])

  const logout = useCallback(() => {
    clearStorage()
    setSession(null)
  }, [])

  const updateUser = useCallback((partial) => {
    setSession(prev => {
      if (!prev) return null
      const updated = { ...prev, user: { ...prev.user, ...partial } }
      writeStorage(updated)
      return updated
    })
  }, [])

  const value = {
    user:   session?.user  ?? null,
    token:  session?.token ?? null,
    isAuth: !!session,
    login,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth — hook para consumir o contexto de autenticação.
 *
 * const { user, token, isAuth, login, logout, updateUser } = useAuth()
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
