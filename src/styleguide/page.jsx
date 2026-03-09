import { useState } from 'react'
import {
  ConfigProvider, theme, Typography, Space, Button, Card, Badge,
  Alert, Radio, Tag, Divider, Switch, Row, Col, Avatar, Progress,
  Tooltip, Statistic,
} from 'antd'
import {
  CheckCircleOutlined, WarningOutlined, InfoCircleOutlined,
  CloseCircleOutlined, UserOutlined, BellOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

/* ── Helpers ───────────────────────────────────────────────── */

const ColorSwatch = ({ color, label, textColor = '#111827' }) => (
  <Tooltip title={color}>
    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 8,
        background: color, margin: '0 auto 4px',
        border: '1px solid rgba(0,0,0,.06)',
      }} />
      <Text style={{ fontSize: 10, color: '#6B7280', display: 'block' }}>{label}</Text>
      <Text style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace' }}>{color}</Text>
    </div>
  </Tooltip>
)

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 48 }}>
    <Title level={3} style={{ marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #F3F4F6' }}>
      {title}
    </Title>
    {children}
  </div>
)

const RadiusBox = ({ radius, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      width: 80, height: 80,
      background: 'var(--color-primary-100)',
      border: '2px solid var(--color-primary-400)',
      borderRadius: radius,
      margin: '0 auto 8px',
    }} />
    <Text style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>{label}</Text>
    <Text style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace' }}>{radius}</Text>
  </div>
)

const ShadowBox = ({ shadow, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      width: 80, height: 80,
      background: '#FFFFFF',
      borderRadius: 8,
      boxShadow: shadow,
      margin: '0 auto 8px',
    }} />
    <Text style={{ fontSize: 12, color: '#6B7280' }}>{label}</Text>
  </div>
)

/* ── Color Scales ──────────────────────────────────────────── */

const primaryScale = [
  { shade: '50',  hex: '#EDFCF7' },
  { shade: '100', hex: '#D3F9ED' },
  { shade: '200', hex: '#A8F2DA' },
  { shade: '300', hex: '#70E6C1' },
  { shade: '400', hex: '#3DD9A4' },
  { shade: '500', hex: '#1CC78E' },
  { shade: '600', hex: '#12A875' },
  { shade: '700', hex: '#0E885F' },
  { shade: '800', hex: '#0E6B4D' },
  { shade: '900', hex: '#0C5840' },
]

const grayScale = [
  { shade: '50',  hex: '#F9FAFB' },
  { shade: '100', hex: '#F3F4F6' },
  { shade: '200', hex: '#E5E7EB' },
  { shade: '300', hex: '#D1D5DB' },
  { shade: '400', hex: '#9CA3AF' },
  { shade: '500', hex: '#6B7280' },
  { shade: '600', hex: '#4B5563' },
  { shade: '700', hex: '#374151' },
  { shade: '800', hex: '#1F2937' },
  { shade: '900', hex: '#111827' },
]

/* ── Page Component ────────────────────────────────────────── */

