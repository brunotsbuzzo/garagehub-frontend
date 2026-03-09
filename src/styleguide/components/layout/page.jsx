import { useState } from 'react'
import {
  Layout, Row, Col, Space, Divider, Typography, Tag, Table, Switch, Alert, Badge,
  Menu, Avatar, Breadcrumb, Button,
} from 'antd'
import {
  CarOutlined,
  ToolOutlined,
  ShopOutlined,
  TeamOutlined,
  BarChartOutlined,
  CalendarOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content, Footer } = Layout
const { Title, Text, Paragraph } = Typography

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
const PRIMARY    = '#3DD9A4'
const PRIMARY_BG = '#EDFCF7'
const PRIMARY_DK = '#12A875'

/* ── Helpers ────────────────────────────────────────────────── */
const Section = ({ id, title, description, children }) => (
  <section id={id} style={{ marginBottom: 56 }}>
    <div style={{ marginBottom: 20 }}>
      <Title level={4} style={{ margin: 0, color: G[800] }}>{title}</Title>
      {description && (
        <Paragraph style={{ margin: '6px 0 0', color: G[500], fontSize: 13 }}>
          {description}
        </Paragraph>
      )}
    </div>
    {children}
  </section>
)

const CodeBlock = ({ code }) => (
  <pre style={{
    background: '#1E293B',
    borderRadius: '0 0 8px 8px',
    padding: '16px 20px',
    fontSize: 12,
    lineHeight: 1.8,
    overflowX: 'auto',
    color: '#94A3B8',
    margin: 0,
  }}>
    <code>{code}</code>
  </pre>
)

