import { useState } from 'react'
import { Dropdown, Button, Space, Divider, Typography, Tag, Menu } from 'antd'
import {
  DownOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined,
  CopyOutlined, ShareAltOutlined, ExportOutlined, CarOutlined,
  ToolOutlined, MoreOutlined, UserOutlined, LogoutOutlined, SettingOutlined,
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

const Demo = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{
      background: G[50], border: `1px solid ${G[200]}`,
      borderRadius: 8, padding: '24px',
    }}>
      {children}
    </div>
  </div>
)

const vehicleMenu = {
  items: [
    { key: 'edit', label: 'Editar veículo', icon: <EditOutlined /> },
    { key: 'copy', label: 'Duplicar', icon: <CopyOutlined /> },
    { key: 'share', label: 'Compartilhar', icon: <ShareAltOutlined /> },
    { type: 'divider' },
    { key: 'export', label: 'Exportar histórico', icon: <ExportOutlined /> },
    { type: 'divider' },
    { key: 'delete', label: 'Remover veículo', icon: <DeleteOutlined />, danger: true },
  ],
}

const serviceMenu = {
  items: [
    {
      key: 'troca-oleo',
      label: 'Troca de Óleo',
      icon: <ToolOutlined />,
    },
    {
      key: 'revisao',
      label: 'Revisão Geral',
      icon: <ToolOutlined />,
    },
    {
      key: 'alinhamento',
      label: 'Alinhamento e Balanceamento',
      icon: <ToolOutlined />,
    },
    { type: 'divider' },
    {
      key: 'outros',
      label: 'Outros serviços',
      children: [
        { key: 'ar', label: 'Ar Condicionado' },
        { key: 'freios', label: 'Sistema de Freios' },
        { key: 'suspensao', label: 'Suspensão' },
      ],
    },
  ],
}

const profileMenu = {
  items: [
    { key: 'profile', label: 'Meu Perfil', icon: <UserOutlined /> },
    { key: 'settings', label: 'Configurações', icon: <SettingOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Sair', icon: <LogoutOutlined />, danger: true },
  ],
}

const DropdownShowcase = () => {
  const [lastAction, setLastAction] = useState(null)

  const handleClick = ({ key }) => setLastAction(key)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Dropdown</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Menu flutuante exibido ao clicar ou passar o mouse sobre um elemento.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Navegação</Tag>
        </Space>
      </div>

      <Section title="Básico" description="Dropdown simples com trigger padrão (click).">
        <Demo>
          <Space wrap>
            <Dropdown menu={{ items: vehicleMenu.items, onClick: handleClick }}>
              <Button>
                <Space>Ações do Veículo <DownOutlined /></Space>
              </Button>
            </Dropdown>
            {lastAction && (
              <Tag color="green">Ação: {lastAction}</Tag>
            )}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Trigger hover" description="Menu abre ao passar o mouse.">
        <Demo>
          <Dropdown menu={{ items: vehicleMenu.items }} trigger={['hover']}>
            <Button type="primary">
              <Space>Opções <DownOutlined /></Space>
            </Button>
          </Dropdown>
        </Demo>
      </Section>

      <Divider />

      <Section title="Botão ellipsis (MoreOutlined)" description="Padrão para menus de ação em linhas de tabela e cards.">
        <Demo>
          <Space size="large">
            {['Honda Civic 2022', 'Toyota Corolla 2021', 'Ford Ka 2020'].map(car => (
              <div
                key={car}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8,
                  padding: '10px 16px', minWidth: 220,
                }}
              >
                <Space>
                  <CarOutlined style={{ color: '#3DD9A4' }} />
                  <Text>{car}</Text>
                </Space>
                <Dropdown menu={{ items: vehicleMenu.items }} trigger={['click']}>
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
              </div>
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com sub-menus" description="Itens de menu com itens filhos aninhados.">
        <Demo>
          <Dropdown menu={{ items: serviceMenu.items }}>
            <Button>
              <Space>Agendar Serviço <DownOutlined /></Space>
            </Button>
          </Dropdown>
        </Demo>
      </Section>

      <Divider />

      <Section title="Posicionamento" description="Controle a posição do menu popup.">
        <Demo>
          <Space wrap>
            {['bottomLeft', 'bottom', 'bottomRight', 'topLeft', 'top', 'topRight'].map(placement => (
              <Dropdown key={placement} menu={{ items: vehicleMenu.items }} placement={placement}>
                <Button size="small">{placement}</Button>
              </Dropdown>
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Desabilitado" description="Dropdown pode ser desabilitado.">
        <Demo>
          <Space>
            <Dropdown menu={{ items: vehicleMenu.items }} disabled>
              <Button disabled>
                <Space>Desabilitado <DownOutlined /></Space>
              </Button>
            </Dropdown>
            <Dropdown menu={{ items: vehicleMenu.items }}>
              <Button>
                <Space>Habilitado <DownOutlined /></Space>
              </Button>
            </Dropdown>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Perfil de usuário" description="Caso de uso comum: menu de perfil no header.">
        <Demo>
          <Dropdown menu={{ items: profileMenu.items }} placement="bottomRight">
            <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3DD9A4, #12A875)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 600, fontSize: 13,
              }}>
                JD
              </div>
              <span>João Dono</span>
              <DownOutlined style={{ fontSize: 10 }} />
            </Button>
          </Dropdown>
        </Demo>
      </Section>
    </div>
  )
}

export default DropdownShowcase
