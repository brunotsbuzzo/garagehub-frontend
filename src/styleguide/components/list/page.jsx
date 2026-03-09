import { useState } from 'react'
import { Avatar, Space, Divider, Typography, Tag, Button, Pagination } from 'antd'
import { CarOutlined, ToolOutlined, CalendarOutlined, EllipsisOutlined } from '@ant-design/icons'

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

const ListItem = ({ style, children, actions }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${G[200]}`, ...style }}>
    <div style={{ flex: 1 }}>{children}</div>
    {actions && <Space size={8}>{actions}</Space>}
  </div>
)

const ListItemMeta = ({ avatar, title, description }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    {avatar}
    <div>
      <div>{title}</div>
      {description && <Text style={{ fontSize: 12, color: G[500] }}>{description}</Text>}
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

const PAGE_SIZE = 3
const pagedData = [...services, ...services]

const ListShowcase = () => {
  const [page, setPage] = useState(1)
  const pageItems = pagedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>List</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Exibição de listas de dados com Avatar, ações e paginação. Construído com elementos nativos (antd v6 deprecou o componente List).
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Lista básica" description="Itens de texto simples.">
        <Demo>
          <div>
            {['Troca de Óleo', 'Revisão Geral', 'Alinhamento', 'Balanceamento', 'Troca de Pneus'].map((item, i, arr) => (
              <div key={item} style={{ padding: '10px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${G[200]}` : 'none' }}>
                <Text>{item}</Text>
              </div>
            ))}
          </div>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com Avatar e meta" description="Lista de veículos com avatar e detalhes.">
        <Demo>
          <div>
            {vehicles.map((v, i) => (
              <ListItem key={v.id} style={{ padding: '12px 16px', borderBottom: i < vehicles.length - 1 ? `1px solid ${G[200]}` : 'none' }}
                actions={[
                  <Button key="schedule" type="text" size="small" icon={<CalendarOutlined />} />,
                  <Button key="more" type="text" size="small" icon={<EllipsisOutlined />} />,
                ]}
              >
                <ListItemMeta
                  avatar={<Avatar size={40} icon={<CarOutlined />} style={{ background: v.bg, color: v.color }} />}
                  title={<Space><Text strong>{v.name}</Text><Tag color={statusColor[v.status]}>{v.status}</Tag></Space>}
                  description={`Placa: ${v.plate} · ${v.km}`}
                />
              </ListItem>
            ))}
          </div>
        </Demo>
      </Section>

      <Divider />

      <Section title="Lista de serviços" description="Histórico de serviços com ações e valor.">
        <Demo>
          <div>
            {services.map((s, i) => (
              <ListItem key={s.id} style={{ padding: '12px 16px', borderBottom: i < services.length - 1 ? `1px solid ${G[200]}` : 'none' }}
                actions={[
                  <Tag key="status" color={statusColor[s.status]}>{s.status}</Tag>,
                  <Text key="value" strong style={{ color: '#0E885F', minWidth: 80, textAlign: 'right' }}>{s.value}</Text>,
                ]}
              >
                <ListItemMeta
                  avatar={<Avatar size={36} icon={<ToolOutlined />} style={{ background: '#EDFCF7', color: '#0E885F' }} />}
                  title={<Text strong>{s.type}</Text>}
                  description={`${s.vehicle} · ${s.date}`}
                />
              </ListItem>
            ))}
          </div>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanho compacto" description="Lista densa com header, footer e itens pequenos.">
        <Demo>
          <div>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${G[200]}` }}>
              <Text strong>Últimos agendamentos</Text>
            </div>
            {services.slice(0, 3).map((s, i) => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: `1px solid ${G[200]}` }}>
                <Text style={{ fontSize: 13 }}>{s.type} — {s.vehicle}</Text>
                <Text style={{ fontSize: 12, color: G[500] }}>{s.date}</Text>
              </div>
            ))}
            <div style={{ padding: '8px 16px', textAlign: 'center' }}>
              <Button type="link" size="small">Ver todos</Button>
            </div>
          </div>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com paginação" description="Lista paginada para conjuntos grandes de dados.">
        <Demo>
          <div>
            {pageItems.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < pageItems.length - 1 ? `1px solid ${G[200]}` : 'none' }}>
                <div>
                  <Text strong style={{ display: 'block' }}>{s.type}</Text>
                  <Text style={{ fontSize: 12, color: G[500] }}>{s.vehicle} · {s.date}</Text>
                </div>
                <Tag color={statusColor[s.status]}>{s.status}</Tag>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', textAlign: 'center', borderTop: `1px solid ${G[200]}` }}>
            <Pagination
              current={page}
              pageSize={PAGE_SIZE}
              total={pagedData.length}
              onChange={setPage}
              size="small"
            />
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default ListShowcase
