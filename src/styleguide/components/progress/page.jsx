import { Progress, Space, Divider, Typography, Tag, Row, Col } from 'antd'

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '24px' }}>
      {children}
    </div>
  </div>
)

const ProgressShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Progress</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Indicador visual de progresso para uploads, processos e conclusão de tarefas.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
    </div>

    <Section title="Barra linear" description="Progress bar com diferentes porcentagens e status.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%', maxWidth: 480 }} size="middle">
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} strokeColor="#3DD9A4" />
          <Progress percent={100} />
          <Progress percent={45} status="exception" />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Cores personalizadas" description="Customize strokeColor para cores da marca.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%', maxWidth: 480 }} size="middle">
          <div>
            <Text style={{ fontSize: 12, color: G[500], display: 'block', marginBottom: 6 }}>GarageHub Primary</Text>
            <Progress percent={75} strokeColor="#3DD9A4" />
          </div>
          <div>
            <Text style={{ fontSize: 12, color: G[500], display: 'block', marginBottom: 6 }}>Gradiente</Text>
            <Progress
              percent={85}
              strokeColor={{ '0%': '#3DD9A4', '100%': '#0E885F' }}
            />
          </div>
          <div>
            <Text style={{ fontSize: 12, color: G[500], display: 'block', marginBottom: 6 }}>Warning</Text>
            <Progress percent={60} strokeColor="#FAAD14" />
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Circular" description="Progress em formato circular.">
      <Demo>
        <Space size="large" wrap>
          <Progress type="circle" percent={30} />
          <Progress type="circle" percent={70} strokeColor="#3DD9A4" />
          <Progress type="circle" percent={100} />
          <Progress type="circle" percent={45} status="exception" />
          <Progress
            type="circle"
            percent={85}
            strokeColor={{ '0%': '#3DD9A4', '100%': '#0E885F' }}
            format={p => <Text strong style={{ color: '#0E885F' }}>{p}%</Text>}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Dashboard" description="Variante semicircular.">
      <Demo>
        <Space size="large" wrap>
          <Progress type="dashboard" percent={75} strokeColor="#3DD9A4" />
          <Progress type="dashboard" percent={45} status="exception" />
          <Progress type="dashboard" percent={100} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="Tamanho pequeno e padrão.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%', maxWidth: 480 }} size="middle">
          <Progress size="small" percent={70} strokeColor="#3DD9A4" />
          <Progress percent={70} strokeColor="#3DD9A4" />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Multi-segmentos (steps)" description="Progress dividido em segmentos.">
      <Demo label="Etapas do serviço concluídas">
        <Progress steps={5} percent={60} strokeColor="#3DD9A4" />
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Dashboard de serviços" description="Indicadores de progresso em cards de status.">
      <Demo>
        <Row gutter={[16, 16]}>
          {[
            { label: 'Revisão Geral — Honda Civic', percent: 85, color: '#3DD9A4', status: 'Em andamento' },
            { label: 'Troca de Óleo — Toyota Corolla', percent: 100, color: '#52C41A', status: 'Concluído' },
            { label: 'Alinhamento — Ford Ka', percent: 20, color: '#1677FF', status: 'Iniciado' },
            { label: 'Freios — Volkswagen Gol', percent: 45, color: '#FAAD14', status: 'Aguardando peça' },
          ].map(s => (
            <Col xs={24} sm={12} key={s.label}>
              <div style={{ padding: 16, background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13 }}>{s.label}</Text>
                  <Tag color={s.percent === 100 ? 'success' : 'processing'} style={{ fontSize: 11 }}>{s.status}</Tag>
                </div>
                <Progress percent={s.percent} strokeColor={s.color} size="small" />
              </div>
            </Col>
          ))}
        </Row>
      </Demo>
    </Section>
  </div>
)

export default ProgressShowcase
