import { Card, Space, Divider, Typography, Tag, Button, Avatar, Statistic, Row, Col, Progress } from 'antd'
import { CarOutlined, ToolOutlined, CalendarOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Meta } = Card

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

const CardShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Card</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Container visual para agrupar conteúdo relacionado. Suporta cabeçalho, rodapé, ações e variantes.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Card simples com título e conteúdo.">
      <Demo>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card title="Veículos cadastrados">
              <Statistic value={3} suffix="veículos" valueStyle={{ color: '#0E885F' }} />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Serviços este mês">
              <Statistic value={7} suffix="serviços" valueStyle={{ color: '#1677FF' }} />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Gasto total">
              <Statistic prefix="R$" value={1248.50} precision={2} valueStyle={{ color: '#0E885F' }} />
            </Card>
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com extra e ações no header" description="Title, extra e actions no Card.">
      <Demo>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title="Honda Civic 2022"
              extra={<Tag color="success">Ativo</Tag>}
              actions={[
                <CalendarOutlined key="schedule" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Space direction="vertical" size="small">
                <Text style={{ color: G[500] }}>Placa: <Text strong>ABC-1234</Text></Text>
                <Text style={{ color: G[500] }}>Km: <Text strong>45.230 km</Text></Text>
                <Text style={{ color: G[500] }}>Próxima revisão: <Text strong style={{ color: '#FAAD14' }}>em 2.770 km</Text></Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Toyota Corolla 2021"
              extra={<Tag color="default">Inativo</Tag>}
              actions={[
                <CalendarOutlined key="schedule" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Space direction="vertical" size="small">
                <Text style={{ color: G[500] }}>Placa: <Text strong>DEF-5678</Text></Text>
                <Text style={{ color: G[500] }}>Km: <Text strong>32.100 km</Text></Text>
                <Text style={{ color: G[500] }}>Revisão: <Text strong style={{ color: '#52C41A' }}>em dia</Text></Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Variantes" description="hoverable, bordered e size.">
      <Demo>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card hoverable title="Hoverable" size="small">
              <Text style={{ color: G[500], fontSize: 13 }}>Passe o mouse para ver o efeito de elevação.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} title="Sem borda" size="small" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Text style={{ color: G[500], fontSize: 13 }}>Card com sombra, sem borda.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" title="Compacto (small)">
              <Text style={{ color: G[500], fontSize: 13 }}>Padding reduzido para espaços menores.</Text>
            </Card>
          </Col>
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Cards com progresso — Serviços em andamento" description="Dashboard de status de serviços.">
      <Demo>
        <Row gutter={[16, 16]}>
          {[
            { title: 'Revisão Geral', vehicle: 'Honda Civic 2022', percent: 85, color: '#3DD9A4', eta: '2h' },
            { title: 'Troca de Óleo', vehicle: 'Toyota Corolla', percent: 60, color: '#1677FF', eta: '45min' },
            { title: 'Alinhamento', vehicle: 'Ford Ka 2020', percent: 30, color: '#FAAD14', eta: '3h' },
          ].map(s => (
            <Col xs={24} sm={8} key={s.title}>
              <Card size="small" title={s.title} extra={<Tag color="processing">Em andamento</Tag>}>
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Text style={{ fontSize: 12, color: G[500] }}>{s.vehicle}</Text>
                  <Progress percent={s.percent} strokeColor={s.color} size="small" />
                  <Text style={{ fontSize: 12, color: G[500] }}>Previsão: <Text style={{ color: G[700] }}>{s.eta}</Text></Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Demo>
    </Section>

    <Divider />

    <Section title="Card Grid" description="Cards internos usando Card.Grid.">
      <Demo>
        <Card title="Categorias de serviço">
          <Row>
            {[
              { icon: <ToolOutlined />, label: 'Mecânica', count: 12 },
              { icon: <CarOutlined />, label: 'Elétrica', count: 5 },
              { icon: <CheckCircleOutlined />, label: 'Revisões', count: 8 },
              { icon: <CalendarOutlined />, label: 'Agendados', count: 3 },
            ].map(item => (
              <Card.Grid key={item.label} style={{ width: '25%', textAlign: 'center', padding: 16 }} hoverable>
                <div style={{ fontSize: 20, color: '#3DD9A4', marginBottom: 6 }}>{item.icon}</div>
                <Text strong style={{ display: 'block', fontSize: 13 }}>{item.label}</Text>
                <Text style={{ color: G[500], fontSize: 12 }}>{item.count} serviços</Text>
              </Card.Grid>
            ))}
          </Row>
        </Card>
      </Demo>
    </Section>
  </div>
)

export default CardShowcase
