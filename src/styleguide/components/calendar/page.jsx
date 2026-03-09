import { Calendar, Badge, Space, Divider, Typography, Tag, Select } from 'antd'
import dayjs from 'dayjs'

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

const serviceEvents = {
  '2026-03-15': [{ type: 'success', content: 'Revisão Geral — Civic' }],
  '2026-03-20': [
    { type: 'processing', content: 'Troca de Óleo — Corolla' },
    { type: 'warning', content: 'Alinhamento — Ka' },
  ],
  '2026-03-25': [{ type: 'error', content: 'Freios — Gol (urgente)' }],
  '2026-03-28': [{ type: 'default', content: 'IPVA vence — Corolla' }],
}

function getListData(value) {
  const dateStr = value.format('YYYY-MM-DD')
  return serviceEvents[dateStr] || []
}

const dateCellRender = (value) => {
  const listData = getListData(value)
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={<Text style={{ fontSize: 11 }}>{item.content}</Text>} />
        </li>
      ))}
    </ul>
  )
}

const CalendarShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Calendar</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Visualização de calendário mensal ou anual com suporte a eventos e marcações.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Calendário completo com eventos" description="Calendário mensal com agendamentos de serviço marcados.">
      <Demo>
        <Calendar
          cellRender={(current, info) => {
            if (info.type === 'date') return dateCellRender(current)
            return info.originNode
          }}
          defaultValue={dayjs('2026-03-01')}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Modo painel (card)" description="fullscreen=false para uso em cards ou sidebars.">
      <Demo label="Mini calendário para agendamento">
        <div style={{ padding: 16 }}>
          <Calendar
            fullscreen={false}
            defaultValue={dayjs('2026-03-20')}
          />
        </div>
      </Demo>
    </Section>

    <Divider />

    <Section title="Visualização anual" description="mode='year' exibe todos os meses do ano.">
      <Demo>
        <Calendar
          mode="year"
          defaultValue={dayjs('2026-01-01')}
          fullscreen
          style={{ minHeight: 400 }}
        />
      </Demo>
    </Section>
  </div>
)

export default CalendarShowcase
