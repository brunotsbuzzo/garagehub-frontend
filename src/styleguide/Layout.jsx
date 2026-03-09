import { useState } from 'react'
import {
  Layout, Menu, Typography, Avatar, Badge, Input, Space,
  Dropdown, Divider, ConfigProvider,
} from 'antd'
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BookOutlined,
  CarOutlined,
  BellOutlined,
  FormOutlined,
  LayoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  NodeIndexOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from './navigation'

const { Sider, Content, Header } = Layout
const { Text } = Typography

/* ── Design tokens ──────────────────────────────────────────── */
const G = {
  50:  '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}

const PRIMARY_BG = '#EDFCF7'

/* ── Section icon map ───────────────────────────────────────── */
const SECTION_ICON = {
  foundation:    <BgColorsOutlined />,
  general:       <AppstoreOutlined />,
  layout:        <LayoutOutlined />,
  navigation:    <NodeIndexOutlined />,
  'data-entry':  <FormOutlined />,
  'data-display':<TableOutlined />,
  feedback:      <MessageOutlined />,
}

const getSectionIcon = (key) => SECTION_ICON[key] ?? <BookOutlined />

/* ── Sidebar Logo ───────────────────────────────────────────── */
const SidebarLogo = ({ collapsed }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: collapsed ? '18px 0' : '18px 16px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    overflow: 'hidden',
  }}>
    <div style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: 'linear-gradient(135deg, #3DD9A4 0%, #12A875 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <CarOutlined style={{ color: '#fff', fontSize: 16 }} />
    </div>
    {!collapsed && (
      <div style={{ lineHeight: 1.2, overflow: 'hidden' }}>
        <Text strong style={{ fontSize: 14, color: G[800], display: 'block', whiteSpace: 'nowrap' }}>
          GarageHub
        </Text>
        <Text style={{ fontSize: 10, color: G[400], whiteSpace: 'nowrap' }}>Design System</Text>
      </div>
    )}
  </div>
)

/* ── Stats bar ──────────────────────────────────────────────── */
const StatsBar = () => {
  const stats = [
    { label: 'Veículos',    value: '1.284',  unit: 'cadastrados' },
    { label: 'Serviços',    value: '+127',   unit: 'esta semana',   positive: true },
    { label: 'Oficinas',    value: '38',     unit: 'ativas' },
    { label: 'Conclusão',   value: '94,2%',  unit: 'no prazo',      positive: true },
  ]

  return (
    <div style={{
      background: '#fff',
      borderBottom: `1px solid ${G[200]}`,
      padding: '6px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      fontSize: 12,
      flexWrap: 'wrap',
    }}>
      {stats.map((s, i) => (
        <span key={i} style={{ whiteSpace: 'nowrap' }}>
          <Text style={{ color: G[500], fontSize: 12 }}>{s.label}: </Text>
          <Text strong style={{ fontSize: 12, color: s.positive ? '#12A875' : G[700] }}>
            {s.value}
          </Text>
          <Text style={{ color: G[400], fontSize: 11, marginLeft: 2 }}>{s.unit}</Text>
          {i < stats.length - 1 && (
            <span style={{ color: G[300], marginLeft: 24 }}>|</span>
          )}
        </span>
      ))}
    </div>
  )
}