const DemoCard = ({ children, code, noPad }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    <div style={{
      background: G[50],
      borderBottom: `1px solid ${G[200]}`,
      padding: noPad ? 0 : '24px 20px',
    }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* ── Mini-layout block visuals ──────────────────────────────── */
const MiniBlock = ({ label, color, height = 32, style = {} }) => (
  <div style={{
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height,
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.04em',
    ...style,
  }}>
    {label}
  </div>
)

const HEADER_COLOR  = '#001529'
const SIDER_COLOR   = '#0F2537'
const CONTENT_COLOR = '#c9f0de'
const CONTENT_TXT   = PRIMARY_DK
const FOOTER_COLOR  = '#7dbcea'

/* ── API table ──────────────────────────────────────────────── */
const apiCols = [
  { title: 'Prop', dataIndex: 'prop', width: 150,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Componente', dataIndex: 'component', width: 110,
    render: v => <Tag color={{ Layout:'blue', Header:'purple', Sider:'orange', Content:'green', Footer:'cyan' }[v] ?? 'default'} style={{ fontSize: 11 }}>{v}</Tag> },
  { title: 'Tipo', dataIndex: 'type', width: 220,
    render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 80,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiData = [
  { key: 'hasSider',       component: 'Layout',  prop: 'hasSider',       type: 'boolean',                    default: '—',      description: 'Indica que o Layout contém um Sider filho (evita flash de estilo)' },
  { key: 'prefixCls',      component: 'Layout',  prop: 'prefixCls',      type: 'string',                     default: '—',      description: 'Prefixo de classe CSS customizado' },
  { key: 'h-height',       component: 'Header',  prop: 'height',         type: 'number | string',            default: '64px',   description: 'Altura do cabeçalho (token: Layout.headerHeight)' },
  { key: 'h-bg',           component: 'Header',  prop: 'style.background',type: 'string',                   default: '#001529',description: 'Cor de fundo padrão (dark navy). Sobrescreva via style ou tema.' },
  { key: 's-width',        component: 'Sider',   prop: 'width',          type: 'number | string',            default: '200',    description: 'Largura do Sider quando expandido' },
  { key: 's-collapsed',    component: 'Sider',   prop: 'collapsed',      type: 'boolean',                    default: 'false',  description: 'Controla o estado retraído (controlled)' },
  { key: 's-collapsedW',   component: 'Sider',   prop: 'collapsedWidth', type: 'number',                     default: '80',     description: 'Largura quando retraído. 0 = oculta com botão flutuante' },
  { key: 's-collapsible',  component: 'Sider',   prop: 'collapsible',    type: 'boolean',                    default: 'false',  description: 'Exibe o botão de collapse nativo (arrow)' },
  { key: 's-breakpoint',   component: 'Sider',   prop: 'breakpoint',     type: "'xs'|'sm'|'md'|'lg'|'xl'|'xxl'", default: '—', description: 'Colapsa o Sider automaticamente abaixo deste breakpoint' },
  { key: 's-theme',        component: 'Sider',   prop: 'theme',          type: "'light' | 'dark'",           default: "'dark'", description: 'Tema visual do Sider' },
  { key: 's-trigger',      component: 'Sider',   prop: 'trigger',        type: 'ReactNode | null',           default: '—',      description: 'Customiza o botão de collapse. null = remove o trigger nativo' },
  { key: 's-onCollapse',   component: 'Sider',   prop: 'onCollapse',     type: '(collapsed, type) => void',  default: '—',      description: 'Callback disparado ao retrair/expandir' },
  { key: 's-onBreakpoint', component: 'Sider',   prop: 'onBreakpoint',   type: '(broken) => void',           default: '—',      description: 'Callback disparado ao atingir o breakpoint responsivo' },
  { key: 'c-style',        component: 'Content', prop: 'style',          type: 'CSSProperties',              default: '—',      description: 'Estilos inline — use para margin, padding e overflow' },
  { key: 'f-style',        component: 'Footer',  prop: 'style',          type: 'CSSProperties',              default: '—',      description: 'Estilos inline do rodapé' },
]

/* ══════════════════════════════════════════════════════════════
   SHOWCASE
═══════════════════════════════════════════════════════════════ */
export default function LayoutShowcase() {
  const [collapsed, setCollapsed] = useState(false)
  const [darkSider, setDarkSider] = useState(true)

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue"    style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="cyan"    style={{ borderRadius: 4 }}>Layout</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>Header / Sider / Content / Footer</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Layout</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Componentes de estrutura de página do Ant Design. Combine{' '}
          <Text code>{'<Layout>'}</Text>, <Text code>{'<Header>'}</Text>,{' '}
          <Text code>{'<Sider>'}</Text>, <Text code>{'<Content>'}</Text> e{' '}
          <Text code>{'<Footer>'}</Text> para compor qualquer arquitetura de UI —
          de dashboards com sidebar a portais com header fixo.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          message="Composição por aninhamento"
          description={
            <span>
              Layouts são compostos por aninhamento. Um <Text code>{'<Layout>'}</Text> pode conter
              outro <Text code>{'<Layout>'}</Text> internamente — por exemplo, um{' '}
              <Text code>Sider</Text> dentro do content de um layout com header fixo.
            </span>
          }
        />
      </div>

      {/* ── 1. Estrutura básica ──────────────────────────────── */}
      <Section
        id="basic"
        title="Estruturas básicas"
        description="Os quatro padrões de layout mais comuns em aplicações web."
      >
        {/* Top → Content → Footer */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Header · Content · Footer</Text>
        </div>
        <DemoCard
          noPad
          code={`import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

<Layout>
  <Header>Header</Header>
  <Content>Content</Content>
  <Footer>Footer</Footer>
</Layout>`}
        >
          <Layout style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
            <Header style={{ background: HEADER_COLOR, height: 48, lineHeight: '48px', padding: '0 16px' }}>
              <MiniBlock label="Header" color="transparent" />
            </Header>
            <Content style={{ background: CONTENT_COLOR, minHeight: 72 }}>
              <MiniBlock label="Content" color={CONTENT_COLOR} height={72} style={{ color: CONTENT_TXT }} />
            </Content>
            <Footer style={{ background: FOOTER_COLOR, padding: 0, height: 36 }}>
              <MiniBlock label="Footer" color={FOOTER_COLOR} height={36} />
            </Footer>
          </Layout>
        </DemoCard>

        {/* Top → Sider + Content → Footer */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Header · Sider + Content · Footer</Text>
        </div>
        <DemoCard
          noPad
          code={`<Layout>
  <Header>Header</Header>
  <Layout>
    <Sider>Sider</Sider>
    <Content>Content</Content>
  </Layout>
  <Footer>Footer</Footer>
</Layout>`}
        >
          <Layout style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
            <Header style={{ background: HEADER_COLOR, height: 48, lineHeight: '48px', padding: 0 }}>
              <MiniBlock label="Header" color="transparent" />
            </Header>
            <Layout>
              <Sider width={80} style={{ background: SIDER_COLOR, minHeight: 100 }}>
                <MiniBlock label="Sider" color={SIDER_COLOR} height={100} />
              </Sider>
              <Content style={{ background: CONTENT_COLOR }}>
                <MiniBlock label="Content" color={CONTENT_COLOR} height={100} style={{ color: CONTENT_TXT }} />
              </Content>
            </Layout>
            <Footer style={{ background: FOOTER_COLOR, padding: 0, height: 36 }}>
              <MiniBlock label="Footer" color={FOOTER_COLOR} height={36} />
            </Footer>
          </Layout>
        </DemoCard>

        {/* Sider + (Header + Content + Footer) */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Sider + (Header · Content · Footer)</Text>
        </div>
        <DemoCard
          noPad
          code={`<Layout hasSider>
  <Sider>Sider</Sider>
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
</Layout>`}
        >
          <Layout hasSider style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
            <Sider width={80} style={{ background: SIDER_COLOR }}>
              <MiniBlock label="Sider" color={SIDER_COLOR} height={156} />
            </Sider>
            <Layout>
              <Header style={{ background: HEADER_COLOR, height: 48, lineHeight: '48px', padding: 0 }}>
                <MiniBlock label="Header" color="transparent" />
              </Header>
              <Content style={{ background: CONTENT_COLOR }}>
                <MiniBlock label="Content" color={CONTENT_COLOR} height={72} style={{ color: CONTENT_TXT }} />
              </Content>
              <Footer style={{ background: FOOTER_COLOR, padding: 0, height: 36 }}>
                <MiniBlock label="Footer" color={FOOTER_COLOR} height={36} />
              </Footer>
            </Layout>
          </Layout>
        </DemoCard>
      </Section>

      {/* ── 2. Sider colapsável ──────────────────────────────── */}
      <Section
        id="sider"
        title="Sider — Colapsável"
        description="O Sider suporta collapse controlado e automático por breakpoint. Demonstração interativa abaixo."
      >
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Switch checked={collapsed} onChange={setCollapsed} size="small" />
            <Text style={{ fontSize: 13, color: G[600] }}>
              collapsed: <Text code>{String(collapsed)}</Text>
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Switch checked={darkSider} onChange={setDarkSider} size="small" />
            <Text style={{ fontSize: 13, color: G[600] }}>
              theme: <Text code>{darkSider ? 'dark' : 'light'}</Text>
            </Text>
          </div>
        </div>

        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 0 }}>
          <div style={{ borderBottom: `1px solid ${G[200]}` }}>
            <Layout hasSider style={{ height: 280, overflow: 'hidden' }}>
              <Sider
                width={200}
                collapsedWidth={64}
                collapsed={collapsed}
                theme={darkSider ? 'dark' : 'light'}
                style={{
                  borderRight: darkSider ? 'none' : `1px solid ${G[200]}`,
                  transition: 'width .2s',
                }}
              >
                {/* Logo */}
                <div style={{
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? 0 : '0 16px',
                  gap: 10,
                  borderBottom: `1px solid ${darkSider ? 'rgba(255,255,255,.08)' : G[200]}`,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 7, flexShrink: 0,
                    background: 'linear-gradient(135deg, #3DD9A4 0%, #12A875 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CarOutlined style={{ color: '#fff', fontSize: 15 }} />
                  </div>
                  {!collapsed && (
                    <div>
                      <Text strong style={{ fontSize: 13, color: darkSider ? '#fff' : G[800], display: 'block', lineHeight: 1.2 }}>
                        GarageHub
                      </Text>
                      <Text style={{ fontSize: 10, color: darkSider ? 'rgba(255,255,255,.45)' : G[400] }}>
                        Admin
                      </Text>
                    </div>
                  )}
                </div>

                <Menu
                  mode="inline"
                  theme={darkSider ? 'dark' : 'light'}
                  inlineCollapsed={collapsed}
                  defaultSelectedKeys={['dashboard']}
                  style={{ border: 'none', fontSize: 13 }}
                  items={[
                    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                    { key: 'vehicles',  icon: <CarOutlined />,        label: 'Veículos' },
                    { key: 'services',  icon: <ToolOutlined />,        label: 'Serviços' },
                    { key: 'workshops', icon: <ShopOutlined />,        label: 'Oficinas' },
                    { key: 'team',      icon: <TeamOutlined />,        label: 'Equipe' },
                    { key: 'reports',   icon: <FileTextOutlined />,    label: 'Relatórios' },
                  ]}
                />
              </Sider>

              <Layout style={{ background: G[50] }}>
                <Header style={{
                  background: '#fff',
                  borderBottom: `1px solid ${G[200]}`,
                  padding: '0 20px',
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <button
                    onClick={() => setCollapsed(c => !c)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: G[500], fontSize: 18, display: 'flex', alignItems: 'center',
                      padding: 4, borderRadius: 4,
                    }}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                  <div style={{ flex: 1 }} />
                  <Badge count={3} size="small">
                    <BellOutlined style={{ fontSize: 17, color: G[500], cursor: 'pointer' }} />
                  </Badge>
                  <Avatar
                    size={30}
                    style={{ background: 'linear-gradient(135deg, #3DD9A4, #12A875)', cursor: 'pointer' }}
                    icon={<UserOutlined />}
                  />
                </Header>

                <Content style={{ margin: 16, overflow: 'hidden' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: 8,
                    border: `1px solid ${G[200]}`,
                    padding: 16,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: G[400], fontSize: 13 }}>Conteúdo da página</Text>
                  </div>
                </Content>
              </Layout>
            </Layout>
          </div>
          <CodeBlock code={`<Layout hasSider>
  <Sider
    width={200}
    collapsedWidth={64}
    collapsed={collapsed}
    theme="dark"
    breakpoint="lg"
    onBreakpoint={broken => setCollapsed(broken)}
  >
    <Menu mode="inline" inlineCollapsed={collapsed} items={menuItems} />
  </Sider>

  <Layout>
    <Header style={{ background: '#fff', padding: '0 20px' }}>
      <MenuFoldOutlined onClick={() => setCollapsed(c => !c)} />
    </Header>
    <Content style={{ margin: 24 }}>
      {/* page content */}
    </Content>
  </Layout>
</Layout>`} />
        </div>
      </Section>

      {/* ── 3. Header fixo ───────────────────────────────────── */}
      <Section
        id="fixed-header"
        title="Header Fixo"
        description="Use position sticky ou fixed no Header para mantê-lo visível durante o scroll."
      >
        <DemoCard
          code={`<Layout>
  <Header style={{
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderBottom: '1px solid #E5E7EB',
    boxShadow: '0 1px 4px rgba(0,0,0,.06)',
  }}>
    {/* nav content */}
  </Header>

  <Content style={{ padding: '24px 48px', marginTop: 0 }}>
    {/* page content */}
  </Content>
</Layout>

{/* Alternativa — position fixed (requer marginTop no Content) */}
<Header style={{ position: 'fixed', top: 0, zIndex: 100, width: '100%' }} />
<Content style={{ marginTop: 64 }}>…</Content>`}
        >
          <Layout style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${G[200]}` }}>
            <Header style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: '#fff',
              borderBottom: `1px solid ${G[200]}`,
              height: 52,
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,.06)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'linear-gradient(135deg, #3DD9A4, #12A875)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CarOutlined style={{ color: '#fff', fontSize: 13 }} />
              </div>
              <Text strong style={{ fontSize: 13, color: G[800] }}>GarageHub</Text>
              <div style={{ flex: 1 }} />
              {['Dashboard', 'Veículos', 'Serviços', 'Oficinas'].map(item => (
                <Text
                  key={item}
                  style={{
                    fontSize: 12,
                    color: item === 'Dashboard' ? PRIMARY_DK : G[500],
                    cursor: 'pointer',
                    fontWeight: item === 'Dashboard' ? 600 : 400,
                  }}
                >
                  {item}
                </Text>
              ))}
              <Avatar size={28} style={{ background: PRIMARY, marginLeft: 8 }} icon={<UserOutlined />} />
            </Header>
            <Content style={{ background: G[50], minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: G[400], fontSize: 12 }}>Content com scroll (header permanece fixo no topo)</Text>
            </Content>
          </Layout>
        </DemoCard>
      </Section>

      {/* ── 4. Layout GarageHub completo ─────────────────────── */}
      <Section
        id="real-layout"
        title="Layout Completo — GarageHub Dashboard"
        description="Exemplo de aplicação real: sidebar colapsável + header com ações + breadcrumb + área de conteúdo com cards KPI."
      >
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <Layout hasSider style={{ height: 420 }}>
            {/* Sider */}
            <Sider
              width={200}
              style={{
                background: '#fff',
                borderRight: `1px solid ${G[200]}`,
                overflow: 'auto',
              }}
            >
              {/* Logo */}
              <div style={{
                height: 56,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0 16px',
                borderBottom: `1px solid ${G[200]}`,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 7,
                  background: 'linear-gradient(135deg, #3DD9A4, #12A875)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CarOutlined style={{ color: '#fff', fontSize: 14 }} />
                </div>
                <div>
                  <Text strong style={{ fontSize: 13, color: G[800], display: 'block', lineHeight: 1.2 }}>GarageHub</Text>
                  <Text style={{ fontSize: 10, color: G[400] }}>v2.4.0</Text>
                </div>
              </div>

              <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={['dashboard']}
                style={{ border: 'none', fontSize: 12, marginTop: 4 }}
                items={[
                  {
                    type: 'group', label: (
                      <Text style={{ fontSize: 10, fontWeight: 600, color: G[400], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Principal
                      </Text>
                    ),
                    children: [
                      { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                      { key: 'vehicles',  icon: <CarOutlined />,        label: 'Veículos' },
                      { key: 'services',  icon: <ToolOutlined />,        label: 'Serviços' },
                    ],
                  },
                  {
                    type: 'group', label: (
                      <Text style={{ fontSize: 10, fontWeight: 600, color: G[400], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Gestão
                      </Text>
                    ),
                    children: [
                      { key: 'workshops', icon: <ShopOutlined />,     label: 'Oficinas' },
                      { key: 'team',      icon: <TeamOutlined />,      label: 'Equipe' },
                      { key: 'calendar',  icon: <CalendarOutlined />,  label: 'Agenda' },
                      { key: 'reports',   icon: <BarChartOutlined />,  label: 'Relatórios' },
                    ],
                  },
                ]}
              />

              {/* Bottom user */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '12px 16px',
                borderTop: `1px solid ${G[200]}`,
                display: 'flex', alignItems: 'center', gap: 8, background: '#fff',
              }}>
                <Avatar size={28} style={{ background: 'linear-gradient(135deg, #3DD9A4, #12A875)', flexShrink: 0 }} icon={<UserOutlined />} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <Text strong style={{ fontSize: 12, color: G[800], display: 'block', lineHeight: 1.2, whiteSpace: 'nowrap' }}>João Silva</Text>
                  <Text style={{ fontSize: 10, color: G[400] }}>Admin</Text>
                </div>
                <LogoutOutlined style={{ color: G[400], fontSize: 13, cursor: 'pointer' }} />
              </div>
            </Sider>

            {/* Main area */}
            <Layout style={{ background: G[50] }}>
              {/* Header */}
              <Header style={{
                background: '#fff',
                borderBottom: `1px solid ${G[200]}`,
                height: 56,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                position: 'sticky',
                top: 0,
                zIndex: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              }}>
                <Breadcrumb
                  style={{ fontSize: 12 }}
                  items={[
                    { title: <HomeOutlined style={{ fontSize: 12 }} /> },
                    { title: 'Dashboard' },
                  ]}
                />
                <div style={{ flex: 1 }} />
                {/* Quick stats */}
                <div style={{
                  display: 'flex', gap: 16, alignItems: 'center',
                  fontSize: 12, color: G[500],
                }}>
                  <span>
                    <Text style={{ color: G[400], fontSize: 11 }}>Serviços hoje: </Text>
                    <Text strong style={{ color: PRIMARY_DK, fontSize: 12 }}>24</Text>
                  </span>
                  <span style={{ color: G[300] }}>|</span>
                  <span>
                    <Text style={{ color: G[400], fontSize: 11 }}>Em andamento: </Text>
                    <Text strong style={{ color: '#FAAD14', fontSize: 12 }}>7</Text>
                  </span>
                </div>
                <Badge count={3} size="small">
                  <div style={{
                    width: 32, height: 32, borderRadius: 7, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    color: G[500],
                  }}>
                    <BellOutlined style={{ fontSize: 16 }} />
                  </div>
                </Badge>
                <div style={{
                  width: 32, height: 32, borderRadius: 7, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  color: G[500],
                }}>
                  <SettingOutlined style={{ fontSize: 16 }} />
                </div>
              </Header>

              {/* Page content */}
              <Content style={{ margin: '16px 16px 0', overflow: 'hidden' }}>
                {/* Page title */}
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Title level={5} style={{ margin: 0, color: G[800] }}>Dashboard</Title>
                    <Text style={{ fontSize: 12, color: G[500] }}>Visão geral · 9 de março de 2026</Text>
                  </div>
                  <Button type="primary" size="small" icon={<AppstoreOutlined />}>
                    Novo serviço
                  </Button>
                </div>

                {/* KPI row */}
                <Row gutter={[12, 12]}>
                  {[
                    { icon: <CarOutlined />,     label: 'Veículos',     value: '1.284', delta: '+12 hoje',  positive: true },
                    { icon: <ToolOutlined />,     label: 'Serviços',     value: '127',   delta: '+8 hoje',   positive: true },
                    { icon: <ShopOutlined />,     label: 'Oficinas',     value: '38',    delta: '2 inativas', positive: false },
                    { icon: <BarChartOutlined />, label: 'Conclusão',    value: '94,2%', delta: '+1.3% semana', positive: true },
                  ].map((stat, i) => (
                    <Col key={i} span={6}>
                      <div style={{
                        background: '#fff',
                        border: `1px solid ${G[200]}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <Text style={{ fontSize: 11, color: G[500] }}>{stat.label}</Text>
                          <div style={{
                            width: 26, height: 26, borderRadius: 6,
                            background: PRIMARY_BG,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: PRIMARY_DK, fontSize: 12,
                          }}>
                            {stat.icon}
                          </div>
                        </div>
                        <Text strong style={{ fontSize: 18, color: G[800], display: 'block', lineHeight: 1 }}>
                          {stat.value}
                        </Text>
                        <Text style={{ fontSize: 10, color: stat.positive ? PRIMARY_DK : '#FF4D4F', marginTop: 4, display: 'block' }}>
                          {stat.delta}
                        </Text>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* Secondary row */}
                <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
                  <Col span={16}>
                    <div style={{
                      background: '#fff',
                      border: `1px solid ${G[200]}`,
                      borderRadius: 8,
                      padding: '12px 14px',
                      height: 120,
                    }}>
                      <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>
                        Últimos serviços
                      </Text>
                      {[
                        { plate: 'ABC-1234', car: 'Toyota Corolla',  service: 'Revisão completa',         status: 'Concluído',    color: '#52C41A' },
                        { plate: 'DEF-5678', car: 'VW Gol',          service: 'Troca de óleo',            status: 'Em andamento', color: '#FAAD14' },
                        { plate: 'GHI-9012', car: 'Honda Civic',     service: 'Alinhamento',              status: 'Aguardando',   color: G[400] },
                      ].map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: 10, alignItems: 'center',
                          padding: '4px 0',
                          borderBottom: i < 2 ? `1px solid ${G[100]}` : 'none',
                        }}>
                          <Text code style={{ fontSize: 10, color: G[600], flexShrink: 0 }}>{item.plate}</Text>
                          <Text style={{ fontSize: 11, color: G[600], flex: 1 }}>{item.car} — {item.service}</Text>
                          <Tag color={item.color} style={{ fontSize: 10, margin: 0, lineHeight: '18px' }}>{item.status}</Tag>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{
                      background: PRIMARY_BG,
                      border: `1px solid ${PRIMARY}40`,
                      borderRadius: 8,
                      padding: '12px 14px',
                      height: 120,
                    }}>
                      <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>
                        Técnicos ativos
                      </Text>
                      {['Carlos M.', 'Ana P.', 'Ricardo S.'].map((name, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: '50%',
                            background: PRIMARY,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, color: '#fff', fontWeight: 700,
                          }}>
                            {name[0]}
                          </div>
                          <Text style={{ fontSize: 11, color: G[700] }}>{name}</Text>
                          <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#52C41A' }} />
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Layout>
        </div>

        <CodeBlock code={`<Layout hasSider style={{ minHeight: '100vh' }}>
  <Sider width={220} theme="light" style={{ borderRight: '1px solid #E5E7EB' }}>
    {/* logo, menu, user info */}
  </Sider>

  <Layout>
    <Header style={{
      background: '#fff',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 56,
    }}>
      {/* breadcrumb, search, notifications, avatar */}
    </Header>

    <Content style={{ margin: 24 }}>
      {/* page title + KPI cards + tables */}
    </Content>
  </Layout>
</Layout>`} />
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 5. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props">
        <Table
          columns={apiCols}
          dataSource={apiData}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          bordered={false}
        />
      </Section>

      {/* ── 6. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Landmarks HTML5', 'Substituir divs do Layout por <header>, <nav>, <main>, <aside> e <footer> melhora a navegação por leitores de tela e cumpre WCAG 1.3.1.'],
            ['Sider e nav', 'Envolva o Menu dentro do Sider em um <nav aria-label="Navegação principal"> para identificar a região corretamente.'],
            ['Skip link', 'Adicione um link "Pular para o conteúdo" (<a href="#main-content">) antes do Header para usuários de teclado.'],
            ['Focus management', 'Ao colapsar o Sider automaticamente (breakpoint), mova o foco para o botão de reabertura ou para o Content para não deixar o foco preso na sidebar oculta.'],
            ['Contraste do Header', 'O Header dark padrão (#001529) atende a razão de contraste WCAG AA para texto branco. Verifique ao customizar cores.'],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              background: G[50], borderRadius: 8, border: `1px solid ${G[200]}`,
            }}>
              <Text code style={{ flexShrink: 0, fontSize: 12, color: '#1677FF' }}>{title}</Text>
              <Text style={{ fontSize: 13, color: G[700] }}>{desc}</Text>
            </div>
          ))}
        </Space>
      </Section>

    </div>
  )
}
