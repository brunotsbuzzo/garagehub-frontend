import { Statistic, Space, Divider, Typography, Tag, Row, Col, Card, Progress } from 'antd'
import { CarOutlined, ToolOutlined, RiseOutlined, FallOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

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
    <div style={{ background: G[100], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '24px' }}>
      {children}
    </div>
  </div>
)

const StatisticShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Statistic</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibição de métricas e números em destaque. Suporta prefixo, sufixo, precisão e formato customizado.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Números de destaque simples.">
      <Demo>
        <Row gutter={[32, 16]}>
          <Col><Statistic title="Veículos" value={3} /></Col>
          <Col><Statistic title="Serviços este mês" value={12} /></Col>
          <Col><Statistic title="Oficinas parceiras" value={1284} /></Col>
          <Col><Statistic title="Avaliação média" value={4.8} precision={1} /></Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com prefixo e sufixo" description="Adicione unidades e símbolos.">
      <Demo>
        <Row gutter={[32, 16]}>
          <Col>
            <Statistic
              title="Gasto total"
              prefix="R$"
              value={2847.50}
              precision={2}
              valueStyle={{ color: '#0E885F' }}
            />
          </Col>
          <Col>
            <Statistic
              title="Quilometragem"
              value={45230}
              suffix="km"
              valueStyle={{ color: '#1677FF' }}
            />
          </Col>
          <Col>
            <Statistic
              title="Próxima revisão"
              value={2770}
              suffix="km restantes"
              valueStyle={{ color: '#FAAD14' }}
            />
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com ícone" description="Ícone prefixo para identificar a métrica.">
      <Demo>
        <Row gutter={[32, 16]}>
          <Col>
            <Statistic
              title="Veículos cadastrados"
              value={3}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#0E885F' }}
            />
          </Col>
          <Col>
            <Statistic
              title="Serviços concluídos"
              value={28}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52C41A' }}
            />
          </Col>
          <Col>
            <Statistic
              title="Em andamento"
              value={2}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1677FF' }}
            />
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tendências (positivo/negativo)" description="Comparação com período anterior.">
      <Demo>
        <Row gutter={[32, 16]}>
          <Col>
            <Statistic
              title="Gasto em mar/2026"
              prefix="R$"
              value={1248.50}
              precision={2}
              valueStyle={{ color: '#0E885F' }}
              suffix={
                <span style={{ fontSize: 13, color: '#52C41A', marginLeft: 4 }}>
                  <RiseOutlined /> +12%
                </span>
              }
            />
          </Col>
          <Col>
            <Statistic
              title="Gasto em fev/2026"
              prefix="R$"
              value={1112.40}
              precision={2}
              valueStyle={{ color: G[700] }}
              suffix={
                <span style={{ fontSize: 13, color: '#FF4D4F', marginLeft: 4 }}>
                  <FallOutlined /> -8%
                </span>
              }
            />
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contagem animada" description="Statistic.Countdown para contagens regressivas.">
      <Demo label="Próximo agendamento">
        <Row gutter={[32, 16]}>
          <Col>
            <Statistic.Countdown
              title="Revisão Honda Civic"
              value={Date.now() + 3 * 24 * 60 * 60 * 1000}
              format="D[d] HH:mm:ss"
              valueStyle={{ color: '#3DD9A4' }}
            />
          </Col>
          <Col>
            <Statistic.Countdown
              title="Vencimento IPVA"
              value={Date.now() + 15 * 24 * 60 * 60 * 1000}
              format="D [dias] HH:mm"
              valueStyle={{ color: '#FAAD14' }}
            />
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Dashboard GarageHub" description="Cards de métricas no painel principal.">
      <Demo>
        <Row gutter={[16, 16]}>
          {[
            { title: 'Veículos', value: 3, suffix: '', icon: <CarOutlined />, color: '#0E885F', bg: '#EDFCF7' },
            { title: 'Serviços no mês', value: 12, suffix: '', icon: <ToolOutlined />, color: '#1677FF', bg: '#E6F4FF' },
            { title: 'Economizado', prefix: 'R$', value: 340, precision: 0, color: '#52C41A', bg: '#F6FFED' },
            { title: 'Km rodados', value: 2340, suffix: 'km', color: G[700], bg: G[100] },
          ].map(s => (
            <Col xs={12} md={6} key={s.title}>
              <Card size="small" style={{ background: s.bg, border: 'none' }}>
                <Statistic
                  title={<Text style={{ color: G[500], fontSize: 12 }}>{s.title}</Text>}
                  value={s.value}
                  prefix={s.prefix || s.icon}
                  suffix={s.suffix}
                  precision={s.precision}
                  valueStyle={{ color: s.color, fontSize: 22, fontWeight: 700 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Demo>
    </Section>
  </div>
)

export default StatisticShowcase
