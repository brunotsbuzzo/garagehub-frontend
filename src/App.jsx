import { lazy, Suspense } from 'react'
import { ConfigProvider, theme } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { themeConfig } from './theme/themeConfig'
import { AuthProvider } from './store/AuthContext'
import './index.css'

// ─── App pages ────────────────────────────────────────────────────────────────
import DashboardPage from './components/dashboard/page'

// ─── Styleguide ────────────────────────────────────────────────────────────────
// Importado apenas em desenvolvimento.
// Em produção (vite build), import.meta.env.DEV === false e o Vite elimina
// este branch completamente do bundle (dead-code elimination).
const StyleguideEntry = import.meta.env.DEV
  ? lazy(() => import('./styleguide/StyleguideEntry'))
  : null

function App() {
  return (
    <AuthProvider>
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>

          {/* ── Styleguide (dev only) ───────────────────────────────────────── */}
          {import.meta.env.DEV && (
            <Route
              path="/styleguide/*"
              element={
                <Suspense fallback={null}>
                  <StyleguideEntry />
                </Suspense>
              }
            />
          )}

          {/* ── App routes ─────────────────────────────────────────────────── */}
          <Route path="/app/dashboard" element={<DashboardPage />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to={import.meta.env.DEV ? '/styleguide' : '/app'}
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
    </AuthProvider>
  )
}

export default App