const StyleguidePage = () => {
  const { token } = theme.useToken()
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <Title level={1} style={{ margin: 0 }}>Tokens de Design</Title>
            <Text style={{ color: '#6B7280' }}>Sistema de design GarageHub — extraído do layout TeamHub</Text>
          </div>
          <Space>
            <Text>Modo claro</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
            <Text>Modo escuro</Text>
          </Space>
        </div>

        {/* ── Color Palette ───────────────────────────────── */}
        <Section title="Paleta de Cores">
          <Title level={4} style={{ color: '#6B7280', marginBottom: 16 }}>Escala Primária — Mint Green</Title>
          <Row gutter={[12, 16]} style={{ marginBottom: 32 }}>
            {primaryScale.map(({ shade, hex }) => (
              <Col key={shade}>
                <ColorSwatch color={hex} label={`primary-${shade}`} />
              </Col>
            ))}
          </Row>

          <Title level={4} style={{ color: '#6B7280', marginBottom: 16 }}>Escala de Cinzas — Neutral</Title>
          <Row gutter={[12, 16]} style={{ marginBottom: 32 }}>
            {grayScale.map(({ shade, hex }) => (
              <Col key={shade}>
                <ColorSwatch color={hex} label={`gray-${shade}`} />
              </Col>
            ))}
          </Row>

          <Title level={4} style={{ color: '#6B7280', marginBottom: 16 }}>Cores Semânticas</Title>
          <Row gutter={[24, 16]}>
            <Col><ColorSwatch color="#52C41A" label="Sucesso" /></Col>
            <Col><ColorSwatch color="#FAAD14" label="Aviso" /></Col>
            <Col><ColorSwatch color="#FF4D4F" label="Erro" /></Col>
            <Col><ColorSwatch color="#1677FF" label="Informação" /></Col>
            <Col><ColorSwatch color="#3DD9A4" label="Primária" /></Col>
            <Col><ColorSwatch color="#F5FAF7" label="BG Layout" /></Col>
            <Col><ColorSwatch color="#FFFFFF" label="BG Container" /></Col>
            <Col><ColorSwatch color="#E5E7EB" label="Borda" /></Col>
          </Row>
        </Section>

        <Divider />

        {/* ── Semantic Alerts ─────────────────────────────── */}
        <Section title="Cores Semânticas — Alertas">
          <Space orientation="vertical" style={{ width: '100%' }} size="middle">
            <Alert
              title="Sucesso — Operação concluída com êxito"
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
            />
            <Alert
              title="Aviso — Atenção necessária neste item"
              type="warning"
              showIcon
              icon={<WarningOutlined />}
            />
            <Alert
              title="Erro — Algo deu errado, tente novamente"
              type="error"
              showIcon
              icon={<CloseCircleOutlined />}
            />
            <Alert
              title="Informação — Aqui está algo que você deve saber"
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
            />
          </Space>
        </Section>

        <Divider />

        {/* ── Typography ──────────────────────────────────── */}
        <Section title="Tipografia — Inter">
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text style={{ color: '#9CA3AF', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>
                Fonte: Inter · Sans-serif
              </Text>
            </div>
            <Title level={1} style={{ margin: 0 }}>Heading 1 — 38px Bold</Title>
            <Title level={2} style={{ margin: 0 }}>Heading 2 — 30px Semibold</Title>
            <Title level={3} style={{ margin: 0 }}>Heading 3 — 24px Semibold</Title>
            <Title level={4} style={{ margin: 0 }}>Heading 4 — 20px Medium</Title>
            <Title level={5} style={{ margin: 0 }}>Heading 5 — 16px Medium</Title>
            <Paragraph style={{ fontSize: 16, margin: 0 }}>
              Body Large — 16px Regular. O GarageHub conecta proprietários de veículos com oficinas de qualidade.
            </Paragraph>
            <Paragraph style={{ margin: 0 }}>
              Body Regular — 14px Regular. Agende serviços, acompanhe o progresso e mantenha o histórico do seu veículo.
            </Paragraph>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Caption — 12px Regular. Última atualização: 08 de março de 2026
            </Text>
          </Space>
        </Section>

        <Divider />

        {/* ── Border Radius ───────────────────────────────── */}
        <Section title="Raio da Borda">
          <Row gutter={[32, 16]}>
            <Col><RadiusBox radius="0px"    label="Sharp" /></Col>
            <Col><RadiusBox radius="4px"    label="Small" /></Col>
            <Col><RadiusBox radius="8px"    label="Medium (padrão)" /></Col>
            <Col><RadiusBox radius="12px"   label="Large" /></Col>
            <Col><RadiusBox radius="16px"   label="X-Large" /></Col>
            <Col><RadiusBox radius="9999px" label="Pill" /></Col>
          </Row>
        </Section>

        <Divider />

        {/* ── Shadows ─────────────────────────────────────── */}
        <Section title="Sombras">
          <Row gutter={[40, 16]}>
            <Col>
              <ShadowBox
                shadow="none"
                label="None"
              />
            </Col>
            <Col>
              <ShadowBox
                shadow="0 1px 2px 0 rgba(0,0,0,.05)"
                label="Small"
              />
            </Col>
            <Col>
              <ShadowBox
                shadow="0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -2px rgba(0,0,0,.05)"
                label="Medium"
              />
            </Col>
            <Col>
              <ShadowBox
                shadow="0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -4px rgba(0,0,0,.05)"
                label="Large"
              />
            </Col>
          </Row>
        </Section>

        <Divider />

        {/* ── Components ──────────────────────────────────── */}
        <Section title="Componentes">

          {/* Buttons */}
          <Title level={4} style={{ color: '#6B7280', marginBottom: 12 }}>Botões</Title>
          <Space wrap style={{ marginBottom: 32 }}>
            <Button type="primary">Primário</Button>
            <Button type="primary" ghost>Primário Ghost</Button>
            <Button>Padrão</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Texto</Button>
            <Button type="link">Link</Button>
            <Button type="primary" danger>Perigo</Button>
            <Button type="primary" disabled>Desabilitado</Button>
            <Button type="primary" loading>Carregando</Button>
          </Space>

          {/* Cards */}
          <Title level={4} style={{ color: '#6B7280', marginBottom: 12 }}>Cards</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} md={8}>
              <Card title="Veículo Cadastrado" extra={<Tag color="green">Ativo</Tag>}>
                <Statistic title="Honda Civic 2022" value={3} suffix="serviços" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card title="Próximo Serviço">
                <Statistic
                  title="Revisão Geral"
                  value={15}
                  suffix="dias"
                  styles={{ content: { color: '#FAAD14' } }}
                />
                <Progress percent={65} status="active" strokeColor="#3DD9A4" style={{ marginTop: 8 }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card title="Oficinas Próximas">
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Avatar style={{ background: '#3DD9A4' }}>OF</Avatar>
                    <div>
                      <Text strong style={{ display: 'block' }}>Oficina Silva</Text>
                      <Text style={{ fontSize: 12, color: '#6B7280' }}>2,3 km · ⭐ 4.8</Text>
                    </div>
                  </Space>
                  <Space>
                    <Avatar style={{ background: '#1677FF' }}>AM</Avatar>
                    <div>
                      <Text strong style={{ display: 'block' }}>Auto Mecânica</Text>
                      <Text style={{ fontSize: 12, color: '#6B7280' }}>3,1 km · ⭐ 4.6</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Badges & Tags */}
          <Title level={4} style={{ color: '#6B7280', marginBottom: 12 }}>Badges & Tags</Title>
          <Space wrap style={{ marginBottom: 32 }}>
            <Badge count={5}><Button icon={<BellOutlined />}>Notificações</Button></Badge>
            <Badge count={0} showZero><Avatar icon={<UserOutlined />} /></Badge>
            <Badge status="success" text="Confirmado" />
            <Badge status="warning" text="Pendente" />
            <Badge status="error" text="Cancelado" />
            <Badge status="processing" text="Em andamento" />
            <Tag color="green">Ativo</Tag>
            <Tag color="orange">Pendente</Tag>
            <Tag color="red">Cancelado</Tag>
            <Tag color="blue">Informação</Tag>
            <Tag color="default">Padrão</Tag>
          </Space>

          {/* Radio Group */}
          <Title level={4} style={{ color: '#6B7280', marginBottom: 12 }}>Radio Group</Title>
          <Space orientation="vertical" style={{ marginBottom: 32 }}>
            <Radio.Group defaultValue="a">
              <Radio value="a">Particular</Radio>
              <Radio value="b">Empresa</Radio>
              <Radio value="c">Frota</Radio>
            </Radio.Group>
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">Carro</Radio.Button>
              <Radio.Button value="b">Moto</Radio.Button>
              <Radio.Button value="c">Caminhão</Radio.Button>
            </Radio.Group>
          </Space>

          {/* Progress */}
          <Title level={4} style={{ color: '#6B7280', marginBottom: 12 }}>Progresso</Title>
          <Space orientation="vertical" style={{ width: '100%', maxWidth: 400 }}>
            <Progress percent={30} strokeColor="#3DD9A4" />
            <Progress percent={70} strokeColor="#3DD9A4" />
            <Progress percent={100} strokeColor="#52C41A" />
            <Progress percent={45} status="exception" />
          </Space>
        </Section>

        {/* ── Dark Mode Preview ────────────────────────────── */}
        {darkMode && (
          <>
            <Divider />
            <Section title="Modo Escuro — Pré-visualização">
              <Alert
                title="Modo escuro ativo"
                description="Todos os componentes acima foram renderizados com o algoritmo dark do Ant Design."
                type="info"
                showIcon
              />
            </Section>
          </>
        )}
      </div>
    </ConfigProvider>
  )
}

export default StyleguidePage
