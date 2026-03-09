import { DatePicker, Space, Divider, Typography, Tag } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import locale from 'antd/es/date-picker/locale/pt_BR'

const { Title, Text, Paragraph } = Typography
const { RangePicker, TimePicker, WeekPicker, MonthPicker, YearPicker, QuarterPicker } = DatePicker

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

const disabledDate = (current) => current && current < dayjs().startOf('day')

const DatePickerShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>DatePicker</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Seletor de data e hora. Inclui variantes para data, hora, semana, mês, trimestre e ano, além de RangePicker.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="DatePicker padrão com locale PT-BR.">
      <Demo>
        <Space wrap>
          <DatePicker locale={locale} placeholder="Selecione a data" />
          <DatePicker locale={locale} defaultValue={dayjs()} />
          <DatePicker locale={locale} disabled />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com hora" description="Picker de data e hora combinados.">
      <Demo>
        <Space wrap>
          <DatePicker locale={locale} showTime placeholder="Data e hora" />
          <DatePicker
            locale={locale}
            showTime={{ format: 'HH:mm' }}
            format="DD/MM/YYYY HH:mm"
            placeholder="Agendar serviço"
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="RangePicker" description="Seleção de intervalo de datas.">
      <Demo>
        <Space direction="vertical" size="middle">
          <RangePicker locale={locale} />
          <RangePicker
            locale={locale}
            showTime
            format="DD/MM/YYYY HH:mm"
            placeholder={['Data início', 'Data fim']}
          />
          <RangePicker locale={locale} picker="month" placeholder={['Mês início', 'Mês fim']} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Variantes de picker" description="Semana, Mês, Trimestre e Ano.">
      <Demo>
        <Space wrap>
          <DatePicker locale={locale} picker="week" placeholder="Semana" />
          <DatePicker locale={locale} picker="month" placeholder="Mês" />
          <DatePicker locale={locale} picker="quarter" placeholder="Trimestre" />
          <DatePicker locale={locale} picker="year" placeholder="Ano" />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Datas desabilitadas" description="Bloqueie datas no passado (somente futuro).">
      <Demo label="Agendamento — apenas datas futuras">
        <Space wrap>
          <DatePicker
            locale={locale}
            disabledDate={disabledDate}
            placeholder="Escolha uma data futura"
          />
          <RangePicker
            locale={locale}
            disabledDate={disabledDate}
            placeholder={['Início', 'Fim']}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos e estados" description="Small, Middle, Large — padrão, erro e aviso.">
      <Demo>
        <Space direction="vertical" size="middle">
          <Space wrap>
            <DatePicker locale={locale} size="small" placeholder="Small" />
            <DatePicker locale={locale} size="middle" placeholder="Middle" />
            <DatePicker locale={locale} size="large" placeholder="Large" />
          </Space>
          <Space wrap>
            <DatePicker locale={locale} status="error" placeholder="Erro" />
            <DatePicker locale={locale} status="warning" placeholder="Aviso" />
          </Space>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Agendamento" description="Fluxo de agendamento de serviço.">
      <Demo>
        <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 400 }}>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Data de entrada do veículo
            </Text>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Selecione a data"
            />
          </div>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Horário preferido
            </Text>
            <DatePicker
              locale={locale}
              picker="time"
              format="HH:mm"
              minuteStep={30}
              style={{ width: '100%' }}
              placeholder="Selecione o horário"
            />
          </div>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Previsão de retirada
            </Text>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Data prevista"
            />
          </div>
        </Space>
      </Demo>
    </Section>
  </div>
)

export default DatePickerShowcase
