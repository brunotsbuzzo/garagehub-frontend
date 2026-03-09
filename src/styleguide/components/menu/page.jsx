import { useState } from 'react'
import { Menu, Space, Divider, Typography, Tag, Row, Col } from 'antd'
import {
  HomeOutlined, CarOutlined, ToolOutlined, CalendarOutlined,
  SettingOutlined, UserOutlined, BellOutlined, FileTextOutlined,
  DashboardOutlined, ShopOutlined, AppstoreOutlined,
  SafetyOutlined, StarOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 56 }}>
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

const Demo = ({ label, children, style }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{
      background: G[50], border: `1px solid ${G[200]}`,
      borderRadius: 8, padding: '16px', ...style,
    }}>
      {children}
    </div>
  </div>
)

const sidebarItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'vehicles', icon: <CarOutlined />, label: 'Meus Veículos' },
  {
    key: 'services',
    icon: <ToolOutlined />,
    label: 'Serviços',
    children: [
      { key: 'schedule', label: 'Agendamentos' },
      { key: 'history', label: 'Histórico' },
      { key: 'budget', label: 'Orçamentos' },
    ],
  },
  { key: 'workshops', icon: <ShopOutlined />, label: 'Oficinas' },
  { key: 'notifications', icon: <BellOutlined />, label: 'Notificações' },
  { type: 'divider' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Configurações' },
  { key: 'profile', icon: <UserOutlined />, label: 'Meu Perfil' },
]

const horizontalItems = [
  { key: 'home', icon: <HomeOutlined />, label: 'Início' },
  { key: 'vehicles', icon: <CarOutlined />, label: 'Veículos' },
  {
    key: 'services',
    icon: <ToolOutlined />,
    label: 'Serviços',
    children: [
      { key: 'oil', label: 'Troca de Óleo' },
      { key: 'review', label: 'Revisão Geral' },
      { key: 'align', label: 'Alinhamento' },
    ],
  },
  { key: 'workshops', icon: <ShopOutlined />, label: 'Oficinas' },
  { key: 'about', icon: <AppstoreOutlined />, label: 'Sobre' },
]

const MenuShowcase = () => {
  const [selectedInline, setSelectedInline] = useState(['dashboard'])
  const [openKeys, setOpenKeys] = useState(['services'])

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Menu</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Componente de navegação que oferece modos inline, horizontal e vertical.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Navegação</Tag>
        </Space>
      </div>

      <Section title="Modo horizontal" description="Menu horizontal — ideal para navbar/topbar.">
        <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8 }}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={horizontalItems}
            style={{ borderBottom: 'none' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Modo inline (sidebar)" description="Menu lateral com itens colapsáveis — padrão para sidebars.">
        <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8 }}>
          <Row>
            <Col span={7}>
              <Menu
                mode="inline"
                selectedKeys={selectedInline}
                openKeys={openKeys}
                onSelect={({ selectedKeys }) => setSelectedInline(selectedKeys)}
                onOpenChange={setOpenKeys}
                items={sidebarItems}
                style={{ height: 360, borderRight: `1px solid ${G[200]}` }}
              />
            </Col>
            <Col span={17} style={{ padding: '24px 20px' }}>
              <Text style={{ color: G[500] }}>
                Selecionado: <Text strong>{selectedInline[0]}</Text>
              </Text>
            </Col>
          </Row>
        </Demo>
      </Section>

      <Divider />

      <Section title="Modo inline colapsado" description="Sider recolhido — exibe apenas ícones.">
        <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8 }}>
          <Menu
            mode="inline"
            inlineCollapsed
            defaultSelectedKeys={['vehicles']}
            items={sidebarItems}
            style={{ width: 64, height: 320 }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tema dark" description="Menu com tema escuro — ideal para sidebars com fundo escuro.">
        <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8, background: '#001529' }}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['dashboard']}
            defaultOpenKeys={['services']}
            items={sidebarItems}
            style={{ height: 360, borderRight: 'none', background: '#001529' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Sem ícones — simples" description="Menu de links textuais sem ícones.">
        <Demo>
          <Menu
            mode="inline"
            defaultSelectedKeys={['review']}
            items={[
              { key: 'oil', label: 'Troca de Óleo' },
              { key: 'review', label: 'Revisão Geral' },
              { key: 'align', label: 'Alinhamento e Balanceamento' },
              { key: 'ac', label: 'Ar Condicionado' },
              { key: 'brakes', label: 'Sistema de Freios' },
            ]}
            style={{ width: 240 }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com badge / extra" description="Itens com conteúdo extra (ex: notificações).">
        <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8 }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['notifications']}
            items={[
              { key: 'home', icon: <HomeOutlined />, label: 'Início' },
              {
                key: 'notifications',
                icon: <BellOutlined />,
                label: (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Notificações
                    <Tag color="red" style={{ margin: 0, fontSize: 11 }}>3</Tag>
                  </div>
                ),
              },
              {
                key: 'budget',
                icon: <FileTextOutlined />,
                label: (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Orçamentos
                    <Tag color="orange" style={{ margin: 0, fontSize: 11 }}>Novo</Tag>
                  </div>
                ),
              },
              { key: 'settings', icon: <SettingOutlined />, label: 'Configurações' },
            ]}
            style={{ width: 240 }}
          />
        </Demo>
      </Section>
    </div>
  )
}

export default MenuShowcase
