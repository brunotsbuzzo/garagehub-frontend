import { List, Avatar, Space, Divider, Typography, Tag, Button, Skeleton } from 'antd'
import { CarOutlined, ToolOutlined, CalendarOutlined, RightOutlined, EllipsisOutlined } from '@ant-design/icons'

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

const Demo = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
)

const vehicles = [
  { id: '1', name: 'Honda Civic 2022', plate: 'ABC-1234', km: '45.230 km', status: 'Ativo', color: '#3DD9A4', bg: '#EDFCF7' },
  { id: '2', name: 'Toyota Corolla 2021', plate: 'DEF-5678', km: '32.100 km', status: 'Ativo', color: '#1677FF', bg: '#E6F4FF' },
  { id: '3', name: 'Ford Ka 2020', plate: 'GHI-9012', km: '78.400 km', status: 'Inativo', color: G[400], bg: G[100] },
]

const services = [
  { id: '1', type: 'Revisão Geral', vehicle: 'Honda Civic 2022', date: '15/03/2026', status: 'Concluído', value: 'R$ 299,90' },
  { id: '2', type: 'Troca de Óleo', vehicle: 'Toyota Corolla', date: '12/03/2026', status: 'Em andamento', value: 'R$ 89,90' },
  { id: '3', type: 'Alinhamento', vehicle: 'Ford Ka 2020', date: '20/03/2026', status: 'Agendado', value: 'R$ 149,90' },
  { id: '4', type: 'Freios', vehicle: 'Volkswagen Gol', date: '25/03/2026', status: 'Agendado', value: 'R$ 380,00' },
]

const statusColor = { Ativo: 'success', Inativo: 'default', Concluído: 'success', 'Em andamento': 'processing', Agendado: 'warning' }

const ListShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>List</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibição de listas de dados com suporte a Avatar, actions, extra e paginação.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Lista básica" description="Itens de texto simples.">
      <Demo>
        <List
          dataSource={['Troca de Óleo', 'Revisão Geral', 'Alinhamento', 'Balanceamento', 'Troca de Pneus']}
          renderItem={item => <List.Item style={{ padding: '10px 16px' }}><Text>{item}</Text></List.Item>}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com Avatar e meta" description="Lista de veículos com avatar e detalhes.">
      <Demo>
        <List
          dataSource={vehicles}
          renderItem={v => (
            <List.Item
              style={{ padding: '12px 16px' }}
              actions={[
                <Button key="schedule" type="text" size="small" icon={<CalendarOutlined />} />,
                <Button key="more" type="text" size="small" icon={<EllipsisOutlined />} />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar size={40} icon={<CarOutlined />} style={{ background: v.bg, color: v.color }} />
                }
                title={<Space><Text strong>{v.name}</Text><Tag color={statusColor[v.status]}>{v.status}</Tag></Space>}
                description={`Placa: ${v.plate} · ${v.km}`}
              />
            </List.Item>
          )}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Lista de serviços" description="Histórico de serviços com ações e valor.">
      <Demo>
        <List
          dataSource={services}
          renderItem={s => (
            <List.Item
              style={{ padding: '12px 16px' }}
              actions={[
                <Tag key="status" color={statusColor[s.status]}>{s.status}</Tag>,
                <Text key="value" strong style={{ color: '#0E885F', minWidth: 80, textAlign: 'right' }}>{s.value}</Text>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size={36} icon={<ToolOutlined />} style={{ background: '#EDFCF7', color: '#0E885F' }} />}
                title={<Text strong>{s.type}</Text>}
                description={`${s.vehicle} · ${s.date}`}
              />
            </List.Item>
          )}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanho compacto (small)" description="size='small' para listas densas.">
      <Demo>
        <List
          size="small"
          header={<div style={{ padding: '0 16px' }}><Text strong>Últimos agendamentos</Text></div>}
          footer={<div style={{ padding: '0 16px', textAlign: 'center' }}><Button type="link" size="small">Ver todos</Button></div>}
          bordered={false}
          dataSource={services.slice(0, 3)}
          renderItem={s => (
            <List.Item style={{ padding: '8px 16px' }}
              actions={[<Text key="date" style={{ fontSize: 12, color: G[500] }}>{s.date}</Text>]}
            >
              <Text style={{ fontSize: 13 }}>{s.type} — {s.vehicle}</Text>
            </List.Item>
          )}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com paginação" description="Lista paginada para conjuntos grandes de dados.">
      <Demo>
        <List
          pagination={{ pageSize: 3, size: 'small', align: 'center' }}
          dataSource={[...services, ...services]}
          renderItem={s => (
            <List.Item style={{ padding: '10px 16px' }}>
              <List.Item.Meta
                title={<Text>{s.type}</Text>}
                description={<Text style={{ fontSize: 12, color: G[500] }}>{s.vehicle} · {s.date}</Text>}
              />
              <Tag color={statusColor[s.status]}>{s.status}</Tag>
            </List.Item>
          )}
        />
      </Demo>
    </Section>
  </div>
)

export default ListShowcase
