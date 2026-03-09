import { useState } from 'react'
import { Tabs, Space, Divider, Typography, Tag, Badge, List, Button, Avatar } from 'antd'
import { CarOutlined, ToolOutlined, CalendarOutlined, BellOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 56 }}>
    <div style={{ marginBottom: 20 }}>
      <Title level={4} style={{ margin: 0, color: G[800] }}>{title}</Title>
      {description && <Paragraph style={{ margin: '6px 0 0', color: G[500], fontSize: 13 }}>{description}</Paragraph>}
    </div>
    {children}
  </section>
)

const Demo = ({ label, children, style }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', ...style }}>
      {children}
    </div>
  </div>
)

const vehicleItems = [
  { key: '1', label: <Space><CarOutlined />Meus Veículos</Space>, children: (
    <div style={{ padding: 16 }}>
      <Space orientation="vertical" style={{ width: '100%' }} size="small">
        {['Honda Civic 2022', 'Toyota Corolla 2021', 'Ford Ka 2020'].map(v => (
          <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8 }}>
            <Avatar size={32} icon={<CarOutlined />} style={{ background: '#EDFCF7', color: '#0E885F' }} />
            <Text>{v}</Text>
          </div>
        ))}
      </Space>
    </div>
  )},
  { key: '2', label: <Space><ToolOutlined />Serviços</Space>, children: (
    <div style={{ padding: 16 }}>
      <Space orientation="vertical" style={{ width: '100%' }} size="small">
        {[
          { s: 'Revisão Geral', d: 'Concluído' },
          { s: 'Troca de Óleo', d: 'Em andamento' },
          { s: 'Alinhamento', d: 'Agendado' },
        ].map(item => (
          <div key={item.s} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8 }}>
            <Text>{item.s}</Text>
            <Tag color={item.d === 'Concluído' ? 'success' : item.d === 'Em andamento' ? 'processing' : 'warning'}>{item.d}</Tag>
          </div>
        ))}
      </Space>
    </div>
  )},
  { key: '3', label: <Badge count={2}><Space><CalendarOutlined />Agendamentos</Space></Badge>, children: (
    <div style={{ padding: 16 }}>
      <Text style={{ color: G[500] }}>2 agendamentos para esta semana.</Text>
    </div>
  )},
  { key: '4', label: <Space><FileTextOutlined />Documentos</Space>, children: (
    <div style={{ padding: 16 }}>
      <Text style={{ color: G[500] }}>CRLV, CNH e seguro armazenados.</Text>
    </div>
  )},
]

const TabsShowcase = () => {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Tabs</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Navegação entre seções relacionadas de conteúdo. Suporta ícones, badges e múltiplos tipos visuais.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Tabs padrão com linha.">
        <Demo>
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: '1', label: 'Visão Geral', children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Resumo da conta e veículos.</Text></div> },
              { key: '2', label: 'Histórico', children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Histórico completo de serviços.</Text></div> },
              { key: '3', label: 'Configurações', children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Preferências e notificações.</Text></div> },
            ]}
            style={{ padding: '0 16px' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tipo card" description="type='card' — aparência de abas de navegador.">
        <Demo>
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={vehicleItems}
            style={{ padding: '16px 16px 0' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tipo editable-card" description="Abas com botão de adicionar e fechar.">
        <Demo>
          <Tabs
            type="editable-card"
            defaultActiveKey="1"
            items={[
              { key: '1', label: 'Honda Civic', closable: false, children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Detalhes do Honda Civic 2022</Text></div> },
              { key: '2', label: 'Toyota Corolla', children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Detalhes do Toyota Corolla 2021</Text></div> },
              { key: '3', label: 'Ford Ka', children: <div style={{ padding: 16 }}><Text style={{ color: G[500] }}>Detalhes do Ford Ka 2020</Text></div> },
            ]}
            style={{ padding: '16px 16px 0' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Posicionamento" description="top (padrão), bottom, left e right.">
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <Demo label="left">
            <Tabs
              tabPosition="left"
              items={[
                { key: '1', label: 'Mecânica', children: <div style={{ padding: '0 16px' }}><Text style={{ color: G[500] }}>Serviços mecânicos</Text></div> },
                { key: '2', label: 'Elétrica', children: <div style={{ padding: '0 16px' }}><Text style={{ color: G[500] }}>Serviços elétricos</Text></div> },
                { key: '3', label: 'Estética', children: <div style={{ padding: '0 16px' }}><Text style={{ color: G[500] }}>Serviços estéticos</Text></div> },
              ]}
              style={{ minHeight: 120, padding: 16 }}
            />
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Tamanho pequeno" description="size='small' para espaços compactos.">
        <Demo>
          <Tabs
            size="small"
            defaultActiveKey="1"
            items={[
              { key: '1', label: 'Todos', children: <div style={{ padding: 12 }}><Text style={{ fontSize: 13, color: G[500] }}>Todos os serviços</Text></div> },
              { key: '2', label: 'Ativos', children: <div style={{ padding: 12 }}><Text style={{ fontSize: 13, color: G[500] }}>Serviços em andamento</Text></div> },
              { key: '3', label: 'Concluídos', children: <div style={{ padding: 12 }}><Text style={{ fontSize: 13, color: G[500] }}>Serviços finalizados</Text></div> },
            ]}
            style={{ padding: '0 16px' }}
          />
        </Demo>
      </Section>
    </div>
  )
}

export default TabsShowcase
