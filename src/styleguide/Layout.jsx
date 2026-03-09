import { Layout, Menu, Typography, Divider, ConfigProvider } from 'antd'
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BuildOutlined,
  FileTextOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from './navigation'

const { Sider, Content } = Layout
const { Text } = Typography

/* gray scale tokens */
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

const ICON_MAP = {
  'Tokens de Design': <BgColorsOutlined />,
  'Tipografia':       <FileTextOutlined />,
  'Componentes Base': <AppstoreOutlined />,
  'Layouts':          <BuildOutlined />,
  'Dashboard':        <DashboardOutlined />,
  'Configurações':    <SettingOutlined />,
}

const getIcon = (name) => ICON_MAP[name] ?? <AppstoreOutlined />

/* ── Logo ──────────────────────────────────────────────────── */
const SidebarLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 20px 16px' }}>
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: G[700],
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          stroke={G[300]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9 22 9 12 15 12 15 22"
          stroke={G[300]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div style={{ lineHeight: 1.2 }}>
      <Text strong style={{ fontSize: 15, color: G[800], display: 'block' }}>GarageHub</Text>
      <Text style={{ fontSize: 10, color: G[400] }}>Design System</Text>
    </div>
  </div>
)

/* ── Layout ────────────────────────────────────────────────── */
const StyleguideLayout = ({ children }) => {
  const { pathname } = useLocation()

  const menuItems = navigation.map((section, idx) => {
    if (section.items.length === 0) return null
    return {
      type: 'group',
      key: `group-${idx}`,
      label: (
        <Text style={{ fontSize: 10, fontWeight: 600, color: G[400], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {section.title}
        </Text>
      ),
      children: section.items.map(item => ({
        key: item.href,
        icon: getIcon(item.name),
        label: <Link to={item.href} style={{ fontWeight: 500 }}>{item.name}</Link>,
      })),
    }
  }).filter(Boolean)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: G[50],
          borderRight: `1px solid ${G[200]}`,
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        <SidebarLogo />

        <Divider style={{ margin: '0 0 8px', borderColor: G[200] }} />

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: G[400],
                itemHoverColor: G[600],
                itemSelectedColor: G[800],
                itemHoverBg: G[100],
                itemSelectedBg: G[200],
                iconSize: 14,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent', padding: '0 8px' }}
            theme="light"
          />
        </ConfigProvider>

        {/* ── Rodapé ──────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px 16px',
          borderTop: `1px solid ${G[200]}`,
        }}>
          <div style={{
            background: G[100],
            border: `1px solid ${G[200]}`,
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 2 }}>
              Prompt 2 → Componentes
            </Text>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', lineHeight: 1.4 }}>
              Adicione componentes de UI ao styleguide
            </Text>
          </div>
        </div>
      </Sider>

      <Layout style={{ background: G[100] }}>
        <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
          <div style={{
            padding: 32,
            minHeight: 360,
            background: '#FFFFFF',
            borderRadius: 12,
            boxShadow: `0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)`,
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
