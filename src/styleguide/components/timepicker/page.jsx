import { TimePicker, Space, Divider, Typography, Tag } from 'antd'
import dayjs from 'dayjs'

const { Title, Text, Paragraph } = Typography
const { RangePicker } = TimePicker

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '24px' }}>
      {children}
    </div>
  </div>
)

const TimePickerShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>TimePicker</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Seletor de hora. Suporta formato 12h/24h, steps, range e restrições de horário.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="TimePicker padrão 24h.">
      <Demo>
        <Space wrap>
          <TimePicker placeholder="Selecione o horário" />
          <TimePicker defaultValue={dayjs('09:00', 'HH:mm')} format="HH:mm" />
          <TimePicker disabled defaultValue={dayjs('08:00', 'HH:mm')} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Formato 12h (AM/PM)" description="Formato americano com AM/PM.">
      <Demo>
        <TimePicker use12Hours format="h:mm a" defaultValue={dayjs('09:00', 'HH:mm')} />
      </Demo>
    </Section>

    <Divider />

    <Section title="Passo customizado (step)" description="Define intervalos de minutos disponíveis.">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Demo label="Intervalos de 15 minutos">
          <TimePicker minuteStep={15} format="HH:mm" placeholder="Escolha o horário" />
        </Demo>
        <Demo label="Intervalos de 30 minutos — Agendamento">
          <TimePicker minuteStep={30} format="HH:mm" placeholder="Horário de atendimento" />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Range de horário" description="Seleção de intervalo de tempo.">
      <Demo label="Horário de funcionamento da oficina">
        <RangePicker
          format="HH:mm"
          minuteStep={30}
          placeholder={['Abertura', 'Fechamento']}
          defaultValue={[dayjs('08:00', 'HH:mm'), dayjs('18:00', 'HH:mm')]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="Small, Middle e Large.">
      <Demo>
        <Space direction="vertical" size="middle">
          <TimePicker size="small" placeholder="Small" format="HH:mm" />
          <TimePicker size="middle" placeholder="Middle" format="HH:mm" />
          <TimePicker size="large" placeholder="Large" format="HH:mm" />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Horários de agendamento" description="Grade de horários disponíveis por período.">
      <Demo>
        <Space direction="vertical" style={{ width: '100%', maxWidth: 420 }} size="middle">
          <Text strong>Horário de entrada do veículo</Text>
          <TimePicker
            minuteStep={30}
            format="HH:mm"
            style={{ width: '100%' }}
            placeholder="Ex: 08:00"
            disabledTime={() => ({
              disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23],
            })}
          />
          <Text style={{ fontSize: 12, color: G[500] }}>
            Horário de atendimento: 07h às 18h, segunda a sábado
          </Text>
          <Text strong>Previsão de entrega</Text>
          <TimePicker
            minuteStep={30}
            format="HH:mm"
            style={{ width: '100%' }}
            placeholder="Horário estimado"
          />
        </Space>
      </Demo>
    </Section>
  </div>
)

export default TimePickerShowcase
