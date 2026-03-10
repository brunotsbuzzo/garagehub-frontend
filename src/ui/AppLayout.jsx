import { useState } from 'react'
import {
  Avatar, Badge, Button, Dropdown, Input, Layout,
  Menu, Space, Typography, Tooltip, Divider,
} from 'antd'
import {
  BellOutlined,
  CarOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

const { Sider, Header, Content } = Layout
const { Text } = Typography

// ─── Design tokens ────────────────────────────────────────────────────────────
const HEADER_H   = 56
const SIDER_W    = 220
const COLLAPSED_W = 64

const PRIMARY    = '#3DD9A4'
const PRIMARY_DK = '#0E885F'
const PRIMARY_BG = '#EDFCF7'

const G = {
  50:  '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280',
  600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function SiderLogo({ collapsed }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: collapsed ? '20px 0' : '20px 16px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      borderBottom: `1px solid ${G[100]}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: 'linear-gradient(135deg, #3DD9A4 0%, #0E885F 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CarOutlined style={{ color: '#fff', fontSize: 17 }} />
      </div>
      {!collapsed && (
        <div style={{ overflow: 'hidden', lineHeight: 1.25 }}>
          <Text strong style={{ fontSize: 15, color: G[800], display: 'block', whiteSpace: 'nowrap' }}>
            GarageHub
          </Text>
          <Text style={{ fontSize: 11, color: G[400], whiteSpace: 'nowrap' }}>
            Gestão de Oficinas
          </Text>
        </div>
      )}
    </div>
  )
}

// ─── Header icon button ───────────────────────────────────────────────────────
function HeaderBtn({ children, tooltip, onClick, style }) {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <button
        onClick={onClick}
        style={{
          width: 40, height: HEADER_H,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: G[500], fontSize: 18, transition: 'color .15s, background .15s',
          borderRadius: 0, padding: 0, flexShrink: 0,
          ...style,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = G[800]; e.currentTarget.style.background = G[50] }}
        onMouseLeave={e => { e.currentTarget.style.color = G[500]; e.currentTarget.style.background = 'transparent' }}
      >
        {children}
      </button>
    </Tooltip>
  )
}

// ─── User menu ────────────────────────────────────────────────────────────────
function UserMenu({ user, onLogout }) {
  const initials = user?.initials
    ?? user?.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    ?? 'U'

  const items = [
    {
      key: 'info',
      label: (
        <div style={{ padding: '4px 0', minWidth: 180 }}>
          <Text strong style={{ display: 'block', fontSize: 14 }}>{user?.name ?? 'Usuário'}</Text>
          <Text style={{ fontSize: 12, color: G[400] }}>{user?.email ?? ''}</Text>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    { key: 'profile',  label: 'Meu Perfil',     icon: <UserOutlined /> },
    { key: 'settings', label: 'Configurações',   icon: <SettingOutlined /> },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Sair',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: onLogout,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <button style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'transparent', border: 'none', cursor: 'pointer',
        padding: '0 16px', height: HEADER_H,
        borderLeft: `1px solid ${G[100]}`,
        transition: 'background .15s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = G[50]}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <Avatar
          size={32}
          style={{ background: PRIMARY_BG, color: PRIMARY_DK, fontWeight: 700, flexShrink: 0 }}
        >
          {initials}
        </Avatar>
        <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
          <Text strong style={{ fontSize: 13, display: 'block', color: G[800], whiteSpace: 'nowrap' }}>
            {user?.name ?? 'Usuário'}
          </Text>
          <Text style={{ fontSize: 11, color: G[400], whiteSpace: 'nowrap' }}>
            {user?.role ?? 'Administrador'}
          </Text>
        </div>
      </button>
    </Dropdown>
  )
}

// ─── AppLayout ────────────────────────────────────────────────────────────────
/**
 * Layout base das páginas internas do GarageHub.
 *
 * Props:
 *   children           ReactNode         Conteúdo da página
 *   menuItems          AntD MenuProps[]  Itens de navegação (icon, label, key, children)
 *   selectedKey        string            Chave do item ativo (default: pathname)
 *   openKeys           string[]          Submenus abertos por padrão
 *   user               object            { name, email, role, initials }
 *   notificationCount  number            Contagem de notificações
 *   onLogout           function          Callback ao clicar em Sair
 *   onSearch           function          Callback da busca global (value) => void
 *   headerExtra        ReactNode         Conteúdo extra no lado direito do header
 *   siderExtra         ReactNode         Conteúdo extra no rodapé do sider
 */
export default function AppLayout({
  children,
  menuItems = [],
  selectedKey,
  openKeys,
  user,
  notificationCount = 0,
  onLogout,
  onSearch,
  headerExtra,
  siderExtra,
}) {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')

  const activeKey = selectedKey ?? pathname

  const handleSearch = (e) => {
    setSearch(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <Layout style={{ minHeight: '100vh', background: G[50] }}>

      {/* ── Sider ─────────────────────────────────────────────────────────── */}
      <Sider
        width={SIDER_W}
        collapsedWidth={COLLAPSED_W}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        style={{
          background: '#fff',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 8px 0 rgba(0,0,0,0.06)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Logo */}
          <SiderLogo collapsed={collapsed} />

          {/* Menu */}
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' }}>
            <Menu
              mode="inline"
              selectedKeys={[activeKey]}
              defaultOpenKeys={openKeys}
              inlineCollapsed={collapsed}
              items={menuItems}
              style={{ border: 'none', background: 'transparent' }}
              theme="light"
            />
          </div>

          {/* Sider footer / extra */}
          <div style={{ borderTop: `1px solid ${G[100]}`, padding: collapsed ? '12px 0' : '12px 16px' }}>
            {siderExtra}
            <Tooltip title={collapsed ? (collapsed ? 'Expandir' : '') : undefined} placement="right">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(c => !c)}
                style={{
                  width: '100%', textAlign: collapsed ? 'center' : 'left',
                  color: G[400], justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                {!collapsed && 'Recolher menu'}
              </Button>
            </Tooltip>
          </div>

        </div>
      </Sider>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <Layout style={{ background: G[50] }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Header style={{
          background: '#fff',
          padding: 0,
          height: HEADER_H,
          lineHeight: `${HEADER_H}px`,
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 99,
          boxShadow: `0 1px 0 0 ${G[100]}`,
        }}>

          {/* Search */}
          <div style={{ flex: 1, padding: '0 24px' }}>
            <Input
              prefix={<SearchOutlined style={{ color: G[300] }} />}
              placeholder="Buscar..."
              value={search}
              onChange={handleSearch}
              allowClear
              variant="filled"
              style={{ maxWidth: 360, borderRadius: 8 }}
            />
          </div>

          {/* Right actions */}
          <Space size={0} style={{ height: HEADER_H }}>

            <HeaderBtn tooltip="Ajuda">
              <QuestionCircleOutlined />
            </HeaderBtn>

            <HeaderBtn tooltip="Idioma">
              <GlobalOutlined />
            </HeaderBtn>

            <HeaderBtn tooltip={`${notificationCount} notificações`}>
              <Badge
                count={notificationCount}
                size="small"
                offset={[-2, 4]}
                style={{ boxShadow: 'none' }}
              >
                <BellOutlined style={{ fontSize: 18, color: G[500] }} />
              </Badge>
            </HeaderBtn>

            {headerExtra}

            <div style={{ height: HEADER_H, display: 'flex', alignItems: 'center' }}>
              <Divider type="vertical" style={{ height: 24, margin: '0 4px', borderColor: G[100] }} />
            </div>

            <UserMenu user={user} onLogout={onLogout} />

          </Space>
        </Header>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <Content style={{ padding: 24, minHeight: `calc(100vh - ${HEADER_H}px)` }}>
          {children}
        </Content>

      </Layout>
    </Layout>
  )
}
