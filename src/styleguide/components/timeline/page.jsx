import { Timeline, Space, Divider, Typography, Tag } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, CalendarOutlined, ToolOutlined, CarOutlined } from '@ant-design/icons'

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '24px 32px' }}>
      {children}
    </div>
  </div>
)

const serviceTimeline = [
  {
    dot: <CheckCircleOutlined style={{ fontSize: 14 }} />,
    color: '#52C41A',
    children: (
      <div>
        <Text strong style={{ display: 'block' }}>Serviço concluído</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>20/03/2026 17:30 · Revisão Geral aprovada pelo mecânico</Text>
      </div>
    ),
  },
  {
    dot: <CheckCircleOutlined style={{ fontSize: 14 }} />,
    color: '#3DD9A4',
    children: (
      <div>
        <Text strong style={{ display: 'block' }}>Troca de óleo realizada</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>20/03/2026 14:00 · Óleo 5W30 sintético trocado</Text>
      </div>
    ),
  },
  {
    dot: <SyncOutlined spin style={{ fontSize: 14 }} />,
    color: '#1677FF',
    children: (
      <div>
        <Text strong style={{ display: 'block' }}>Diagnóstico em andamento</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>20/03/2026 10:30 · Verificação completa dos sistemas</Text>
      </div>
    ),
  },
  {
    dot: <CheckCircleOutlined style={{ fontSize: 14 }} />,
    color: '#52C41A',
    children: (
      <div>
        <Text strong style={{ display: 'block' }}>Veículo recebido</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>20/03/2026 09:05 · Carlos Ferreira recebeu o veículo</Text>
      </div>
    ),
  },
  {
    dot: <CalendarOutlined style={{ fontSize: 14 }} />,
    color: '#9CA3AF',
    children: (
      <div>
        <Text strong style={{ display: 'block' }}>Agendamento confirmado</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>15/03/2026 14:22 · João Silva confirmou o agendamento</Text>
      </div>
    ),
  },
]

const TimelineShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Timeline</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibição cronológica de eventos e histórico. Suporta ícones, cores e modo alternado.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Timeline simples com eventos.">
      <Demo>
        <Timeline
          items={[
            { children: 'Veículo cadastrado — Honda Civic 2022' },
            { children: 'Primeira revisão agendada' },
            { children: 'Troca de óleo realizada' },
            { children: 'Revisão geral aprovada' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com cores e ícones" description="Dots coloridos e ícones personalizados.">
      <Demo label="Histórico completo de serviço">
        <Timeline items={serviceTimeline} />
      </Demo>
    </Section>

    <Divider />

    <Section title="Modo alternado" description="Items alternados à esquerda e direita.">
      <Demo>
        <Timeline
          mode="alternate"
          items={[
            { children: 'Orçamento solicitado', color: '#9CA3AF' },
            { children: 'Orçamento aprovado', color: '#3DD9A4', label: '10/03' },
            { children: 'Peças encomenadas', color: '#1677FF', label: '12/03' },
            { children: 'Peças recebidas', color: '#52C41A', label: '15/03' },
            { children: 'Serviço iniciado', color: '#3DD9A4', label: '20/03 09:00' },
            { children: 'Serviço concluído', color: '#52C41A', label: '20/03 17:30' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Pendente (pending)" description="Último item pendente — ação futura em aberto.">
      <Demo label="Acompanhamento em tempo real">
        <Timeline
          pending={<Text style={{ color: G[500] }}>Aguardando conclusão do serviço...</Text>}
          pendingDot={<SyncOutlined spin />}
          items={[
            { dot: <CheckCircleOutlined />, color: '#52C41A', children: 'Agendamento confirmado — 15/03' },
            { dot: <CheckCircleOutlined />, color: '#52C41A', children: 'Veículo entregue na oficina — 20/03 09:00' },
            { dot: <SyncOutlined spin />, color: '#1677FF', children: 'Diagnóstico em andamento — 20/03 10:30' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Posição à direita" description="Todos os itens alinhados à direita.">
      <Demo>
        <Timeline
          mode="right"
          items={[
            { children: 'Veículo cadastrado', color: '#3DD9A4' },
            { children: '1ª revisão realizada', color: '#3DD9A4' },
            { children: '2ª revisão realizada', color: '#3DD9A4' },
            { children: 'Seguro renovado', color: '#1677FF' },
            { children: 'IPVA pago', color: '#52C41A' },
          ]}
        />
      </Demo>
    </Section>
  </div>
)

export default TimelineShowcase