/* ── Layout ─────────────────────────────────────────────────── */
const StyleguideLayout = ({ children }) => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  /* avatar dropdown */
  const avatarMenu = {
    items: [
      { key: 'profile',  icon: <UserOutlined />,  label: 'Perfil' },
      { key: 'settings', icon: <SettingOutlined />, label: 'Configurações' },
      { type: 'divider' },
      { key: 'logout',   icon: <LogoutOutlined />,  label: 'Sair', danger: true },
    ],
  }

  /* build sidebar menu */
  const menuItems = navigation.map((section, idx) => {
    if (!section.items.length) return null
    return {
      type: 'group',
      key: `group-${idx}`,
      label: !collapsed ? (
        <Text style={{
          fontSize: 10, fontWeight: 600, color: G[400],
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {section.title}
        </Text>
      ) : null,
      children: section.items.map(item => ({
        key: item.href,
        icon: getSectionIcon(section.key),
        label: <Link to={item.href}>{item.name}</Link>,
      })),
    }
  }).filter(Boolean)

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* ── Sidebar ────────────────────────────────────────── */}
      <Sider
        width={220}
        collapsedWidth={64}
        collapsed={collapsed}
        breakpoint="lg"
        style={{
          background: '#fff',
          borderRight: `1px solid ${G[200]}`,
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          boxShadow: '2px 0 8px rgba(0,0,0,.04)',
        }}
      >
        <SidebarLogo collapsed={collapsed} />

        <Divider style={{ margin: '0 0 4px', borderColor: G[200] }} />

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: G[500],
                itemHoverColor: G[800],
                itemSelectedColor: '#0E885F',
                itemHoverBg: G[100],
                itemSelectedBg: PRIMARY_BG,
                iconSize: 14,
                iconMarginInlineEnd: collapsed ? 0 : 8,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            inlineCollapsed={collapsed}
            items={menuItems}
            style={{ border: 'none', background: 'transparent', padding: '0 8px' }}
            theme="light"
          />
        </ConfigProvider>
      </Sider>

      {/* ── Main ───────────────────────────────────────────── */}
      <Layout style={{ background: G[50] }}>

        {/* ── Header ───────────────────────────────────────── */}
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          height: 56,
          lineHeight: '56px',
          borderBottom: `1px solid ${G[200]}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 4px rgba(0,0,0,.06)',
        }}>
          {/* Collapse toggle */}
          <div
            onClick={() => setCollapsed(c => !c)}
            style={{ cursor: 'pointer', color: G[500], display: 'flex', alignItems: 'center', fontSize: 18 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* Search */}
          <label htmlFor="styleguide-search" style={{ flex: 1, maxWidth: 440 }}>
            <Input
              id="styleguide-search"
              name="search"
              prefix={<SearchOutlined style={{ color: G[400] }} />}
              placeholder="Buscar veículo, serviço, oficina…"
              variant="filled"
              autoComplete="off"
              aria-label="Buscar no styleguide"
              style={{ borderRadius: 8 }}
              size="middle"
            />
          </label>

          <div style={{ flex: 1 }} />

          {/* Actions */}
          <Space size={4} align="center">
            {/* Notifications */}
            <Badge count={3} size="small">
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: G[500],
                transition: 'background .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = G[100]}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <BellOutlined style={{ fontSize: 17 }} />
              </div>
            </Badge>

            {/* Settings */}
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: G[500],
            }}
              onMouseEnter={e => e.currentTarget.style.background = G[100]}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <SettingOutlined style={{ fontSize: 17 }} />
            </div>

            <Divider orientation="vertical" style={{ height: 24, margin: '0 4px' }} />

            {/* Avatar + dropdown */}
            <Dropdown menu={avatarMenu} trigger={['click']} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = G[100]}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Avatar
                  size={32}
                  style={{ background: 'linear-gradient(135deg, #3DD9A4 0%, #12A875 100%)', flexShrink: 0 }}
                  icon={<UserOutlined />}
                />
                <div style={{ lineHeight: 1.3 }}>
                  <Text strong style={{ fontSize: 13, color: G[800], display: 'block' }}>João Silva</Text>
                  <Text style={{ fontSize: 11, color: G[400] }}>Admin</Text>
                </div>
              </div>
            </Dropdown>
          </Space>
        </Header>

        {/* ── Stats bar ────────────────────────────────────── */}
        <StatsBar />

        {/* ── Content ──────────────────────────────────────── */}
        <Content style={{ margin: '24px', overflow: 'initial' }}>
          <div style={{
            padding: 32,
            minHeight: 360,
            background: '#FFFFFF',
            borderRadius: 12,
            boxShadow: '0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)',
            marginBottom: 24,
          }}>
            {children}
          </div>
        </Content>

      </Layout>
    </Layout>
  )
}

export default StyleguideLayout
