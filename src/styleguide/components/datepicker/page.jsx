import { DatePicker, Space, Divider, Typography, Tag } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import locale from 'antd/es/date-picker/locale/pt_BR'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo')
dayjs.locale('pt-br')

const { Title, Text, Paragraph } = Typography
const { RangePicker } = DatePicker

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const FORMAT_DATE     = 'DD/MM/YYYY'
const FORMAT_DATETIME = 'DD/MM/YYYY HH:mm:ss'
const FORMAT_TIME     = 'HH:mm:ss'

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

const disabledDate = (current) => current && current < dayjs().tz('America/Sao_Paulo').startOf('day')

const DatePickerShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>DatePicker</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Seletor de data e hora no fuso America/Sao_Paulo, formato brasileiro (DD/MM/YYYY HH:mm:ss).
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description={`Formato padrão brasileiro: ${FORMAT_DATE} — fuso America/Sao_Paulo.`}>
      <Demo>
        <Space wrap>
          <DatePicker
            locale={locale}
            format={FORMAT_DATE}
            placeholder="Selecione a data"
          />
          <DatePicker
            locale={locale}
            format={FORMAT_DATE}
            defaultValue={dayjs().tz('America/Sao_Paulo')}
          />
          <DatePicker locale={locale} format={FORMAT_DATE} disabled />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com data e hora" description={`Formato completo: ${FORMAT_DATETIME}`}>
      <Demo>
        <Space wrap>
          <DatePicker
            locale={locale}
            showTime
            format={FORMAT_DATETIME}
            placeholder="Data e hora"
          />
          <DatePicker
            locale={locale}
            showTime={{ format: 'HH:mm:ss', use12Hours: false }}
            format={FORMAT_DATETIME}
            placeholder="Agendar serviço"
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Somente hora" description={`Formato: ${FORMAT_TIME}`}>
      <Demo>
        <Space wrap>
          <DatePicker
            locale={locale}
            picker="time"
            format={FORMAT_TIME}
            use12Hours={false}
            placeholder="Horário"
          />
          <DatePicker
            locale={locale}
            picker="time"
            format="HH:mm"
            minuteStep={15}
            placeholder="Horário (15min)"
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="RangePicker" description="Seleção de intervalo de datas.">
      <Demo>
        <Space orientation="vertical" size="middle">
          <RangePicker locale={locale} format={FORMAT_DATE} />
          <RangePicker
            locale={locale}
            showTime={{ format: 'HH:mm:ss' }}
            format={FORMAT_DATETIME}
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

    <Section title="Datas desabilitadas" description="Somente datas futuras (a partir de hoje em SP).">
      <Demo label="Agendamento — apenas datas futuras">
        <Space wrap>
          <DatePicker
            locale={locale}
            format={FORMAT_DATE}
            disabledDate={disabledDate}
            placeholder="Escolha uma data futura"
          />
          <RangePicker
            locale={locale}
            format={FORMAT_DATE}
            disabledDate={disabledDate}
            placeholder={['Início', 'Fim']}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos e estados" description="Small, Middle, Large — erro e aviso.">
      <Demo>
        <Space orientation="vertical" size="middle">
          <Space wrap>
            <DatePicker locale={locale} format={FORMAT_DATE} size="small" placeholder="Small" />
            <DatePicker locale={locale} format={FORMAT_DATE} size="middle" placeholder="Middle" />
            <DatePicker locale={locale} format={FORMAT_DATE} size="large" placeholder="Large" />
          </Space>
          <Space wrap>
            <DatePicker locale={locale} format={FORMAT_DATE} status="error" placeholder="Erro" />
            <DatePicker locale={locale} format={FORMAT_DATE} status="warning" placeholder="Aviso" />
          </Space>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Agendamento" description="Fluxo de agendamento com data/hora no fuso de São Paulo.">
      <Demo>
        <Space orientation="vertical" size="middle" style={{ width: '100%', maxWidth: 400 }}>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Data e hora de entrada
            </Text>
            <DatePicker
              locale={locale}
              showTime={{ format: 'HH:mm:ss' }}
              format={FORMAT_DATETIME}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              placeholder="DD/MM/AAAA HH:mm:ss"
            />
          </div>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Data de entrada (somente dia)
            </Text>
            <DatePicker
              locale={locale}
              format={FORMAT_DATE}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Previsão de retirada
            </Text>
            <DatePicker
              locale={locale}
              format={FORMAT_DATE}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              placeholder="DD/MM/AAAA"
            />
          </div>
        </Space>
      </Demo>
    </Section>
  </div>
)

export default DatePickerShowcase
