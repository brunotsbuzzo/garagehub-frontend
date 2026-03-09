import { useState } from 'react'
import {
  Space, Row, Col, Divider, Typography, Tag, Table, Select, Segmented,
  Button, Alert, Switch, InputNumber, Badge, Avatar, Card,
} from 'antd'
import {
  CarOutlined,
  ToolOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  PrinterOutlined,
  ShareAltOutlined,
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
    <div style={{
      background: G[50],
      borderBottom: `1px solid ${G[200]}`,
      padding: '24px 20px',
    }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* ── Visual ruler for spacing ───────────────────────────────── */
const SpaceRuler = ({ size, direction = 'horizontal' }) => {
  const isH = direction === 'horizontal'
  return (
    <div style={{
      display: 'flex',
      flexDirection: isH ? 'row' : 'column',
      alignItems: 'center',
      gap: 0,
    }}>
      <div style={{
        background: PRIMARY_BG,
        border: `1px solid ${PRIMARY}60`,
        borderRadius: 4,
        width: isH ? 60 : 80,
        height: isH ? 36 : 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 600, color: PRIMARY_DK,
        flexShrink: 0,
      }}>
        Item
      </div>
      <div style={{
        background: `${PRIMARY}22`,
        border: `1px dashed ${PRIMARY}80`,
        width: isH ? (typeof size === 'number' ? size : 8) : 80,
        height: isH ? 36 : (typeof size === 'number' ? size : 8),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Text style={{ fontSize: 9, color: PRIMARY_DK, whiteSpace: 'nowrap' }}>
          {typeof size === 'number' ? `${size}px` : size}
        </Text>
      </div>
      <div style={{
        background: '#D1FAE5',
        border: `1px solid ${PRIMARY}60`,
        borderRadius: 4,
        width: isH ? 60 : 80,
        height: isH ? 36 : 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 600, color: PRIMARY_DK,
        flexShrink: 0,
      }}>
        Item
      </div>
    </div>
  )
}

/* ── API table ──────────────────────────────────────────────── */
const apiCols = [
  { title: 'Prop', dataIndex: 'prop', width: 150,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Tipo', dataIndex: 'type', width: 300,
    render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 90,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiData = [
  { key: 'align',     prop: 'align',     type: "'start' | 'end' | 'center' | 'baseline'", default: '—',        description: 'Alinhamento transversal dos itens (cross-axis)' },
  { key: 'direction', prop: 'direction', type: "'horizontal' | 'vertical'",               default: "'horizontal'", description: 'Direção do eixo principal' },
  { key: 'size',      prop: 'size',      type: "'small' | 'middle' | 'large' | number | [h, v]", default: "'small'", description: 'Espaçamento entre itens. Array define [horizontal, vertical]' },
  { key: 'wrap',      prop: 'wrap',      type: 'boolean',                                 default: 'false',    description: 'Permite quebra de linha quando o espaço é insuficiente' },
  { key: 'split',     prop: 'split',     type: 'ReactNode',                               default: '—',        description: 'Elemento separador entre cada item (ex: <Divider orientation="vertical" />)' },
  { key: 'classNames',prop: 'classNames',type: '{ item?: string }',                       default: '—',        description: 'Classe CSS aplicada a cada item wrapper interno' },
  { key: 'styles',    prop: 'styles',    type: '{ item?: CSSProperties }',                default: '—',        description: 'Estilos inline de cada item wrapper interno' },
]

/* ── Preset sizes reference ─────────────────────────────────── */
const sizeRef = [
  { key: 'small',  label: 'small',  px: '8px',  use: 'Ações inline, tags, chips' },
  { key: 'middle', label: 'middle', px: '16px', use: 'Grupos de botões, toolbars' },
  { key: 'large',  label: 'large',  px: '24px', use: 'Seções de formulário, cards' },
  { key: 'custom', label: 'number', px: 'n px', use: 'Qualquer valor customizado' },
]

const sizeRefCols = [
  { title: 'Preset', dataIndex: 'label', width: 90,  render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Valor',  dataIndex: 'px',    width: 80,  render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Uso típico', dataIndex: 'use', render: v => <Text style={{ fontSize: 13, color: G[600] }}>{v}</Text> },
]

/* ══════════════════════════════════════════════════════════════
   SHOWCASE
═══════════════════════════════════════════════════════════════ */
export default function SpaceShowcase() {
  const [direction, setDirection] = useState('horizontal')
  const [size, setSize]           = useState('small')
  const [customSize, setCustomSize] = useState(16)
  const [wrap, setWrap]           = useState(false)
  const [align, setAlign]         = useState('center')
  const isCustom                  = size === 'custom'

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue"    style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="cyan"    style={{ borderRadius: 4 }}>Layout</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Space</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Componente de espaçamento que insere <strong>gaps consistentes</strong> entre elementos
          sem precisar de CSS manual. Substitui margens avulsas em grupos de botões,
          tags, ícones e qualquer composição inline ou em coluna.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          title="Space vs Grid"
          description={
            <span>
              Use <Text code>{'<Space>'}</Text> para agrupar <strong>poucos elementos</strong> com
              espaçamento uniforme (botões, tags, ícones). Para layouts de múltiplas colunas ou
              grids responsivos, prefira <Text code>{'<Row> / <Col>'}</Text>.
            </span>
          }
        />
      </div>

      {/* ── 1. Tamanhos predefinidos ─────────────────────────── */}
      <Section
        id="sizes"
        title="Tamanhos predefinidos"
        description="Space oferece três presets semânticos e aceita qualquer valor numérico em pixels."
      >
        <DemoCard
          code={`<Space size="small">…</Space>    {/* gap: 8px  */}
<Space size="middle">…</Space>   {/* gap: 16px */}
<Space size="large">…</Space>    {/* gap: 24px */}
<Space size={32}>…</Space>       {/* gap: 32px — valor customizado */}`}
        >
          <Space orientation="vertical" size={24} style={{ width: '100%' }}>
            {(['small', 'middle', 'large'] ).map(s => (
              <div key={s}>
                <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 6 }}>
                  size=<Text code style={{ fontSize: 11 }}>"{s}"</Text>
                  {' '}· {s === 'small' ? '8px' : s === 'middle' ? '16px' : '24px'}
                </Text>
                <Space size={s}>
                  <Button type="primary">Ação principal</Button>
                  <Button>Secundária</Button>
                  <Button type="dashed">Dashed</Button>
                </Space>
              </div>
            ))}
            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 6 }}>
                size=<Text code style={{ fontSize: 11 }}>32</Text> · customizado
              </Text>
              <Space size={32}>
                <Button type="primary">Ação principal</Button>
                <Button>Secundária</Button>
                <Button type="dashed">Dashed</Button>
              </Space>
            </div>
          </Space>
        </DemoCard>

        <Table
          columns={sizeRefCols}
          dataSource={sizeRef}
          pagination={false}
          size="small"
          bordered={false}
          style={{ fontSize: 13, marginTop: 0 }}
        />
      </Section>

      {/* ── 2. Direção ──────────────────────────────────────── */}
      <Section
        id="direction"
        title="Direção"
        description="horizontal (padrão) alinha itens em linha; vertical empilha em coluna."
      >
        <DemoCard
          code={`{/* Horizontal (padrão) */}
<Space orientation="horizontal" size="middle">
  <Button type="primary">Salvar</Button>
  <Button>Cancelar</Button>
  <Button danger>Excluir</Button>
</Space>

{/* Vertical */}
<Space orientation="vertical" size="middle" style={{ width: '100%' }}>
  <Button type="primary" block>Confirmar agendamento</Button>
  <Button block>Adiar para amanhã</Button>
  <Button danger block>Cancelar serviço</Button>
</Space>`}
        >
          <Row gutter={48}>
            <Col xs={24} sm={12}>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 10 }}>
                orientation=<Text code style={{ fontSize: 11 }}>"horizontal"</Text>
              </Text>
              <Space orientation="horizontal" size="middle">
                <Button type="primary">Salvar</Button>
                <Button>Cancelar</Button>
                <Button danger>Excluir</Button>
              </Space>
            </Col>
            <Col xs={24} sm={12}>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 10 }}>
                orientation=<Text code style={{ fontSize: 11 }}>"vertical"</Text>
              </Text>
              <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                <Button type="primary" block>Confirmar agendamento</Button>
                <Button block>Adiar para amanhã</Button>
                <Button danger block>Cancelar serviço</Button>
              </Space>
            </Col>
          </Row>
        </DemoCard>
      </Section>

      {/* ── 3. Align ────────────────────────────────────────── */}
      <Section
        id="align"
        title="Alinhamento (align)"
        description="Controla o alinhamento dos itens no eixo transversal — equivale ao align-items do Flexbox."
      >
        <DemoCard
          code={`<Space align="start">…</Space>
<Space align="center">…</Space>
<Space align="end">…</Space>
<Space align="baseline">…</Space>`}
        >
          <Row gutter={[24, 24]}>
            {(['start', 'center', 'end', 'baseline']).map(a => (
              <Col key={a} xs={24} sm={12} md={6}>
                <div style={{
                  border: `1px solid ${G[200]}`, borderRadius: 8,
                  padding: '12px 10px', background: G[50],
                }}>
                  <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8, textAlign: 'center' }}>
                    align=<Text code style={{ fontSize: 11 }}>"{a}"</Text>
                  </Text>
                  <div style={{
                    background: `${PRIMARY}10`,
                    border: `1px dashed ${PRIMARY}50`,
                    borderRadius: 4,
                    padding: '8px 6px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <Space align={a} size="small">
                      <Button size="small" type="primary">Btn</Button>
                      <div style={{
                        background: PRIMARY_BG,
                        border: `1px solid ${PRIMARY}60`,
                        borderRadius: 4,
                        padding: '4px 8px',
                        fontSize: 11,
                        color: PRIMARY_DK,
                        height: 52,
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        Alto
                      </div>
                      <Tag color="green" style={{ margin: 0 }}>Tag</Tag>
                    </Space>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </DemoCard>
      </Section>

      {/* ── 4. Wrap ─────────────────────────────────────────── */}
      <Section
        id="wrap"
        title="Wrap — Quebra de linha automática"
        description="Com wrap=true, os itens quebram para a próxima linha quando o espaço é insuficiente. Ideal para conjuntos de tags ou chips."
      >
        <DemoCard
          code={`<Space size="small" wrap>
  <Tag>Toyota Corolla</Tag>
  <Tag>VW Gol</Tag>
  <Tag>Honda Civic</Tag>
  <Tag>Ford Ka</Tag>
  {/* … mais tags */}
</Space>`}
        >
          <div style={{ maxWidth: 480 }}>
            <Space size="small" wrap>
              {[
                'Toyota Corolla', 'VW Gol', 'Honda Civic', 'Ford Ka',
                'Chevrolet Onix', 'Fiat Uno', 'Hyundai HB20', 'Renault Kwid',
                'Jeep Compass', 'Nissan Kicks', 'Mitsubishi Eclipse', 'Peugeot 208',
              ].map(car => (
                <Tag
                  key={car}
                  icon={<CarOutlined />}
                  color="default"
                  style={{ borderRadius: 20, padding: '2px 10px', margin: 0 }}
                >
                  {car}
                </Tag>
              ))}
            </Space>
          </div>
        </DemoCard>
      </Section>

      {/* ── 5. Separadores inline ────────────────────────────── */}
      <Section
        id="split"
        title="Separadores inline"
        description="No antd v6 use flatMap para intercalar separadores entre itens — mantém controle total sem depender de props descontinuadas."
      >
        <DemoCard
          code={`{/* Padrão v6: intercalar separadores com flatMap */}
const actions = ['Editar', 'Imprimir', 'Compartilhar', 'Excluir']

<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
  {actions.flatMap((label, i) => {
    const btn = <Button key={label} type="link" size="small">{label}</Button>
    return i === 0 ? [btn] : [
      <Divider key={'d'+i} orientation="vertical" style={{ margin: '0 2px' }} />,
      btn,
    ]
  })}
</div>

{/* Separador customizado · */}
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Text><strong>1.284</strong> Veículos</Text>
  <Text style={{ color: '#D1D5DB' }}>·</Text>
  <Text><strong>127</strong> Serviços</Text>
  <Text style={{ color: '#D1D5DB' }}>·</Text>
  <Text><strong>38</strong> Oficinas</Text>
</div>`}
        >
          <Space orientation="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Divider vertical via <Text code style={{ fontSize: 11 }}>flatMap</Text>
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[
                  { label: 'Editar',        icon: <EditOutlined />,     danger: false },
                  { label: 'Imprimir',      icon: <PrinterOutlined />,  danger: false },
                  { label: 'Compartilhar',  icon: <ShareAltOutlined />, danger: false },
                  { label: 'Excluir',       icon: <DeleteOutlined />,   danger: true },
                ].flatMap((item, i) => {
                  const btn = (
                    <Button key={item.label} type="link" size="small" icon={item.icon} danger={item.danger} style={{ padding: 0 }}>
                      {item.label}
                    </Button>
                  )
                  return i === 0 ? [btn] : [
                    <Divider key={`d${i}`} orientation="vertical" style={{ margin: '0 2px' }} />,
                    btn,
                  ]
                })}
              </div>
            </div>

            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Separador <Text code style={{ fontSize: 11 }}>·</Text> — stats inline
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { value: '1.284', label: 'Veículos',  color: PRIMARY_DK },
                  { value: '+127',  label: 'Serviços',  color: '#FAAD14' },
                  { value: '38',    label: 'Oficinas',  color: G[700] },
                  { value: '94,2%', label: 'Conclusão', color: '#52C41A' },
                ].flatMap((stat, i) => {
                  const el = (
                    <Text key={stat.label} style={{ fontSize: 13 }}>
                      <Text strong style={{ color: stat.color }}>{stat.value}</Text>
                      <Text style={{ color: G[500], marginLeft: 4 }}>{stat.label}</Text>
                    </Text>
                  )
                  return i === 0 ? [el] : [
                    <Text key={`s${i}`} style={{ color: G[300] }}>·</Text>,
                    el,
                  ]
                })}
              </div>
            </div>

            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Divider vertical — lista de membros
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {['Carlos M.', 'Ana P.', 'Ricardo S.', 'Patrícia L.'].flatMap((name, i) => {
                  const el = (
                    <Space key={name} size={6}>
                      <Avatar size={22} style={{ background: [PRIMARY, '#FAAD14', '#1677FF', '#FF4D4F'][i], fontSize: 10 }}>
                        {name[0]}
                      </Avatar>
                      <Text style={{ fontSize: 12, color: G[700] }}>{name}</Text>
                    </Space>
                  )
                  return i === 0 ? [el] : [
                    <Divider key={`d${i}`} orientation="vertical" style={{ height: 16 }} />,
                    el,
                  ]
                })}
              </div>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 6. Playground interativo ─────────────────────────── */}
      <Section
        id="playground"
        title="Playground interativo"
        description="Ajuste as props em tempo real e veja o Space se adaptar."
      >
        {/* Controls */}
        <div style={{
          background: G[50],
          border: `1px solid ${G[200]}`,
          borderRadius: '8px 8px 0 0',
          padding: '16px 20px',
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          borderBottom: 'none',
        }}>
          <div>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>direction</Text>
            <Segmented
              value={direction}
              onChange={setDirection}
              options={[
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical',   value: 'vertical' },
              ]}
              size="small"
            />
          </div>
          <div>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>size</Text>
            <Segmented
              value={size}
              onChange={setSize}
              options={[
                { label: 'small',  value: 'small' },
                { label: 'middle', value: 'middle' },
                { label: 'large',  value: 'large' },
                { label: 'custom', value: 'custom' },
              ]}
              size="small"
            />
          </div>
          {isCustom && (
            <div>
              <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>
                size (px)
              </Text>
              <InputNumber
                min={0} max={80} step={4}
                value={customSize}
                onChange={v => setCustomSize(v ?? 0)}
                size="small"
                style={{ width: 80 }}
              />
            </div>
          )}
          <div>
            <Text style={{ fontSize: 11, color: G[500], display: 'block', marginBottom: 4 }}>align</Text>
            <Select
              value={align}
              onChange={setAlign}
              size="small"
              style={{ width: 110 }}
              options={['start','center','end','baseline'].map(v => ({ label: v, value: v }))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Switch size="small" checked={wrap} onChange={setWrap} />
            <Text style={{ fontSize: 11, color: G[500] }}>wrap</Text>
          </div>
        </div>

        {/* Preview */}
        <div style={{
          border: `1px solid ${G[200]}`,
          borderRadius: '0 0 0 0',
          padding: '28px 20px',
          background: '#fff',
          minHeight: 100,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Space
            orientation={direction}
            size={isCustom ? customSize : size}
            align={align}
            wrap={wrap}
            style={direction === 'vertical' ? { width: '100%' } : {}}
          >
            <Button type="primary" icon={<PlusOutlined />}>Novo serviço</Button>
            <Button icon={<SearchOutlined />}>Buscar</Button>
            <Button icon={<FilterOutlined />}>Filtros</Button>
            <Button icon={<DownloadOutlined />}>Exportar</Button>
            <Button danger icon={<DeleteOutlined />}>Excluir</Button>
          </Space>
        </div>

        <CodeBlock code={`<Space
  orientation="${direction}"
  size={${isCustom ? customSize : `"${size}"`}}
  align="${align}"
  wrap={${wrap}}
>
  <Button type="primary" icon={<PlusOutlined />}>Novo serviço</Button>
  <Button icon={<SearchOutlined />}>Buscar</Button>
  <Button icon={<FilterOutlined />}>Filtros</Button>
  <Button icon={<DownloadOutlined />}>Exportar</Button>
  <Button danger icon={<DeleteOutlined />}>Excluir</Button>
</Space>`} />
      </Section>

      {/* ── 7. Padrões reais GarageHub ───────────────────────── */}
      <Section
        id="patterns"
        title="Padrões reais — GarageHub"
        description="Composições prontas para usar na plataforma."
      >

        {/* Toolbar */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Toolbar de listagem</Text>
        </div>
        <DemoCard
          code={`<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Space>
    <Button type="primary" icon={<PlusOutlined />}>Novo veículo</Button>
    <Button icon={<FilterOutlined />}>Filtros</Button>
    <Button icon={<DownloadOutlined />}>Exportar</Button>
  </Space>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Text type="secondary">1.284 registros</Text>
    <Text style={{ color: '#D1D5DB' }}>|</Text>
    <Text type="secondary">Página 1 de 54</Text>
  </div>
</div>`}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>Novo veículo</Button>
              <Button icon={<FilterOutlined />}>Filtros</Button>
              <Button icon={<DownloadOutlined />}>Exportar</Button>
            </Space>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 12, color: G[500] }}>1.284 registros</Text>
              <Text style={{ color: G[300] }}>|</Text>
              <Text style={{ fontSize: 12, color: G[500] }}>Página 1 de 54</Text>
            </div>
          </div>
        </DemoCard>

        {/* Status badges */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Status de serviço</Text>
        </div>
        <DemoCard
          code={`<Space size="small" wrap>
  <Tag icon={<CheckCircleOutlined />} color="success">Concluído</Tag>
  <Tag icon={<ClockCircleOutlined />} color="processing">Em andamento</Tag>
  <Tag icon={<ExclamationCircleOutlined />} color="warning">Aguardando peça</Tag>
  <Tag color="default">Agendado</Tag>
</Space>`}
        >
          <Space size="small" wrap>
            <Tag icon={<CheckCircleOutlined />} color="success">Concluído</Tag>
            <Tag icon={<ClockCircleOutlined />} color="processing">Em andamento</Tag>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">Aguardando peça</Tag>
            <Tag color="default">Agendado</Tag>
            <Tag color="error">Cancelado</Tag>
          </Space>
        </DemoCard>

        {/* Card de veículo */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Card de veículo com ações</Text>
        </div>
        <DemoCard
          code={`<Card
  title={
    <Space>
      <CarOutlined />
      <span>Toyota Corolla · 2022</span>
      <Tag color="green">Ativo</Tag>
    </Space>
  }
  extra={
    <Space size="small">
      <Button size="small" icon={<EditOutlined />} />
      <Button size="small" icon={<PrinterOutlined />} />
      <Button size="small" danger icon={<DeleteOutlined />} />
    </Space>
  }
>
  <Space orientation="vertical" size={4} style={{ width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      <Text type="secondary">Placa: ABC-1234</Text>
      <Text style={{ color: '#D1D5DB' }}>·</Text>
      <Text type="secondary">KM: 45.320</Text>
      <Text style={{ color: '#D1D5DB' }}>·</Text>
      <Text type="secondary">Cor: Prata</Text>
    </div>
    <Space>
      <Text type="secondary">Dono:</Text>
      <Avatar size={20} icon={<UserOutlined />} />
      <Text>João Silva</Text>
    </Space>
  </Space>
</Card>`}
        >
          <Card
            style={{ maxWidth: 520, borderRadius: 10, border: `1px solid ${G[200]}` }}
            title={
              <Space size="small">
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: PRIMARY_BG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: PRIMARY_DK,
                }}>
                  <CarOutlined />
                </div>
                <Text strong style={{ fontSize: 14 }}>Toyota Corolla · 2022</Text>
                <Tag color="success" style={{ margin: 0 }}>Ativo</Tag>
              </Space>
            }
            extra={
              <Space size={4}>
                <Button size="small" icon={<EditOutlined />} />
                <Button size="small" icon={<PrinterOutlined />} />
                <Button size="small" danger icon={<DeleteOutlined />} />
              </Space>
            }
            styles={{ body: { padding: '14px 16px' } }}
          >
            <Space orientation="vertical" size={8} style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 13, color: G[500] }}>Placa: <Text strong style={{ color: G[700] }}>ABC-1234</Text></Text>
                <Text style={{ color: G[300] }}>·</Text>
                <Text style={{ fontSize: 13, color: G[500] }}>KM: <Text strong style={{ color: G[700] }}>45.320</Text></Text>
                <Text style={{ color: G[300] }}>·</Text>
                <Text style={{ fontSize: 13, color: G[500] }}>Cor: <Text strong style={{ color: G[700] }}>Prata</Text></Text>
              </div>
              <Space size={6} align="center">
                <Text style={{ fontSize: 13, color: G[500] }}>Responsável:</Text>
                <Avatar size={20} style={{ background: PRIMARY, fontSize: 10 }}>J</Avatar>
                <Text style={{ fontSize: 13, color: G[700] }} strong>João Silva</Text>
                <Badge status="success" />
                <Text style={{ fontSize: 12, color: '#52C41A' }}>Online</Text>
              </Space>
              <Divider style={{ margin: '4px 0' }} />
              <Space size="small">
                <ToolOutlined style={{ color: G[400], fontSize: 12 }} />
                <Text style={{ fontSize: 12, color: G[500] }}>Último serviço:</Text>
                <Text style={{ fontSize: 12, color: G[700] }}>Revisão completa · 10 fev 2026</Text>
              </Space>
            </Space>
          </Card>
        </DemoCard>

        {/* Breadcrumb-like path */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 13, color: G[700] }}>Stepper de status inline</Text>
        </div>
        <DemoCard
          code={`const steps = [
  { label: 'Recebido',    color: 'success',    icon: <CheckCircleOutlined /> },
  { label: 'Diagnóstico', color: 'success',    icon: <CheckCircleOutlined /> },
  { label: 'Execução',    color: 'processing', icon: <ClockCircleOutlined /> },
  { label: 'Qualidade',   color: 'default',    icon: null },
  { label: 'Entrega',     color: 'default',    icon: null },
]

<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
  {steps.flatMap((step, i) => {
    const tag = <Tag key={step.label} color={step.color} icon={step.icon}>{step.label}</Tag>
    return i === 0 ? [tag] : [
      <Text key={'s'+i} style={{ color: '#D1D5DB', fontSize: 12 }}>›</Text>,
      tag,
    ]
  })}
</div>`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
            {[
              { label: 'Recebido',    color: 'success',    icon: <CheckCircleOutlined /> },
              { label: 'Diagnóstico', color: 'success',    icon: <CheckCircleOutlined /> },
              { label: 'Execução',    color: 'processing', icon: <ClockCircleOutlined /> },
              { label: 'Qualidade',   color: 'default',    icon: null },
              { label: 'Entrega',     color: 'default',    icon: null },
            ].flatMap((step, i) => {
              const tag = (
                <Tag key={step.label} color={step.color} icon={step.icon} style={{ margin: 0 }}>
                  {step.label}
                </Tag>
              )
              return i === 0 ? [tag] : [
                <Text key={`sep-${i}`} style={{ color: G[300], fontSize: 12 }}>›</Text>,
                tag,
              ]
            })}
          </div>
        </DemoCard>
      </Section>

      {/* ── 8. Visualização do gap ───────────────────────────── */}
      <Section
        id="gap-visual"
        title="Visualização do espaçamento"
        description="O gap inserido pelo Space é marcado em verde — nenhuma margin CSS manual necessária."
      >
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 0 }}>
          <div style={{ background: G[50], padding: '24px 20px', borderBottom: `1px solid ${G[200]}` }}>
            <Space orientation="vertical" size={20} style={{ width: '100%' }}>
              {[
                { label: 'small (8px)',  size: 8 },
                { label: 'middle (16px)', size: 16 },
                { label: 'large (24px)', size: 24 },
              ].map(({ label, size: s }) => (
                <div key={s}>
                  <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 6 }}>{label}</Text>
                  <SpaceRuler size={s} direction="horizontal" />
                </div>
              ))}
            </Space>
          </div>
          <CodeBlock code={`{/* O espaçamento é implementado como gap no flex container */}
{/* Nenhum margin extra nos itens filhos */}

.ant-space { display: flex; gap: 8px; }   /* small  */
.ant-space { display: flex; gap: 16px; }  /* middle */
.ant-space { display: flex; gap: 24px; }  /* large  */`} />
        </div>
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 9. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props">
        <Table
          columns={apiCols}
          dataSource={apiData}
          pagination={false}
          size="small"
          bordered={false}
          style={{ fontSize: 13 }}
        />
      </Section>

      {/* ── 10. Acessibilidade ──────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Elemento neutro', 'Space renderiza uma div com role implícito de apresentação. Para grupos de botões com semântica, adicione role="group" e aria-label no Space.'],
            ['Ordem de foco', 'Space preserva a ordem do DOM, logo o foco via Tab segue a ordem visual — não há surpresas para usuários de teclado.'],
            ['split e leitores', 'Separadores visuais (Divider vertical, "·") são decorativos. Adicione aria-hidden="true" no nó de split para evitar leitura desnecessária.'],
            ['wrap e zoom', 'wrap={true} garante que o conteúdo não transborde em 400% de zoom (WCAG 1.4.10 Reflow).'],
            ['Grupos de ações', 'Ao usar Space para agrupar ações de uma entidade (editar, excluir), envolva em <Space role="group" aria-label="Ações do veículo"> para contexto correto no AT.'],
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
