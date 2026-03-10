import axios from 'axios'

// ─── Constantes ───────────────────────────────────────────────────────────────
const STORAGE_KEY  = 'gh:auth'
const BASE_URL     = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// ─── Helpers de storage ───────────────────────────────────────────────────────
// Leitura direta do localStorage — sem depender do AuthContext
// para evitar dependência circular (o AuthContext pode importar o api.js)
function getToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { token, expiresAt } = JSON.parse(raw)
    if (expiresAt && Date.now() > expiresAt) return null
    return token ?? null
  } catch {
    return null
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

// ─── Instância do axios ───────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
})

// ─── Interceptor de requisição ────────────────────────────────────────────────
// Injeta o token Bearer em toda requisição automaticamente.
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Interceptor de resposta ──────────────────────────────────────────────────
// Trata erros globais: 401 = sessão expirada, 403 = sem permissão.
// Outros erros são repassados para o chamador tratar localmente.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Token inválido ou expirado — limpa a sessão e redireciona para login
      clearSession()
      window.location.href = '/login'
    }

    if (status === 403) {
      // Acesso negado — a página pode tratar isso localmente se precisar
      console.warn('[api] Acesso negado (403):', error.config?.url)
    }

    return Promise.reject(normalizeError(error))
  },
)

// ─── Normalização de erros ────────────────────────────────────────────────────
// Garante que todo erro rejeitado siga a mesma estrutura:
// { message, status, data, originalError }
function normalizeError(error) {
  if (error.response) {
    // Servidor respondeu com status fora de 2xx
    return {
      message:       error.response.data?.message ?? 'Erro no servidor.',
      status:        error.response.status,
      data:          error.response.data ?? null,
      originalError: error,
    }
  }

  if (error.request) {
    // Requisição enviada mas sem resposta (timeout, rede offline)
    return {
      message:       'Sem resposta do servidor. Verifique sua conexão.',
      status:        null,
      data:          null,
      originalError: error,
    }
  }

  // Erro ao montar a requisição
  return {
    message:       error.message ?? 'Erro desconhecido.',
    status:        null,
    data:          null,
    originalError: error,
  }
}
