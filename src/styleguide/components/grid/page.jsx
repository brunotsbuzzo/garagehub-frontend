import { useState } from 'react'
import {
  Row, Col, Space, Divider, Typography, Tag, Table, Slider, Switch, Select,
  Alert,
} from 'antd'
import {
  AppstoreOutlined,
  LayoutOutlined,
  CarOutlined,
  ToolOutlined,
  ShopOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

/* ── Design tokens ──────────────────────────────────────────── */
const G = {
  50:  '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
}
const PRIMARY     = '#3DD9A4'
const PRIMARY_BG  = '#EDFCF7'
const PRIMARY_DK  = '#12A875'

/* ── Helper: Section container ──────────────────────────────── */
const Section = ({ id, title, description, children }) => (
  <section id={id} style={{ marginBottom: 56 }}>
    <div style={{ marginBottom: 20 }}>
      <Title level={4} style={{ margin: 0, color: G[800] }}>{title}</Title>
      {description && (
        <Paragraph style={{ margin: '6px 0 0', color: G[500], fontSize: 13 }}>
          {description}
        </Paragraph>
      )}
    </div>
    {children}
  </section>
)

/* ── Helper: CodeBlock ──────────────────────────────────────── */
const CodeBlock = ({ code }) => (
  <pre style={{
    background: '#1E293B',
    borderRadius: '0 0 8px 8px',
    padding: '16px 20px',
    fontSize: 12,
    lineHeight: 1.8,
    overflowX: 'auto',
    color: '#94A3B8',
    margin: 0,
  }}>
    <code>{code}</code>
  </pre>
)

/* ── Helper: DemoCard (preview + code) ─────────────────────── */
const DemoCard = ({ children, code }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    <div style={{
      background: G[50],
      border: 'none',
      borderBottom: `1px solid ${G[200]}`,
      borderRadius: 0,
      padding: '24px 20px',
    }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* ── Helper: col box (visual representation of a grid cell) ── */
const ColBox = ({ children, color = PRIMARY_BG, textColor = PRIMARY_DK, style = {} }) => (
  <div style={{
    background: color,
    border: `1px solid ${PRIMARY}40`,
    borderRadius: 6,
    padding: '10px 12px',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
    color: textColor,
    minHeight: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  }}>
    {children}
  </div>
)

/* ── Helper: ColBoxAlt (alternating shade) ──────────────────── */
const ColBoxAlt = ({ children, alt, style }) => (
  <ColBox
    color={alt ? '#D1FAE5' : PRIMARY_BG}
    textColor={PRIMARY_DK}
    style={style}
  >
    {children}
  </ColBox>
)

/* ── API columns ────────────────────────────────────────────── */
const apiCols = [
  {
    title: 'Prop',
    dataIndex: 'prop',
    width: 140,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Componente',
    dataIndex: 'component',
    width: 80,
    render: v => <Tag color={v === 'Row' ? 'blue' : 'purple'} style={{ fontSize: 11 }}>{v}</Tag>,
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    width: 280,
    render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Padrão',
    dataIndex: 'default',
    width: 80,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text>,
  },
]

const apiData = [
  { key: 'gutter',   component: 'Row', prop: 'gutter',  type: 'number | [number, number] | object',  default: '0',    description: 'Espaçamento entre colunas (horizontal) ou [horizontal, vertical]' },
  { key: 'justify',  component: 'Row', prop: 'justify',  type: "'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'", default: "'start'",  description: 'Alinhamento horizontal (eixo principal)' },
  { key: 'align',    component: 'Row', prop: 'align',    type: "'top' | 'middle' | 'bottom' | 'stretch'", default: "'top'",   description: 'Alinhamento vertical (eixo transversal)' },
  { key: 'wrap',     component: 'Row', prop: 'wrap',     type: 'boolean',  default: 'true',  description: 'Habilita quebra de linha automática das colunas' },
  { key: 'span',     component: 'Col', prop: 'span',     type: 'number (1–24)',  default: '—',    description: 'Número de colunas ocupadas (escala de 24)' },
  { key: 'offset',   component: 'Col', prop: 'offset',   type: 'number',   default: '0',    description: 'Deslocamento à esquerda em número de colunas' },
  { key: 'push',     component: 'Col', prop: 'push',     type: 'number',   default: '0',    description: 'Move a coluna para a direita (muda posição sem afetar o fluxo)' },
  { key: 'pull',     component: 'Col', prop: 'pull',     type: 'number',   default: '0',    description: 'Move a coluna para a esquerda (muda posição sem afetar o fluxo)' },
  { key: 'order',    component: 'Col', prop: 'order',    type: 'number',   default: '—',    description: 'Ordem de exibição dentro do Row (Flexbox order)' },
  { key: 'xs',       component: 'Col', prop: 'xs',       type: 'number | ColSize',  default: '—',    description: '< 576px' },
  { key: 'sm',       component: 'Col', prop: 'sm',       type: 'number | ColSize',  default: '—',    description: '≥ 576px' },
  { key: 'md',       component: 'Col', prop: 'md',       type: 'number | ColSize',  default: '—',    description: '≥ 768px' },
  { key: 'lg',       component: 'Col', prop: 'lg',       type: 'number | ColSize',  default: '—',    description: '≥ 992px' },
  { key: 'xl',       component: 'Col', prop: 'xl',       type: 'number | ColSize',  default: '—',    description: '≥ 1200px' },
  { key: 'xxl',      component: 'Col', prop: 'xxl',      type: 'number | ColSize',  default: '—',    description: '≥ 1600px' },
]

/* ── Breakpoint reference table ─────────────────────────────── */
const bpData = [
  { key: 'xs',  bp: 'xs',  label: 'Extra Small',  range: '< 576px',   use: 'Mobile (portrait)' },
  { key: 'sm',  bp: 'sm',  label: 'Small',         range: '≥ 576px',   use: 'Mobile (landscape)' },
  { key: 'md',  bp: 'md',  label: 'Medium',        range: '≥ 768px',   use: 'Tablet' },
  { key: 'lg',  bp: 'lg',  label: 'Large',         range: '≥ 992px',   use: 'Desktop' },
  { key: 'xl',  bp: 'xl',  label: 'Extra Large',   range: '≥ 1200px',  use: 'Large desktop' },
  { key: 'xxl', bp: 'xxl', label: '2XL',           range: '≥ 1600px',  use: 'Wide screen' },
]

const bpCols = [
  { title: 'Prop', dataIndex: 'bp',    width: 60,  render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Nome', dataIndex: 'label', width: 130, render: v => <Text style={{ fontSize: 13 }}>{v}</Text> },
  { title: 'Faixa', dataIndex: 'range', width: 120, render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Uso típico', dataIndex: 'use', render: v => <Text style={{ fontSize: 13, color: G[600] }}>{v}</Text> },
]

/* ══════════════════════════════════════════════════════════════
   MAIN SHOWCASE
═══════════════════════════════════════════════════════════════ */
export default function GridShowcase() {
  const [gutter, setGutter]   = useState(16)
  const [justify, setJustify] = useState('start')
  const [align, setAlign]     = useState('top')

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue"    style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="cyan"    style={{ borderRadius: 4 }}>Layout</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>Row / Col</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Grid</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Sistema de grid de <strong>24 colunas</strong> baseado em Flexbox. Use{' '}
          <Text code>{'<Row>'}</Text> como contêiner e{' '}
          <Text code>{'<Col>'}</Text> para definir o espaço de cada célula.
          Suporta breakpoints responsivos, gutter, alinhamento e ordenação.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          title="Sistema de 24 colunas"
          description={
            <span>
              A soma dos <Text code>span</Text> dentro de um <Text code>{'<Row>'}</Text> deve ser{' '}
              <strong>≤ 24</strong>. Colunas com soma maior do que 24 são quebradas para a próxima
              linha quando <Text code>wrap=true</Text> (padrão).
            </span>
          }
        />
      </div>

      {/* ── 1. Sistema básico (span) ─────────────────────────── */}
      <Section
        id="basic"
        title="Colunas básicas"
        description="Cada Col recebe um span (1–24) que define quantas colunas do grid ela ocupa."
      >
        <DemoCard
          code={`import { Row, Col } from 'antd'

<Row>
  <Col span={24}><div>span=24</div></Col>
</Row>

<Row>
  <Col span={12}><div>span=12</div></Col>
  <Col span={12}><div>span=12</div></Col>
</Row>

<Row>
  <Col span={8}><div>span=8</div></Col>
  <Col span={8}><div>span=8</div></Col>
  <Col span={8}><div>span=8</div></Col>
</Row>

<Row>
  <Col span={6}><div>span=6</div></Col>
  <Col span={6}><div>span=6</div></Col>
  <Col span={6}><div>span=6</div></Col>
  <Col span={6}><div>span=6</div></Col>
</Row>`}
        >
          <Space orientation="vertical" style={{ width: '100%' }} size={8}>
            <Row>
              <Col span={24}><ColBox>24</ColBox></Col>
            </Row>
            <Row>
              <Col span={12}><ColBox>12</ColBox></Col>
              <Col span={12}><ColBoxAlt alt>12</ColBoxAlt></Col>
            </Row>
            <Row>
              <Col span={8}><ColBox>8</ColBox></Col>
              <Col span={8}><ColBoxAlt alt>8</ColBoxAlt></Col>
              <Col span={8}><ColBox>8</ColBox></Col>
            </Row>
            <Row>
              <Col span={6}><ColBox>6</ColBox></Col>
              <Col span={6}><ColBoxAlt alt>6</ColBoxAlt></Col>
              <Col span={6}><ColBox>6</ColBox></Col>
              <Col span={6}><ColBoxAlt alt>6</ColBoxAlt></Col>
            </Row>
            <Row>
              <Col span={4}><ColBox>4</ColBox></Col>
              <Col span={4}><ColBoxAlt alt>4</ColBoxAlt></Col>
              <Col span={4}><ColBox>4</ColBox></Col>
              <Col span={4}><ColBoxAlt alt>4</ColBoxAlt></Col>
              <Col span={4}><ColBox>4</ColBox></Col>
              <Col span={4}><ColBoxAlt alt>4</ColBoxAlt></Col>
            </Row>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 2. Gutter ───────────────────────────────────────── */}
      <Section
        id="gutter"
        title="Gutter — Espaçamento"
        description="A prop gutter do Row define a calha entre colunas. Aceita número (horizontal), array [h, v] para horizontal e vertical, ou objeto de breakpoints."
      >
        <div style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, color: G[500] }}>
            Gutter: <Text strong style={{ color: G[800] }}>{gutter}px</Text>
          </Text>
          <Slider
            min={0}
            max={48}
            step={4}
            value={gutter}
            onChange={setGutter}
            style={{ maxWidth: 360 }}
          />
        </div>
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: G[50], borderBottom: `1px solid ${G[200]}`, padding: '24px 20px' }}>
            <Row gutter={gutter}>
              {[1, 2, 3, 4].map(i => (
                <Col key={i} span={6}>
                  <ColBoxAlt alt={i % 2 === 0}>col-6</ColBoxAlt>
                </Col>
              ))}
            </Row>
          </div>
          <CodeBlock code={`<Row gutter={${gutter}}>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>

{/* Gutter horizontal + vertical */}
<Row gutter={[16, 24]}>
  <Col span={8}>col-8</Col>
  ...
</Row>

{/* Responsivo */}
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  <Col span={6}>col-6</Col>
  ...
</Row>`} />
        </div>
      </Section>

      {/* ── 3. Offset ───────────────────────────────────────── */}
      <Section
        id="offset"
        title="Offset — Deslocamento"
        description="Desloca a coluna para a direita em X colunas sem criar uma Col vazia."
      >
        <DemoCard
          code={`<Row>
  <Col span={8}>span=8</Col>
  <Col span={8} offset={8}>span=8 offset=8</Col>
</Row>

<Row>
  <Col span={6} offset={6}>span=6 offset=6</Col>
  <Col span={6} offset={6}>span=6 offset=6</Col>
</Row>

<Row>
  <Col span={12} offset={6}>span=12 offset=6</Col>
</Row>`}
        >
          <Space orientation="vertical" style={{ width: '100%' }} size={8}>
            <Row>
              <Col span={8}><ColBox>8</ColBox></Col>
              <Col span={8} offset={8}><ColBoxAlt alt>8, offset=8</ColBoxAlt></Col>
            </Row>
            <Row>
              <Col span={6} offset={6}><ColBox>6, offset=6</ColBox></Col>
              <Col span={6} offset={6}><ColBoxAlt alt>6, offset=6</ColBoxAlt></Col>
            </Row>
            <Row>
              <Col span={12} offset={6}><ColBox>12, offset=6</ColBox></Col>
            </Row>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 4. Justify + Align ──────────────────────────────── */}
      <Section
        id="alignment"
        title="Justify &amp; Align — Alinhamento Flexbox"
        description="Row expõe justify (eixo horizontal) e align (eixo vertical) do Flexbox diretamente."
      >
        <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <Text style={{ fontSize: 12, color: G[500], display: 'block', marginBottom: 4 }}>justify</Text>
            <Select
              value={justify}
              onChange={setJustify}
              style={{ width: 180 }}
              options={['start','end','center','space-around','space-between','space-evenly'].map(v => ({ label: v, value: v }))}
            />
          </div>
          <div>
            <Text style={{ fontSize: 12, color: G[500], display: 'block', marginBottom: 4 }}>align</Text>
            <Select
              value={align}
              onChange={setAlign}
              style={{ width: 140 }}
              options={['top','middle','bottom','stretch'].map(v => ({ label: v, value: v }))}
            />
          </div>
        </div>

        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: G[50], borderBottom: `1px solid ${G[200]}`, padding: '24px 20px' }}>
            <Row justify={justify} align={align} style={{ height: 100 }}>
              <Col span={4}><ColBox style={{ height: 40 }}>A</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 60 }}>B</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 32 }}>C</ColBox></Col>
            </Row>
          </div>
          <CodeBlock code={`<Row justify="${justify}" align="${align}">
  <Col span={4}>A</Col>
  <Col span={4}>B</Col>
  <Col span={4}>C</Col>
</Row>`} />
        </div>
      </Section>

      {/* ── 5. Responsivo ───────────────────────────────────── */}
      <Section
        id="responsive"
        title="Responsivo — Breakpoints"
        description="Cada Col aceita as props xs / sm / md / lg / xl / xxl para definir spans diferentes por tamanho de tela."
      >
        <DemoCard
          code={`<Row gutter={[16, 16]}>
  {/* Mobile: 24 | Tablet: 12 | Desktop: 6 */}
  <Col xs={24} sm={12} md={8} lg={6}>col</Col>
  <Col xs={24} sm={12} md={8} lg={6}>col</Col>
  <Col xs={24} sm={12} md={8} lg={6}>col</Col>
  <Col xs={24} sm={12} md={8} lg={6}>col</Col>
</Row>`}
        >
          <Row gutter={[16, 16]}>
            {['Veículos', 'Serviços', 'Oficinas', 'Técnicos'].map((label, i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <ColBoxAlt alt={i % 2 !== 0}>{label}</ColBoxAlt>
              </Col>
            ))}
          </Row>
          <Text style={{ fontSize: 12, color: G[400], marginTop: 8, display: 'block' }}>
            Redimensione a janela para ver as colunas se adaptando.
          </Text>
        </DemoCard>

        <Table
          columns={bpCols}
          dataSource={bpData}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          bordered={false}
        />
      </Section>

      {/* ── 6. Order ────────────────────────────────────────── */}
      <Section
        id="order"
        title="Order — Reordenação"
        description="A prop order de Col muda a posição de exibição sem alterar a ordem no HTML — útil para reordenar visualmente em mobile."
      >
        <DemoCard
          code={`<Row>
  <Col span={6} order={4}>1st · order=4</Col>
  <Col span={6} order={3}>2nd · order=3</Col>
  <Col span={6} order={2}>3rd · order=2</Col>
  <Col span={6} order={1}>4th · order=1</Col>
</Row>`}
        >
          <Row>
            {[
              { label: '1st (HTML)', order: 4 },
              { label: '2nd (HTML)', order: 3 },
              { label: '3rd (HTML)', order: 2 },
              { label: '4th (HTML)', order: 1 },
            ].map((item, i) => (
              <Col key={i} span={6} order={item.order}>
                <ColBoxAlt alt={i % 2 !== 0}>
                  {item.label}
                  <br />
                  <Text style={{ fontSize: 10, color: PRIMARY_DK }}>order={item.order}</Text>
                </ColBoxAlt>
              </Col>
            ))}
          </Row>
          <Text style={{ fontSize: 12, color: G[400], marginTop: 8, display: 'block' }}>
            Visualmente aparece na ordem 4→3→2→1, mesmo que no HTML esteja 1→2→3→4.
          </Text>
        </DemoCard>
      </Section>

      {/* ── 7. Layouts reais GarageHub ──────────────────────── */}
      <Section
        id="real-layouts"
        title="Layouts Reais — GarageHub"
        description="Exemplos de grids prontos para usar na plataforma."
      >

        {/* Dashboard KPI cards */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Dashboard — Cards KPI</Text>
        </div>
        <DemoCard
          code={`<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} lg={6}>
    <Card><Statistic title="Veículos" value={1284} /></Card>
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <Card><Statistic title="Serviços / semana" value={127} /></Card>
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <Card><Statistic title="Oficinas ativas" value={38} /></Card>
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <Card><Statistic title="Conclusão no prazo" value="94,2%" /></Card>
  </Col>
</Row>`}
        >
          <Row gutter={[16, 16]}>
            {[
              { icon: <CarOutlined />,      label: 'Veículos',          value: '1.284', sub: 'cadastrados' },
              { icon: <ToolOutlined />,      label: 'Serviços / semana', value: '+127',  sub: 'esta semana', positive: true },
              { icon: <ShopOutlined />,      label: 'Oficinas ativas',   value: '38',    sub: 'em operação' },
              { icon: <BarChartOutlined />,  label: 'Conclusão no prazo',value: '94,2%', sub: 'dos serviços', positive: true },
            ].map((stat, i) => (
              <Col key={i} xs={24} sm={12} lg={6}>
                <div style={{
                  background: '#fff',
                  border: `1px solid ${G[200]}`,
                  borderRadius: 10,
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: G[500] }}>{stat.label}</Text>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: PRIMARY_BG,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: PRIMARY_DK, fontSize: 15,
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                  <Text strong style={{ fontSize: 22, color: stat.positive ? PRIMARY_DK : G[800], lineHeight: 1 }}>
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: 11, color: G[400] }}>{stat.sub}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </DemoCard>

        {/* Main + Sidebar */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Main content + Sidebar</Text>
        </div>
        <DemoCard
          code={`<Row gutter={24}>
  <Col xs={24} lg={16}>
    {/* Conteúdo principal */}
  </Col>
  <Col xs={24} lg={8}>
    {/* Sidebar */}
  </Col>
</Row>`}
        >
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <div style={{
                background: PRIMARY_BG,
                border: `1px solid ${PRIMARY}40`,
                borderRadius: 8,
                padding: '20px 16px',
                minHeight: 160,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <CalendarOutlined style={{ color: PRIMARY_DK }} />
                  <Text strong style={{ color: G[700] }}>Agenda de serviços</Text>
                  <Tag color="green" style={{ marginLeft: 'auto' }}>lg=16</Tag>
                </div>
                {[
                  { time: '09:00', desc: 'Revisão completa — Fiat Uno · ABC-1234' },
                  { time: '11:30', desc: 'Troca de óleo — VW Gol · DEF-5678' },
                  { time: '14:00', desc: 'Alinhamento e balanceamento — Honda Civic · GHI-9012' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, padding: '8px 0',
                    borderBottom: i < 2 ? `1px solid ${PRIMARY}30` : 'none',
                  }}>
                    <Text code style={{ fontSize: 11, color: PRIMARY_DK, flexShrink: 0 }}>{item.time}</Text>
                    <Text style={{ fontSize: 12, color: G[600] }}>{item.desc}</Text>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{
                background: '#fff',
                border: `1px solid ${G[200]}`,
                borderRadius: 8,
                padding: '20px 16px',
                minHeight: 160,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <TeamOutlined style={{ color: G[500] }} />
                  <Text strong style={{ color: G[700] }}>Técnicos disponíveis</Text>
                  <Tag color="blue" style={{ marginLeft: 'auto' }}>lg=8</Tag>
                </div>
                {['Carlos M.', 'Ana P.', 'Ricardo S.'].map((name, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 0',
                    borderBottom: i < 2 ? `1px solid ${G[100]}` : 'none',
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: PRIMARY_BG, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: PRIMARY_DK, fontWeight: 700,
                    }}>
                      {name[0]}
                    </div>
                    <Text style={{ fontSize: 12, color: G[700] }}>{name}</Text>
                    <div style={{
                      marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%',
                      background: '#52C41A',
                    }} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </DemoCard>

        {/* Form layout 2 columns */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Formulário — 2 colunas</Text>
        </div>
        <DemoCard
          code={`<Row gutter={[16, 0]}>
  <Col xs={24} sm={12}>
    <Form.Item label="Marca" name="brand">
      <Input />
    </Form.Item>
  </Col>
  <Col xs={24} sm={12}>
    <Form.Item label="Modelo" name="model">
      <Input />
    </Form.Item>
  </Col>
  <Col xs={24} sm={8}>
    <Form.Item label="Ano" name="year">
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  </Col>
  <Col xs={24} sm={8}>
    <Form.Item label="Placa" name="plate">
      <Input />
    </Form.Item>
  </Col>
  <Col xs={24} sm={8}>
    <Form.Item label="Cor" name="color">
      <Input />
    </Form.Item>
  </Col>
</Row>`}
        >
          <Row gutter={[16, 0]}>
            {[
              { label: 'Marca',  span: { xs: 24, sm: 12 }, placeholder: 'ex: Toyota' },
              { label: 'Modelo', span: { xs: 24, sm: 12 }, placeholder: 'ex: Corolla' },
              { label: 'Ano',    span: { xs: 24, sm: 8  }, placeholder: '2024' },
              { label: 'Placa',  span: { xs: 24, sm: 8  }, placeholder: 'ABC-1234' },
              { label: 'Cor',    span: { xs: 24, sm: 8  }, placeholder: 'ex: Prata' },
            ].map((field, i) => (
              <Col key={i} {...field.span}>
                <div style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 12, color: G[600], display: 'block', marginBottom: 4 }}>
                    {field.label}
                  </Text>
                  <div style={{
                    height: 36, borderRadius: 6, border: `1px solid ${G[300]}`,
                    background: '#fff', padding: '0 12px',
                    display: 'flex', alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 12, color: G[300] }}>{field.placeholder}</Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </DemoCard>
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 8. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props">
        <Table
          columns={apiCols}
          dataSource={apiData}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          bordered={false}
        />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Semântica HTML', 'Row e Col renderizam divs genéricas. Use elementos semânticos (<section>, <article>, <main>) internamente para estrutura de conteúdo.'],
            ['Ordem de leitura', 'A prop order altera apenas a ordem visual (CSS). Leitores de tela seguem a ordem do DOM — garanta que o HTML esteja em ordem lógica.'],
            ['Gutter e espaço', 'O espaçamento via gutter usa padding CSS, não elementos invisíveis. Não interfere em acessibilidade.'],
            ['Responsividade', 'Use breakpoints para garantir que o layout seja utilizável em todas as larguras — incluindo usuários que fazem zoom de 400%.'],
            ['Testes de reflow', 'WCAG 1.4.10 exige que o conteúdo seja legível em 320px de largura. Verifique xs={24} para elementos críticos.'],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              background: G[50], borderRadius: 8, border: `1px solid ${G[200]}`,
            }}>
              <Text code style={{ flexShrink: 0, fontSize: 12, color: '#1677FF' }}>{title}</Text>
              <Text style={{ fontSize: 13, color: G[700] }}>{desc}</Text>
            </div>
          ))}
        </Space>
      </Section>

    </div>
  )
}
