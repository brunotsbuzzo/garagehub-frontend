import { useLocation } from 'react-router-dom'
import { AppLayout } from '../../ui'
import { useAuth } from '../../store/AuthContext'
import { getMenuItems } from '../../config/navigation'

export default function DashboardPage() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  return (
    <AppLayout
      menuItems={getMenuItems(user?.role)}
      selectedKey={pathname}
      openKeys={['servicos', 'veiculos']}
      user={user}
      notificationCount={3}
      onLogout={logout}
      onSearch={(v) => console.log('search:', v)}
    >
      {/* Conteúdo do dashboard aqui */}
      <div>dashboard content</div>
    </AppLayout>
  )
}
