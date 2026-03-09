import { useState } from 'react'
import {
  Layout, Menu, Typography, Input,
  ConfigProvider, Tooltip,
} from 'antd'
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BookOutlined,
  CarOutlined,
  FormOutlined,
  LayoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  NodeIndexOutlined,
  SearchOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from './navigation'

const { Sider, Content, Header } = Layout
const { Text } = Typography

/* ── Design tokens (from Figma + GarageHub brand) ──────────── */
const HEADER_BG   = '#9CA3AF'   // header background
const HEADER_H    = 48          // Figma: global-header height
const SIDER_W     = 208         // Figma: sider width
const PRIMARY_DK  = '#0E885F'   // GarageHub dark green (active text)
const PRIMARY_BG  = '#EDFCF7'   // GarageHub active bg (adapted from Figma #E6F7FF)
const DIVIDER_CLR = '#F0F0F0'   // Figma: border & divider

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
}

/* ── Section icon map ───────────────────────────────────────── */
const SECTION_ICON = {
  foundation:     <BgColorsOutlined />,
  general:        <AppstoreOutlined />,
  layout:         <LayoutOutlined />,
  navigation:     <NodeIndexOutlined />,
  'data-entry':   <FormOutlined />,
  'data-display': <TableOutlined />,
  feedback:       <MessageOutlined />,
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

/* ── Header icon button (dark bg) ───────────────────────────── */
/* From Figma: toolbar icons use rgba(255,255,255,0) bg on hover */
const HeaderIconBtn = ({ children, tooltip }) => (
  <Tooltip title={tooltip} placement="bottom">
    <div style={{
      width: 40, height: HEADER_H,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: 'rgba(255,255,255,0.85)',
      fontSize: 16, flexShrink: 0,
      transition: 'background .15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </div>
  </Tooltip>
)

/* ── Highlight match ────────────────────────────────────────── */
const Highlight = ({ text, query }) => {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: '#FDE68A', color: '#92400E', borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

/* ── Layout ─────────────────────────────────────────────────── */
const StyleguideLayout = ({ children }) => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  /* filter navigation by search query */
  const q = searchQuery.trim().toLowerCase()
  const filteredNav = navigation
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        !q || item.name.toLowerCase().includes(q)
      ),
    }))
    .filter(section => section.items.length > 0)

  /* build sidebar menu items */
  const menuItems = filteredNav.map((section, idx) => ({
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
      label: (
        <Link to={item.href}>
          <Highlight text={item.name} query={q} />
        </Link>
      ),
    })),
  }))

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* ── Sidebar ────────────────────────────────────────── */}
      {/* Figma: white bg, width 208px, shadow 0px 2px 8px rgba(0,0,0,.15) */}
      <Sider
        width={SIDER_W}
        collapsedWidth={64}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        style={{
          background: '#fff',
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          /* Figma shadow adapted for left-side sider */
          boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        <SidebarLogo collapsed={collapsed} />

        {/* Menu items — scroll area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  /* Figma: item text rgba(0,0,0,.85), selected #1890FF → GarageHub green */
                  itemColor:         'rgba(0,0,0,0.65)',
                  itemHoverColor:    'rgba(0,0,0,0.85)',
                  itemSelectedColor: PRIMARY_DK,
                  itemHoverBg:       G[50],
                  itemSelectedBg:    PRIMARY_BG,
                  iconSize:          14,
                  iconMarginInlineEnd: collapsed ? 0 : 8,
                  /* Figma: item height 40px */
                  itemHeight:        40,
                },
              },
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              inlineCollapsed={collapsed}
              items={menuItems}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '8px',
                /* Figma: active item right border 3px in primary color */
              }}
              theme="light"
            />
          </ConfigProvider>
        </div>

      </Sider>

      {/* ── Main ───────────────────────────────────────────── */}
      <Layout style={{ background: G[50] }}>

        {/* ── Header ───────────────────────────────────────── */}
        {/* Figma: bg #001529, height 48px, white icons/text   */}
        <Header style={{
          background: HEADER_BG,
          padding: '0 16px',
          height: HEADER_H,
          lineHeight: `${HEADER_H}px`,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          /* Figma: inset bottom shadow divider */
          boxShadow: `inset 0 -1px 0 0 ${DIVIDER_CLR}`,
        }}>

          {/* Collapse toggle */}
          <HeaderIconBtn tooltip={collapsed ? 'Expandir menu' : 'Recolher menu'}>
            <div onClick={() => setCollapsed(c => !c)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </HeaderIconBtn>

          {/* Search — adapted from Figma toolbar */}
          <div style={{ flex: 1, maxWidth: 360, marginLeft: 8 }}>
            <label htmlFor="styleguide-search">
              <Input
                id="styleguide-search"
                name="search"
                prefix={<SearchOutlined style={{ color: '#6B7280' }} />}
                placeholder="Buscar componente, token…"
                autoComplete="off"
                aria-label="Buscar no styleguide"
                size="middle"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                allowClear
                style={{
                  borderRadius: 6,
                  background: '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }}
                styles={{
                  input: { background: 'transparent', color: '#1F2937' },
                }}
              />
            </label>
          </div>

        </Header>

        {/* ── Content ──────────────────────────────────────── */}
        <Content style={{ margin: 24, overflow: 'initial' }}>
          <div style={{
            padding: 32,
            minHeight: 360,
            background: '#FFFFFF',
            borderRadius: 8,
            /* Figma: card border rgba(0,0,0,.06) + subtle shadow */
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02)',
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
