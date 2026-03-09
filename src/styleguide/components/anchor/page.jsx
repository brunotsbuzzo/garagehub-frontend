import { useState, useRef } from 'react'
import {
  Anchor, Row, Col, Space, Divider, Typography, Tag, Table, Alert,
  Segmented, Switch, InputNumber, Badge, Avatar,
} from 'antd'
import {
  CarOutlined,
  ToolOutlined,
  ShopOutlined,
  TeamOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  LinkOutlined,
  BulbOutlined,
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
const PRIMARY    = '#3DD9A4'
const PRIMARY_BG = '#EDFCF7'
const PRIMARY_DK = '#12A875'

/* ── Helpers ────────────────────────────────────────────────── */
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

const DemoCard = ({ children, code }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    <div style={{ background: G[50], borderBottom: `1px solid ${G[200]}`, padding: '24px 20px' }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* ── Fake section block ─────────────────────────────────────── */
const FakeSection = ({ id, icon, title, color = PRIMARY_BG, textColor = PRIMARY_DK, children }) => (
  <div
    id={id}
    style={{
      background: color,
      border: `1px solid ${textColor}30`,
      borderRadius: 8,
      padding: '16px 18px',
      marginBottom: 12,
      scrollMarginTop: 16,
    }}
  >
    <Space size={8} style={{ marginBottom: 8 }}>
      <span style={{ color: textColor, fontSize: 16 }}>{icon}</span>
      <Text strong style={{ fontSize: 13, color: G[800] }}>{title}</Text>
    </Space>
    {children && <Paragraph style={{ fontSize: 12, color: G[500], margin: 0 }}>{children}</Paragraph>}
  </div>
)

/* ── Stat mini ──────────────────────────────────────────────── */
const StatMini = ({ label, value, icon, color }) => (
  <div style={{
    background: '#fff',
    border: `1px solid ${G[200]}`,
    borderRadius: 8,
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 7, flexShrink: 0,
      background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, fontSize: 15,
    }}>
      {icon}
    </div>
    <div>
      <Text style={{ fontSize: 11, color: G[400], display: 'block', lineHeight: 1.2 }}>{label}</Text>
      <Text strong style={{ fontSize: 16, color: G[800] }}>{value}</Text>
    </div>
  </div>
)

/* ── API table ──────────────────────────────────────────────── */
const apiCols = [
  { title: 'Prop', dataIndex: 'prop', width: 160,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Tipo', dataIndex: 'type', width: 260,
    render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 90,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiData = [
  { key: 'affix',              prop: 'affix',              type: 'boolean',                             default: 'true',    description: 'Fixa o Anchor na tela durante o scroll (usa Affix internamente)' },
  { key: 'offsetTop',          prop: 'offsetTop',          type: 'number',                              default: '0',       description: 'Distância do topo da janela para acionar a âncora ativa' },
  { key: 'targetOffset',       prop: 'targetOffset',       type: 'number',                              default: '—',       description: 'Ajuste de offset ao rolar até a seção alvo' },
  { key: 'direction',          prop: 'direction',          type: "'vertical' | 'horizontal'",           default: "'vertical'", description: 'Orientação do componente' },
  { key: 'items',              prop: 'items',              type: 'AnchorLinkItemProps[]',               default: '—',       description: 'Array de links com { key, href, title, children }' },
  { key: 'getCurrentAnchor',   prop: 'getCurrentAnchor',   type: '(activeLink: string) => string',     default: '—',       description: 'Sobrescreve a lógica de detecção da âncora ativa' },
  { key: 'onChange',           prop: 'onChange',           type: '(currentActiveLink: string) => void', default: '—',      description: 'Callback disparado ao mudar a âncora ativa' },
  { key: 'onClick',            prop: 'onClick',            type: '(e, link) => void',                   default: '—',      description: 'Callback de clique em um link de âncora' },
  { key: 'bounds',             prop: 'bounds',             type: 'number',                              default: '5',       description: 'Tolerância em pixels para considerar a seção como ativa' },
  { key: 'getContainer',       prop: 'getContainer',       type: '() => HTMLElement',                   default: '() => window', description: 'Elemento de scroll usado como referência (útil em containers internos)' },
  { key: 'replace',            prop: 'replace',            type: 'boolean',                             default: 'false',   description: 'Substitui a URL atual no histórico em vez de adicionar uma entrada' },
]

const itemApiData = [
  { key: 'key',      prop: 'key',      type: 'string',               default: '—', description: 'Identificador único do item' },
  { key: 'href',     prop: 'href',     type: 'string',               default: '—', description: 'URL do alvo — geralmente #id-do-elemento' },
  { key: 'title',    prop: 'title',    type: 'ReactNode',            default: '—', description: 'Conteúdo exibido no link' },
  { key: 'target',   prop: 'target',   type: 'string',               default: '—', description: 'Atributo target do <a>' },
  { key: 'children', prop: 'children', type: 'AnchorLinkItemProps[]', default: '—', description: 'Sub-links aninhados (até 2 níveis recomendado)' },
]

/* ══════════════════════════════════════════════════════════════
   SHOWCASE
═══════════════════════════════════════════════════════════════ */
export default function AnchorShowcase() {
  const [activeAnchor, setActiveAnchor] = useState('')
  const [direction, setDirection]       = useState('vertical')
  const [affix, setAffix]               = useState(false)
  const [offsetTop, setOffsetTop]       = useState(0)
  const containerRef                    = useRef(null)
  const basicRef                        = useRef(null)
  const nestedRef                       = useRef(null)

  const basicItems = [
    { key: 'basic',       href: '#demo-basic',       title: 'Uso básico' },
    { key: 'nested',      href: '#demo-nested',      title: 'Links aninhados' },
    { key: 'horizontal',  href: '#demo-horizontal',  title: 'Horizontal' },
    { key: 'container',   href: '#demo-container',   title: 'Container interno' },
  ]

  const nestedItems = [
    {
      key: 'veiculos', href: '#sec-veiculos', title: 'Veículos',
      children: [
        { key: 'cadastro',   href: '#sec-cadastro',   title: 'Cadastro' },
        { key: 'historico',  href: '#sec-historico',  title: 'Histórico' },
        { key: 'documentos', href: '#sec-documentos', title: 'Documentos' },
      ],
    },
    {
      key: 'servicos', href: '#sec-servicos', title: 'Serviços',
      children: [
        { key: 'agendamento', href: '#sec-agendamento', title: 'Agendamento' },
        { key: 'execucao',    href: '#sec-execucao',    title: 'Execução' },
      ],
    },
    { key: 'oficinas',  href: '#sec-oficinas',  title: 'Oficinas' },
    { key: 'relatorio', href: '#sec-relatorio', title: 'Relatórios' },
  ]

  const horizontalItems = [
    { key: 'h1', href: '#sec-h1', title: 'Dashboard' },
    { key: 'h2', href: '#sec-h2', title: 'Veículos' },
    { key: 'h3', href: '#sec-h3', title: 'Serviços' },
    { key: 'h4', href: '#sec-h4', title: 'Oficinas' },
    { key: 'h5', href: '#sec-h5', title: 'Relatórios' },
  ]

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue"    style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="cyan"    style={{ borderRadius: 4 }}>Navegação</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Anchor</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Navegação de âncoras dentro de uma página. O Anchor detecta
          automaticamente qual seção está visível durante o scroll e destaca o
          link correspondente — ideal para <strong>páginas longas</strong>,
          documentação, perfis de veículo e relatórios detalhados.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          title="Como funciona"
          description={
            <span>
              Cada item aponta para um <Text code>href="#id"</Text>. O elemento
              alvo precisa ter o <Text code>id</Text> correspondente no HTML.
              O Anchor monitora o scroll e aplica a classe ativa ao link da
              seção mais próxima do topo.
            </span>
          }
        />
      </div>

      {/* ── 1. Uso básico ────────────────────────────────────── */}
      <Section
        id="basic"
        title="Uso básico"
        description="Passe um array de items com href apontando para IDs de elementos na página."
      >
        <DemoCard
          code={`import { Anchor } from 'antd'

const items = [
  { key: 'intro',    href: '#introducao',    title: 'Introdução' },
  { key: 'veiculos', href: '#veiculos',      title: 'Veículos' },
  { key: 'servicos', href: '#servicos',      title: 'Serviços' },
  { key: 'oficinas', href: '#oficinas',      title: 'Oficinas' },
]

<Anchor
  affix={false}
  items={items}
  onChange={(link) => console.log('Ativa:', link)}
/>`}
        >
          <Row gutter={32}>
            <Col xs={24} sm={8}>
              <div style={{
                border: `1px solid ${G[200]}`,
                borderRadius: 8,
                padding: '12px 0',
                background: '#fff',
              }}>
                <Text style={{ fontSize: 11, color: G[400], display: 'block', padding: '0 16px', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Nesta página
                </Text>
                <Anchor
                  affix={false}
                  getContainer={() => basicRef.current || window}
                  items={basicItems}
                  style={{ background: 'transparent' }}
                  onChange={setActiveAnchor}
                />
              </div>
            </Col>
            <Col xs={24} sm={16}>
              <div
                ref={basicRef}
                style={{ height: 240, overflowY: 'auto', paddingRight: 4 }}
              >
                <Space orientation="vertical" size={10} style={{ width: '100%' }}>
                  <FakeSection id="demo-basic"      icon={<LinkOutlined />}      title="Uso básico">
                    Seção de destino correspondente ao link #demo-basic
                  </FakeSection>
                  <FakeSection id="demo-nested"     icon={<ApartmentOutlined />} title="Links aninhados" color="#EFF6FF" textColor="#1677FF">
                    Seção de destino correspondente ao link #demo-nested
                  </FakeSection>
                  <FakeSection id="demo-horizontal" icon={<BarChartOutlined />}  title="Horizontal" color="#FFF7ED" textColor="#D97706">
                    Seção de destino correspondente ao link #demo-horizontal
                  </FakeSection>
                  <FakeSection id="demo-container"  icon={<ShopOutlined />}      title="Container interno" color="#FDF4FF" textColor="#7C3AED">
                    Seção de destino correspondente ao link #demo-container
                  </FakeSection>
                </Space>
              </div>
              {activeAnchor && (
                <div style={{
                  marginTop: 10, padding: '6px 12px', borderRadius: 6,
                  background: PRIMARY_BG, border: `1px solid ${PRIMARY}40`,
                }}>
                  <Text style={{ fontSize: 12, color: PRIMARY_DK }}>
                    onChange → <Text code style={{ fontSize: 12 }}>{activeAnchor}</Text>
                  </Text>
                </div>
              )}
            </Col>
          </Row>
        </DemoCard>
      </Section>

      {/* ── 2. Links aninhados ───────────────────────────────── */}
      <Section
        id="nested"
        title="Links aninhados"
        description="Adicione a prop children ao item para criar sub-links. Recomendado até dois níveis de profundidade."
      >
        <DemoCard
          code={`const items = [
  {
    key: 'veiculos',
    href: '#sec-veiculos',
    title: 'Veículos',
    children: [
      { key: 'cadastro',   href: '#sec-cadastro',   title: 'Cadastro' },
      { key: 'historico',  href: '#sec-historico',  title: 'Histórico' },
      { key: 'documentos', href: '#sec-documentos', title: 'Documentos' },
    ],
  },
  {
    key: 'servicos',
    href: '#sec-servicos',
    title: 'Serviços',
    children: [
      { key: 'agendamento', href: '#sec-agendamento', title: 'Agendamento' },
      { key: 'execucao',    href: '#sec-execucao',    title: 'Execução' },
    ],
  },
  { key: 'oficinas',  href: '#sec-oficinas',  title: 'Oficinas' },
  { key: 'relatorio', href: '#sec-relatorio', title: 'Relatórios' },
]

<Anchor affix={false} items={items} />`}
        >
          <Row gutter={32}>
            <Col xs={24} sm={8}>
              <div style={{
                border: `1px solid ${G[200]}`,
                borderRadius: 8,
                padding: '12px 0',
                background: '#fff',
              }}>
                <Text style={{ fontSize: 11, color: G[400], display: 'block', padding: '0 16px', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Índice
                </Text>
                <Anchor
                  affix={false}
                  getContainer={() => nestedRef.current || window}
                  items={nestedItems}
                  style={{ background: 'transparent' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={16}>
              <div
                ref={nestedRef}
                style={{ height: 320, overflowY: 'auto', paddingRight: 4 }}
              >
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <FakeSection id="sec-veiculos"   icon={<CarOutlined />}      title="Veículos" />
                <FakeSection id="sec-cadastro"   icon={<FileTextOutlined />} title="Cadastro" color="#F0FDF4" textColor="#16A34A" />
                <FakeSection id="sec-historico"  icon={<ClockCircleOutlined />} title="Histórico" color="#F0FDF4" textColor="#16A34A" />
                <FakeSection id="sec-documentos" icon={<FileTextOutlined />} title="Documentos" color="#F0FDF4" textColor="#16A34A" />
                <FakeSection id="sec-servicos"   icon={<ToolOutlined />}     title="Serviços" color="#EFF6FF" textColor="#1677FF" />
                <FakeSection id="sec-agendamento" icon={<CalendarOutlined />} title="Agendamento" color="#EFF6FF" textColor="#1677FF" />
                <FakeSection id="sec-execucao"   icon={<CheckCircleOutlined />} title="Execução" color="#EFF6FF" textColor="#1677FF" />
                <FakeSection id="sec-oficinas"   icon={<ShopOutlined />}     title="Oficinas" color="#FFF7ED" textColor="#D97706" />
                <FakeSection id="sec-relatorio"  icon={<BarChartOutlined />} title="Relatórios" color="#FDF4FF" textColor="#7C3AED" />
              </Space>
              </div>
            </Col>
          </Row>
        </DemoCard>
      </Section>

      {/* ── 3. Horizontal ───────────────────────────────────── */}
      <Section
        id="horizontal"
        title="Anchor horizontal"
        description='direction="horizontal" posiciona os links em linha — útil como sub-nav de aba dentro de uma seção.'
      >
        <DemoCard
          code={`<Anchor
  direction="horizontal"
  affix={false}
  items={[
    { key: 'dash',      href: '#sec-h1', title: 'Dashboard' },
    { key: 'veiculos',  href: '#sec-h2', title: 'Veículos' },
    { key: 'servicos',  href: '#sec-h3', title: 'Serviços' },
    { key: 'oficinas',  href: '#sec-h4', title: 'Oficinas' },
    { key: 'relatorio', href: '#sec-h5', title: 'Relatórios' },
  ]}
/>`}
        >
          <div style={{
            border: `1px solid ${G[200]}`,
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
          }}>
            <div style={{
              borderBottom: `1px solid ${G[200]}`,
              padding: '0 8px',
            }}>
              <Anchor
                direction="horizontal"
                affix={false}
                items={horizontalItems}
                style={{ background: 'transparent' }}
              />
            </div>
            <div style={{ padding: '20px 16px' }}>
              <Row gutter={[12, 12]}>
                {[
                  { id: 'sec-h1', icon: <BarChartOutlined />,  label: 'Dashboard',  color: PRIMARY_BG,   tc: PRIMARY_DK },
                  { id: 'sec-h2', icon: <CarOutlined />,        label: 'Veículos',   color: '#EFF6FF',    tc: '#1677FF' },
                  { id: 'sec-h3', icon: <ToolOutlined />,        label: 'Serviços',   color: '#FFF7ED',    tc: '#D97706' },
                  { id: 'sec-h4', icon: <ShopOutlined />,        label: 'Oficinas',   color: '#FDF4FF',    tc: '#7C3AED' },
                  { id: 'sec-h5', icon: <FileTextOutlined />,   label: 'Relatórios', color: '#F0FDF4',    tc: '#16A34A' },
                ].map(sec => (
                  <Col key={sec.id} xs={24} sm={12} md={8}>
                    <FakeSection id={sec.id} icon={<span style={{ color: sec.tc }}>{sec.icon}</span>} title={sec.label} color={sec.color} textColor={sec.tc} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </DemoCard>
      </Section>

      {/* ── 4. Container interno ─────────────────────────────── */}
      <Section
        id="container"
        title="Container interno (getContainer)"
        description="Por padrão o Anchor monitora o scroll da window. Use getContainer para apontar para um elemento com overflow:auto — como um painel lateral ou modal."
      >
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ background: G[50], borderBottom: `1px solid ${G[200]}`, padding: '24px 20px' }}>
            <Row gutter={24}>
              {/* Anchor fixo */}
              <Col xs={24} sm={7}>
                <div style={{
                  border: `1px solid ${G[200]}`,
                  borderRadius: 8,
                  padding: '12px 0',
                  background: '#fff',
                  position: 'sticky',
                  top: 0,
                }}>
                  <Text style={{ fontSize: 11, color: G[400], display: 'block', padding: '0 16px', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Detalhes
                  </Text>
                  <Anchor
                    affix={false}
                    getContainer={() => containerRef.current || window}
                    items={[
                      { key: 'c-kpi',       href: '#c-kpi',       title: 'KPIs' },
                      { key: 'c-servicos',  href: '#c-servicos',  title: 'Serviços recentes' },
                      { key: 'c-tecnicos',  href: '#c-tecnicos',  title: 'Técnicos' },
                      { key: 'c-historico', href: '#c-historico', title: 'Histórico' },
                    ]}
                    style={{ background: 'transparent' }}
                  />
                </div>
              </Col>

              {/* Scrollable container */}
              <Col xs={24} sm={17}>
                <div
                  ref={containerRef}
                  style={{
                    height: 340,
                    overflowY: 'auto',
                    border: `1px solid ${G[200]}`,
                    borderRadius: 8,
                    padding: 16,
                    background: '#fff',
                  }}
                >
                  {/* KPIs */}
                  <div id="c-kpi" style={{ scrollMarginTop: 8, marginBottom: 20 }}>
                    <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>KPIs</Text>
                    <Row gutter={[10, 10]}>
                      <Col span={12}><StatMini label="Veículos" value="1.284" icon={<CarOutlined />}     color={PRIMARY_DK} /></Col>
                      <Col span={12}><StatMini label="Serviços" value="127"   icon={<ToolOutlined />}     color="#1677FF" /></Col>
                      <Col span={12}><StatMini label="Oficinas" value="38"    icon={<ShopOutlined />}     color="#D97706" /></Col>
                      <Col span={12}><StatMini label="Equipe"   value="14"    icon={<TeamOutlined />}     color="#7C3AED" /></Col>
                    </Row>
                  </div>

                  <Divider style={{ margin: '0 0 16px' }} />

                  {/* Serviços recentes */}
                  <div id="c-servicos" style={{ scrollMarginTop: 8, marginBottom: 20 }}>
                    <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>Serviços recentes</Text>
                    <Space orientation="vertical" size={6} style={{ width: '100%' }}>
                      {[
                        { plate: 'ABC-1234', service: 'Revisão completa',  status: 'Concluído',   color: '#52C41A' },
                        { plate: 'DEF-5678', service: 'Troca de óleo',     status: 'Em andamento', color: '#FAAD14' },
                        { plate: 'GHI-9012', service: 'Alinhamento',       status: 'Aguardando',  color: G[400] },
                      ].map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '8px 10px',
                          background: G[50],
                          borderRadius: 6,
                          border: `1px solid ${G[200]}`,
                        }}>
                          <Text code style={{ fontSize: 11, color: G[600] }}>{item.plate}</Text>
                          <Text style={{ fontSize: 12, color: G[600], flex: 1 }}>{item.service}</Text>
                          <Tag color={item.color} style={{ margin: 0, fontSize: 10 }}>{item.status}</Tag>
                        </div>
                      ))}
                    </Space>
                  </div>

                  <Divider style={{ margin: '0 0 16px' }} />

                  {/* Técnicos */}
                  <div id="c-tecnicos" style={{ scrollMarginTop: 8, marginBottom: 20 }}>
                    <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>Técnicos</Text>
                    <Space orientation="vertical" size={6} style={{ width: '100%' }}>
                      {['Carlos M.', 'Ana P.', 'Ricardo S.', 'Patrícia L.'].map((name, i) => (
                        <div key={name} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '6px 10px',
                          background: i === 0 ? PRIMARY_BG : G[50],
                          borderRadius: 6,
                          border: `1px solid ${i === 0 ? PRIMARY + '50' : G[200]}`,
                        }}>
                          <Avatar size={24} style={{ background: [PRIMARY, '#FAAD14', '#1677FF', '#FF4D4F'][i], fontSize: 10 }}>
                            {name[0]}
                          </Avatar>
                          <Text style={{ fontSize: 12, color: G[700], flex: 1 }}>{name}</Text>
                          <Badge status={i < 3 ? 'success' : 'default'} />
                          <Text style={{ fontSize: 11, color: i < 3 ? '#52C41A' : G[400] }}>
                            {i < 3 ? 'Ativo' : 'Ausente'}
                          </Text>
                        </div>
                      ))}
                    </Space>
                  </div>

                  <Divider style={{ margin: '0 0 16px' }} />

                  {/* Histórico */}
                  <div id="c-historico" style={{ scrollMarginTop: 8 }}>
                    <Text strong style={{ fontSize: 12, color: G[700], display: 'block', marginBottom: 10 }}>Histórico</Text>
                    <Space orientation="vertical" size={4} style={{ width: '100%' }}>
                      {[
                        { date: '10/02/2026', event: 'Revisão completa finalizada',       color: '#52C41A' },
                        { date: '22/01/2026', event: 'Peça substituída: filtro de óleo',  color: G[400] },
                        { date: '05/01/2026', event: 'Diagnóstico eletrônico concluído',  color: '#1677FF' },
                        { date: '18/12/2025', event: 'Agendamento criado pelo cliente',   color: G[400] },
                      ].map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: 10, padding: '6px 0',
                          borderBottom: i < 3 ? `1px solid ${G[100]}` : 'none',
                        }}>
                          <Text code style={{ fontSize: 10, color: G[500], flexShrink: 0 }}>{item.date}</Text>
                          <Text style={{ fontSize: 12, color: G[600] }}>{item.event}</Text>
                          <div style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 4 }} />
                        </div>
                      ))}
                    </Space>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <CodeBlock code={`const containerRef = useRef(null)

<Row>
  {/* Sidebar com Anchor */}
  <Col span={7}>
    <Anchor
      affix={false}
      getContainer={() => containerRef.current}
      items={[
        { key: 'kpi',      href: '#c-kpi',       title: 'KPIs' },
        { key: 'services', href: '#c-servicos',   title: 'Serviços recentes' },
        { key: 'team',     href: '#c-tecnicos',   title: 'Técnicos' },
        { key: 'history',  href: '#c-historico',  title: 'Histórico' },
      ]}
    />
  </Col>

  {/* Container scrollável */}
  <Col span={17}>
    <div ref={containerRef} style={{ height: 340, overflowY: 'auto' }}>
      <div id="c-kpi">…KPIs…</div>
      <div id="c-servicos">…Serviços…</div>
      <div id="c-tecnicos">…Técnicos…</div>
      <div id="c-historico">…Histórico…</div>
    </div>
  </Col>
</Row>`} />
        </div>
      </Section>

      {/* ── 5. Playground ────────────────────────────────────── */}
      <Section
        id="playground"
        title="Playground interativo"
        description="Experimente as props principais em tempo real."
      >
        {/* Controls */}
        <div style={{
          background: G[50],
          border: `1px solid ${G[200]}`,
          borderRadius: '8px 8px 0 0',
          padding: '16px 20px',
          display: 'flex',
          gap: 28,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          borderBottom: `1px solid ${G[200]}`,
        }}>
          <div>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>direction</Text>
            <Segmented
              value={direction}
              onChange={setDirection}
              size="small"
              options={[
                { label: 'vertical',    value: 'vertical' },
                { label: 'horizontal',  value: 'horizontal' },
              ]}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Switch size="small" checked={affix} onChange={setAffix} />
            <Text style={{ fontSize: 11, color: G[500] }}>affix</Text>
          </div>
          <div>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>offsetTop</Text>
            <InputNumber
              min={0} max={120} step={8}
              value={offsetTop}
              onChange={v => setOffsetTop(v ?? 0)}
              size="small"
              style={{ width: 80 }}
              disabled={!affix}
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{
          border: `1px solid ${G[200]}`,
          padding: '24px 20px',
          background: '#fff',
        }}>
          {direction === 'vertical' ? (
            <Row gutter={32}>
              <Col xs={24} sm={8}>
                <div style={{
                  border: `1px solid ${G[200]}`,
                  borderRadius: 8,
                  padding: '12px 0',
                  background: G[50],
                }}>
                  <Anchor
                    affix={affix}
                    offsetTop={offsetTop}
                    direction="vertical"
                    items={basicItems}
                    style={{ background: 'transparent' }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={16}>
                <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                  {[
                    { id: 'demo-basic',      label: 'Uso básico',     color: PRIMARY_BG,  tc: PRIMARY_DK },
                    { id: 'demo-nested',     label: 'Links aninhados', color: '#EFF6FF',   tc: '#1677FF' },
                    { id: 'demo-horizontal', label: 'Horizontal',     color: '#FFF7ED',   tc: '#D97706' },
                    { id: 'demo-container',  label: 'Container',      color: '#FDF4FF',   tc: '#7C3AED' },
                  ].map(sec => (
                    <FakeSection key={sec.id} id={sec.id} icon={<LinkOutlined />} title={sec.label} color={sec.color} textColor={sec.tc} />
                  ))}
                </Space>
              </Col>
            </Row>
          ) : (
            <div>
              <div style={{ borderBottom: `1px solid ${G[200]}`, marginBottom: 16 }}>
                <Anchor
                  affix={affix}
                  offsetTop={offsetTop}
                  direction="horizontal"
                  items={horizontalItems}
                  style={{ background: 'transparent' }}
                />
              </div>
              <Row gutter={[10, 10]}>
                {[
                  { id: 'sec-h1', label: 'Dashboard',  color: PRIMARY_BG, tc: PRIMARY_DK },
                  { id: 'sec-h2', label: 'Veículos',   color: '#EFF6FF',  tc: '#1677FF' },
                  { id: 'sec-h3', label: 'Serviços',   color: '#FFF7ED',  tc: '#D97706' },
                  { id: 'sec-h4', label: 'Oficinas',   color: '#FDF4FF',  tc: '#7C3AED' },
                  { id: 'sec-h5', label: 'Relatórios', color: '#F0FDF4',  tc: '#16A34A' },
                ].map(sec => (
                  <Col key={sec.id} xs={24} sm={12} md={8}>
                    <FakeSection id={sec.id} icon={<LinkOutlined />} title={sec.label} color={sec.color} textColor={sec.tc} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>

        <CodeBlock code={`<Anchor
  direction="${direction}"
  affix={${affix}}
  offsetTop={${offsetTop}}
  items={items}
  onChange={(activeLink) => console.log(activeLink)}
/>`} />
      </Section>

      {/* ── 6. Boas práticas ─────────────────────────────────── */}
      <Section
        id="best-practices"
        title="Boas práticas — quando usar"
        description=""
      >
        <Row gutter={[16, 16]}>
          {[
            {
              icon: <CheckCircleOutlined style={{ color: '#52C41A' }} />,
              title: 'Use Anchor quando…',
              color: '#F0FDF4',
              border: '#BBF7D0',
              items: [
                'A página tem mais de 3 seções distintas com scroll',
                'O conteúdo é longo o suficiente para o usuário se perder',
                'Existe um painel lateral disponível para o índice',
                'A URL deve refletir a âncora ativa (#seção)',
                'O conteúdo é documentação, perfil ou relatório detalhado',
              ],
            },
            {
              icon: <ExclamationCircleOutlined style={{ color: '#D97706' }} />,
              title: 'Evite Anchor quando…',
              color: '#FFFBEB',
              border: '#FDE68A',
              items: [
                'A página tem poucas seções ou é curta (use Tabs)',
                'O layout não tem espaço lateral para o índice',
                'As seções mudam dinamicamente sem IDs estáveis',
                'O usuário já navega por Step ou Wizard',
                'A âncora seria a única forma de navegação (combine com Menu)',
              ],
            },
          ].map(block => (
            <Col key={block.title} xs={24} sm={12}>
              <div style={{
                background: block.color,
                border: `1px solid ${block.border}`,
                borderRadius: 8,
                padding: '16px 18px',
                height: '100%',
              }}>
                <Space size={8} style={{ marginBottom: 12 }}>
                  {block.icon}
                  <Text strong style={{ fontSize: 13, color: G[800] }}>{block.title}</Text>
                </Space>
                <Space orientation="vertical" size={4} style={{ width: '100%' }}>
                  {block.items.map(item => (
                    <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Text style={{ color: G[400], fontSize: 14, lineHeight: '20px', flexShrink: 0 }}>·</Text>
                      <Text style={{ fontSize: 12, color: G[600], lineHeight: '20px' }}>{item}</Text>
                    </div>
                  ))}
                </Space>
              </div>
            </Col>
          ))}
        </Row>

        <Alert
          type="warning"
          showIcon
          icon={<BulbOutlined />}
          style={{ borderRadius: 8, marginTop: 16 }}
          title="Dica: scrollMarginTop"
          description={
            <span>
              Ao usar header fixo (sticky), adicione{' '}
              <Text code>scroll-margin-top: {'{'}altura do header{'}'}</Text> nos elementos alvo
              para que o conteúdo não fique escondido atrás do header após o scroll.
              No React: <Text code>{'style={{ scrollMarginTop: 64 }}'}</Text>.
            </span>
          }
        />
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 7. API — Anchor ──────────────────────────────────── */}
      <Section id="api" title="API — Anchor props">
        <Table
          columns={apiCols}
          dataSource={apiData}
          pagination={false}
          size="small"
          bordered={false}
          style={{ fontSize: 13 }}
        />
      </Section>

      {/* ── 8. API — AnchorLinkItemProps ─────────────────────── */}
      <Section id="api-item" title="API — AnchorLinkItemProps (items[])">
        <Table
          columns={apiCols}
          dataSource={itemApiData}
          pagination={false}
          size="small"
          bordered={false}
          style={{ fontSize: 13 }}
        />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['nav landmark', 'Envolva o Anchor em <nav aria-label="Índice da página"> para que leitores de tela identifiquem a região de navegação corretamente.'],
            ['IDs únicos', 'Garanta que cada id de seção alvo seja único na página. IDs duplicados causam comportamento imprevisível de scroll e foco.'],
            ['Link ativo', 'O Anchor adiciona aria-current="true" automaticamente no link ativo — leitores de tela anunciam a localização atual.'],
            ['Foco ao navegar', 'Ao clicar num link, o foco vai para o elemento alvo se ele for focável (tabIndex="-1" é suficiente para receber foco programático).'],
            ['Contraste', 'Verifique o contraste do link ativo (cor primária sobre fundo branco). O verde #12A875 sobre branco atinge razão ≥ 4.5:1 (AA).'],
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
