import { useState } from 'react'
import {
  Space, Typography, Tag, Table, Alert, Row, Col, Divider, Segmented, Slider,
} from 'antd'
import {
  CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, InfoCircleOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph, Link } = Typography

/* ── Paleta ─────────────────────────────────────────────────── */
const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280',
  700: '#374151', 800: '#1F2937',
}
const PRIMARY = '#3DD9A4'

/* ── Helpers ───────────────────────────────────────────────── */
const Section = ({ title, description, children, id }) => (
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

const DemoCard = ({ children, code, label }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    {label && (
      <div style={{ padding: '8px 16px', background: G[50], borderBottom: `1px solid ${G[200]}` }}>
        <Text style={{ fontSize: 12, color: G[500] }}>{label}</Text>
      </div>
    )}
    <div style={{ padding: '28px 24px', background: '#fff' }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* Linha de preview de escala tipográfica */
const ScaleRow = ({ size, weight, lineHeight, label, sample }) => (
  <div style={{
    display: 'flex', alignItems: 'baseline', gap: 20,
    padding: '14px 0',
    borderBottom: `1px solid ${G[100]}`,
  }}>
    <div style={{ width: 80, flexShrink: 0 }}>
      <Text style={{ fontSize: 11, color: G[400], display: 'block' }}>{label}</Text>
      <Text style={{ fontSize: 10, color: G[300], fontFamily: 'monospace' }}>
        {size} / {weight}
      </Text>
    </div>
    <div style={{
      fontSize: size, fontWeight: weight, lineHeight,
      color: G[800], flex: 1,
    }}>
      {sample}
    </div>
  </div>
)

/* ── API table ──────────────────────────────────────────────── */
const apiColumns = [
  { title: 'Prop', dataIndex: 'prop', width: 160, render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Tipo', dataIndex: 'type', width: 260, render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 90, render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description', render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiTitle = [
  { key: 'level',  prop: 'level',  type: '1 | 2 | 3 | 4 | 5',  default: '1',     description: 'Nível do heading — mapeia para h1–h5' },
  { key: 'type',   prop: 'type',   type: "'secondary' | 'success' | 'warning' | 'danger'", default: '—', description: 'Cor semântica do texto' },
  { key: 'italic', prop: 'italic', type: 'boolean',              default: 'false', description: 'Estilo itálico' },
]

const apiText = [
  { key: 'type',         prop: 'type',         type: "'secondary' | 'success' | 'warning' | 'danger'", default: '—',     description: 'Cor semântica' },
  { key: 'strong',       prop: 'strong',       type: 'boolean',  default: 'false', description: 'Negrito (font-weight: 600)' },
  { key: 'italic',       prop: 'italic',       type: 'boolean',  default: 'false', description: 'Itálico' },
  { key: 'underline',    prop: 'underline',    type: 'boolean',  default: 'false', description: 'Sublinhado' },
  { key: 'delete',       prop: 'delete',       type: 'boolean',  default: 'false', description: 'Tachado' },
  { key: 'mark',         prop: 'mark',         type: 'boolean',  default: 'false', description: 'Destaque amarelo (tag <mark>)' },
  { key: 'code',         prop: 'code',         type: 'boolean',  default: 'false', description: 'Estilo de código inline (tag <code>)' },
  { key: 'keyboard',     prop: 'keyboard',     type: 'boolean',  default: 'false', description: 'Estilo de tecla (tag <kbd>)' },
  { key: 'copyable',     prop: 'copyable',     type: 'boolean | CopyConfig', default: 'false', description: 'Exibe ícone de cópia. Aceita objeto de configuração' },
  { key: 'editable',     prop: 'editable',     type: 'boolean | EditableConfig', default: 'false', description: 'Permite edição inline ao clicar no ícone de lápis' },
  { key: 'disabled',     prop: 'disabled',     type: 'boolean',  default: 'false', description: 'Desabilita interações (copyable, editable)' },
]

const apiParagraph = [
  { key: 'ellipsis', prop: 'ellipsis', type: 'boolean | EllipsisConfig', default: 'false', description: 'Trunca o texto. Aceita { rows, expandable, suffix, tooltip }' },
  { key: 'copyable', prop: 'copyable', type: 'boolean | CopyConfig',     default: 'false', description: 'Ícone de cópia no parágrafo' },
  { key: 'editable', prop: 'editable', type: 'boolean | EditableConfig', default: 'false', description: 'Edição inline do parágrafo' },
]

/* ── Showcase ──────────────────────────────────────────────── */
export default function TypographyShowcase() {
  const [ellipsisRows, setEllipsisRows] = useState(3)
  const [expandable, setExpandable] = useState(true)
  const [editText, setEditText] = useState('Clique no ícone de lápis para editar este texto.')
  const [editParagraph, setEditParagraph] = useState(
    'Este é um parágrafo editável. Clique no ícone de lápis para modificar o conteúdo diretamente na página, sem precisar abrir um modal ou formulário.'
  )

  const longText = 'O GarageHub conecta proprietários de veículos a oficinas de confiança em todo o Brasil. Nossa plataforma facilita o agendamento de serviços, o acompanhamento em tempo real e o histórico completo de manutenções, garantindo transparência e praticidade em cada etapa do processo. Com mais de 1.200 veículos cadastrados e 38 oficinas parceiras, somos referência em gestão automotiva digital.'

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue" style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="green" style={{ borderRadius: 4 }}>General</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Typography</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Componentes de texto para headings, parágrafos e textos inline. Cobre todas as
          necessidades tipográficas: hierarquia visual, semântica, formatação,
          truncamento, cópia e edição inline.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          title="Fonte do projeto: Inter"
          description={
            <span>
              O GarageHub Design System usa a fonte{' '}
              <Text code>Inter</Text> (pesos 300–700) carregada via Google Fonts.
              O <Text code>ConfigProvider</Text> aplica{' '}
              <Text code>fontFamily: &quot;Inter, -apple-system, BlinkMacSystemFont, sans-serif&quot;</Text>{' '}
              globalmente a todos os componentes Ant Design.
            </span>
          }
        />
      </div>

      {/* ── 1. Escala tipográfica GarageHub ─────────────────── */}
      <Section
        id="scale"
        title="Escala Tipográfica — GarageHub"
        description="Todos os tamanhos e pesos definidos nos design tokens do projeto."
      >
        <div style={{
          border: `1px solid ${G[200]}`, borderRadius: 8,
          padding: '0 24px', background: '#fff', marginBottom: 24,
        }}>
          <ScaleRow size={38} weight={700} lineHeight={1.23} label="Heading 1" sample="Gestão de Veículos" />
          <ScaleRow size={30} weight={600} lineHeight={1.30} label="Heading 2" sample="Oficinas Parceiras" />
          <ScaleRow size={24} weight={600} lineHeight={1.35} label="Heading 3" sample="Histórico de Serviços" />
          <ScaleRow size={20} weight={600} lineHeight={1.40} label="Heading 4" sample="Agendamento Online" />
          <ScaleRow size={16} weight={600} lineHeight={1.50} label="Heading 5" sample="Detalhes do Veículo" />
          <ScaleRow size={16} weight={400} lineHeight={1.57} label="Body LG"   sample="Descrição do serviço realizado com detalhes técnicos e recomendações." />
          <ScaleRow size={14} weight={400} lineHeight={1.57} label="Body MD"   sample="Texto padrão para conteúdo geral, labels e descrições de formulário." />
          <ScaleRow size={12} weight={400} lineHeight={1.67} label="Caption"   sample="Informações auxiliares, timestamps e notas de rodapé." />
        </div>

        <CodeBlock code={`// Design tokens aplicados via ConfigProvider em App.jsx
const designTokens = {
  fontSize:           14,  // Body MD
  fontSizeLG:         16,  // Body LG
  fontSizeHeading1:   38,
  fontSizeHeading2:   30,
  fontSizeHeading3:   24,
  fontSizeHeading4:   20,
  fontSizeHeading5:   16,
  lineHeight:         1.5714,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
}`} />
      </Section>

      {/* ── 2. Title ────────────────────────────────────────── */}
      <Section
        id="title"
        title="Title"
        description="Headings de nível 1 a 5 — renderizam h1–h5 no HTML."
      >
        <DemoCard code={`import { Typography } from 'antd'
const { Title } = Typography

<Title>h1 — Gestão Automotiva</Title>
<Title level={2}>h2 — Serviços</Title>
<Title level={3}>h3 — Agendamentos</Title>
<Title level={4}>h4 — Detalhes</Title>
<Title level={5}>h5 — Notas</Title>`}>
          <Title style={{ marginTop: 0 }}>h1 — Gestão Automotiva</Title>
          <Title level={2}>h2 — Serviços</Title>
          <Title level={3}>h3 — Agendamentos</Title>
          <Title level={4}>h4 — Detalhes</Title>
          <Title level={5} style={{ marginBottom: 0 }}>h5 — Notas</Title>
        </DemoCard>

        <DemoCard
          label="Variantes semânticas e estilos"
          code={`<Title level={3} type="secondary">Secundário</Title>
<Title level={3} type="success">Sucesso</Title>
<Title level={3} type="warning">Aviso</Title>
<Title level={3} type="danger">Perigo</Title>
<Title level={3} italic>Itálico</Title>`}
        >
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Title level={3} type="secondary" style={{ margin: 0 }}>Secundário</Title>
            <Title level={3} type="success" style={{ margin: 0 }}>Sucesso</Title>
            <Title level={3} type="warning" style={{ margin: 0 }}>Aviso</Title>
            <Title level={3} type="danger" style={{ margin: 0 }}>Perigo</Title>
            <Title level={3} italic style={{ margin: 0 }}>Itálico</Title>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 3. Text ─────────────────────────────────────────── */}
      <Section
        id="text"
        title="Text"
        description="Texto inline com suporte a cores semânticas, pesos e decorações."
      >
        <DemoCard
          label="Cores semânticas"
          code={`<Text>Padrão</Text>
<Text type="secondary">Secundário</Text>
<Text type="success">Sucesso</Text>
<Text type="warning">Aviso</Text>
<Text type="danger">Perigo</Text>
<Text disabled>Desabilitado</Text>`}
        >
          <Space wrap size={24}>
            {[
              { label: 'Padrão',        type: undefined,     icon: null },
              { label: 'Secundário',    type: 'secondary',   icon: null },
              { label: 'Sucesso',       type: 'success',     icon: <CheckCircleOutlined /> },
              { label: 'Aviso',         type: 'warning',     icon: <WarningOutlined /> },
              { label: 'Perigo',        type: 'danger',      icon: <CloseCircleOutlined /> },
            ].map(({ label, type, icon }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Text type={type} style={{ fontSize: 15, display: 'block' }}>
                  {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
                  {label}
                </Text>
                <Text style={{ fontSize: 10, color: G[400], marginTop: 4, display: 'block' }}>
                  {type ? `type="${type}"` : 'default'}
                </Text>
              </div>
            ))}
            <div style={{ textAlign: 'center' }}>
              <Text disabled style={{ fontSize: 15, display: 'block' }}>Desabilitado</Text>
              <Text style={{ fontSize: 10, color: G[400], marginTop: 4, display: 'block' }}>disabled</Text>
            </div>
          </Space>
        </DemoCard>

        <DemoCard
          label="Peso e estilo"
          code={`<Text>Normal (400)</Text>
<Text strong>Negrito (600)</Text>
<Text italic>Itálico</Text>
<Text strong italic>Negrito + Itálico</Text>`}
        >
          <Space wrap size={32}>
            {[
              { label: 'Normal (400)',       strong: false, italic: false },
              { label: 'Negrito (600)',       strong: true,  italic: false },
              { label: 'Itálico',             strong: false, italic: true  },
              { label: 'Negrito + Itálico',   strong: true,  italic: true  },
            ].map(({ label, strong, italic }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Text strong={strong} italic={italic} style={{ fontSize: 16, display: 'block' }}>
                  {label}
                </Text>
                <Text style={{ fontSize: 10, color: G[400], marginTop: 4, display: 'block', fontFamily: 'monospace' }}>
                  {[strong && 'strong', italic && 'italic'].filter(Boolean).join(' ') || 'default'}
                </Text>
              </div>
            ))}
          </Space>
        </DemoCard>

        <DemoCard
          label="Decorações"
          code={`<Text underline>Sublinhado</Text>
<Text delete>Tachado</Text>
<Text mark>Marcado</Text>
<Text code>código inline</Text>
<Text keyboard>Ctrl</Text>
<Text keyboard>K</Text>`}
        >
          <Space wrap size={20} align="center">
            <div style={{ textAlign: 'center' }}>
              <Text underline style={{ fontSize: 15 }}>Sublinhado</Text>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>underline</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text delete style={{ fontSize: 15 }}>Tachado</Text>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>delete</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text mark style={{ fontSize: 15 }}>Marcado</Text>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>mark</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text code style={{ fontSize: 14 }}>código inline</Text>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>code</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Space size={4}>
                <Text keyboard>Ctrl</Text>
                <Text style={{ fontSize: 12, color: G[400] }}>+</Text>
                <Text keyboard>K</Text>
              </Space>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>keyboard</Text>
            </div>
          </Space>
        </DemoCard>

        <DemoCard
          label="Copyable — texto copiável com clique"
          code={`// String simples
<Text copyable>npm install antd</Text>

// Texto copiado diferente do exibido
<Text copyable={{ text: 'npm install antd @ant-design/icons' }}>
  Copiar comando de instalação
</Text>

// Tooltip customizado
<Text copyable={{ tooltips: ['Copiar placa', 'Placa copiada!'] }}>
  ABC-1234
</Text>`}
        >
          <Space orientation="vertical" size={16}>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                Simples
              </Text>
              <Text copyable style={{ fontFamily: 'monospace' }}>
                npm install antd @ant-design/icons
              </Text>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                Texto copiado diferente do exibido
              </Text>
              <Text copyable={{ text: 'npm install antd @ant-design/icons' }}>
                Copiar comando de instalação completo
              </Text>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                Tooltip customizado
              </Text>
              <Text
                copyable={{ tooltips: ['Copiar placa', 'Placa copiada!'] }}
                strong
                style={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 }}
              >
                ABC-1D23
              </Text>
            </div>
          </Space>
        </DemoCard>

        <DemoCard
          label="Editable — edição inline"
          code={`const [value, setValue] = useState('Clique no ícone de lápis para editar.')

<Text editable={{ onChange: setValue }}>{value}</Text>`}
        >
          <Space orientation="vertical" size={12}>
            <Text style={{ fontSize: 12, color: G[400] }}>Clique no lápis para editar:</Text>
            <Text
              editable={{ onChange: setEditText }}
              style={{ fontSize: 15, color: G[800] }}
            >
              {editText}
            </Text>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 4. Paragraph ────────────────────────────────────── */}
      <Section
        id="paragraph"
        title="Paragraph"
        description="Bloco de texto com espaçamento otimizado para leitura longa."
      >
        <DemoCard
          label="Parágrafo padrão e copyable"
          code={`<Paragraph>
  O GarageHub conecta proprietários de veículos a oficinas de confiança
  em todo o Brasil. Nossa plataforma facilita o agendamento de serviços,
  o acompanhamento em tempo real e o histórico completo de manutenções.
</Paragraph>

<Paragraph copyable>
  Texto copiável com ícone automático no final.
</Paragraph>`}
        >
          <Paragraph style={{ maxWidth: 680 }}>
            O GarageHub conecta proprietários de veículos a oficinas de confiança em todo
            o Brasil. Nossa plataforma facilita o agendamento de serviços, o acompanhamento
            em tempo real e o histórico completo de manutenções, garantindo transparência
            e praticidade em cada etapa do processo.
          </Paragraph>
          <Paragraph copyable style={{ color: G[500] }}>
            Código do veículo: GH-2024-001-ABC · Placa: BRA-1D23 · RENAVAM: 00123456789
          </Paragraph>
        </DemoCard>

        <DemoCard
          label="Parágrafo editável"
          code={`const [content, setContent] = useState('Texto do parágrafo…')

<Paragraph editable={{ onChange: setContent }}>
  {content}
</Paragraph>`}
        >
          <Paragraph
            editable={{ onChange: setEditParagraph }}
            style={{ maxWidth: 680, fontSize: 14, lineHeight: 1.7 }}
          >
            {editParagraph}
          </Paragraph>
        </DemoCard>
      </Section>

      {/* ── 5. Ellipsis ─────────────────────────────────────── */}
      <Section
        id="ellipsis"
        title="Ellipsis — Truncamento"
        description="Trunca texto longo após N linhas. Aceita botão expandir, sufixo e tooltip."
      >
        {/* Controls */}
        <Row gutter={16} style={{ marginBottom: 16 }} align="middle">
          <Col>
            <Text style={{ fontSize: 13, color: G[500] }}>
              Linhas: <Text strong>{ellipsisRows}</Text>
            </Text>
          </Col>
          <Col flex="auto" style={{ maxWidth: 200 }}>
            <Slider
              min={1} max={6}
              value={ellipsisRows}
              onChange={setEllipsisRows}
              marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6' }}
            />
          </Col>
          <Col>
            <Segmented
              value={expandable}
              onChange={setExpandable}
              options={[
                { label: 'Expandable', value: true },
                { label: 'Fixo', value: false },
              ]}
            />
          </Col>
        </Row>

        <DemoCard
          label={`ellipsis={{ rows: ${ellipsisRows}${expandable ? ', expandable: true' : ''} }}`}
          code={`// Ellipsis básico
<Paragraph ellipsis={{ rows: 3 }}>
  {longText}
</Paragraph>

// Com botão expandir
<Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Ver mais' }}>
  {longText}
</Paragraph>

// Com sufixo fixo
<Paragraph ellipsis={{ rows: 1, suffix: ' — GarageHub' }}>
  {longText}
</Paragraph>

// Com tooltip
<Paragraph ellipsis={{ rows: 2, tooltip: longText }}>
  {longText}
</Paragraph>`}
        >
          <Space orientation="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                {expandable ? 'Expandable' : 'Fixo'} · {ellipsisRows} {ellipsisRows === 1 ? 'linha' : 'linhas'}
              </Text>
              <Paragraph
                ellipsis={expandable
                  ? { rows: ellipsisRows, expandable: true, symbol: 'Ver mais' }
                  : { rows: ellipsisRows }
                }
                style={{ maxWidth: 680, marginBottom: 0 }}
              >
                {longText}
              </Paragraph>
            </div>

            <Divider style={{ margin: '4px 0' }} />

            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                Com sufixo fixo
              </Text>
              <Paragraph
                ellipsis={{ rows: 1, suffix: ' — GarageHub™' }}
                style={{ maxWidth: 680, marginBottom: 0 }}
              >
                {longText}
              </Paragraph>
            </div>

            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>
                Com tooltip (passe o mouse)
              </Text>
              <Paragraph
                ellipsis={{ rows: 2, tooltip: longText }}
                style={{ maxWidth: 680, marginBottom: 0 }}
              >
                {longText}
              </Paragraph>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 6. Link ─────────────────────────────────────────── */}
      <Section
        id="link"
        title="Link"
        description="Variante de texto para links internos e externos."
      >
        <DemoCard code={`import { Typography } from 'antd'
const { Link } = Typography

// Link externo
<Link href="https://ant.design" target="_blank">Documentação Ant Design</Link>

// Com tipo semântico
<Link type="danger" href="#">Excluir conta</Link>

// Disabled
<Link disabled>Link desabilitado</Link>`}>
          <Space wrap size={24} align="center">
            <div style={{ textAlign: 'center' }}>
              <Link href="#link" style={{ fontSize: 15 }}>Link padrão</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>default</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="#link" type="secondary" style={{ fontSize: 15 }}>Secundário</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>secondary</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="#link" type="success" style={{ fontSize: 15 }}>Sucesso</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>success</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="#link" type="warning" style={{ fontSize: 15 }}>Aviso</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>warning</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="#link" type="danger" style={{ fontSize: 15 }}>Perigo</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>danger</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link disabled style={{ fontSize: 15 }}>Desabilitado</Link>
              <Text style={{ fontSize: 10, color: G[400], display: 'block', marginTop: 4 }}>disabled</Text>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 7. Composição ───────────────────────────────────── */}
      <Section
        id="composition"
        title="Composição — Exemplo GarageHub"
        description="Como combinar os componentes de Typography em um contexto real da plataforma."
      >
        <div style={{
          border: `1px solid ${G[200]}`, borderRadius: 8,
          overflow: 'hidden', marginBottom: 24,
        }}>
          <div style={{ padding: '28px 32px', background: '#fff' }}>
            {/* Card de OS */}
            <div style={{ maxWidth: 620 }}>
              <Space size={8} style={{ marginBottom: 4 }}>
                <Tag color="green">Concluído</Tag>
                <Text type="secondary" style={{ fontSize: 12 }}>OS #GH-2024-0042</Text>
              </Space>

              <Title level={3} style={{ margin: '8px 0 4px' }}>
                Troca de óleo + revisão dos freios
              </Title>

              <Text type="secondary" style={{ fontSize: 13 }}>
                Veículo: <Text strong>Toyota Corolla 2021</Text> · Placa:{' '}
                <Text
                  copyable={{ tooltips: ['Copiar placa', 'Copiado!'] }}
                  strong
                  style={{ fontFamily: 'monospace', letterSpacing: 1 }}
                >
                  BRA-1D23
                </Text>
              </Text>

              <Divider style={{ margin: '16px 0' }} />

              <Title level={5} style={{ marginBottom: 8 }}>Descrição do serviço</Title>
              <Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: 'Ver tudo' }}
                style={{ color: G[500] }}
              >
                Realizada troca de óleo 5W30 sintético (5L), substituição do filtro de óleo,
                inspeção e regulagem das pastilhas de freio dianteiras e traseiras, verificação
                do nível do fluido de freio e limpeza do sistema de ABS. Veículo apresentava
                desgaste moderado nas pastilhas traseiras — recomendada substituição em até 10.000 km.
              </Paragraph>

              <Row gutter={24} style={{ marginTop: 16 }}>
                <Col>
                  <Text style={{ fontSize: 12, color: G[400], display: 'block' }}>Valor total</Text>
                  <Title level={4} type="success" style={{ margin: 0 }}>R$ 387,00</Title>
                </Col>
                <Col>
                  <Text style={{ fontSize: 12, color: G[400], display: 'block' }}>Mecânico</Text>
                  <Text strong>Carlos Mendes</Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 12, color: G[400], display: 'block' }}>Duração</Text>
                  <Text strong>2h 15min</Text>
                </Col>
              </Row>

              <Divider style={{ margin: '16px 0' }} />

              <Text type="secondary" style={{ fontSize: 12 }}>
                Próxima revisão recomendada em{' '}
                <Text strong type="warning">10.000 km</Text> ou{' '}
                <Text strong type="warning">12 meses</Text>, o que ocorrer primeiro.{' '}
                <Link href="#link">Ver histórico completo →</Link>
              </Text>
            </div>
          </div>
          <CodeBlock code={`<Title level={3}>Troca de óleo + revisão dos freios</Title>

<Text type="secondary">
  Placa:{' '}
  <Text copyable strong style={{ fontFamily: 'monospace' }}>BRA-1D23</Text>
</Text>

<Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Ver tudo' }}>
  Realizada troca de óleo 5W30 sintético…
</Paragraph>

<Title level={4} type="success">R$ 387,00</Title>

<Text type="secondary">
  Próxima revisão em <Text strong type="warning">10.000 km</Text> ou{' '}
  <Text strong type="warning">12 meses</Text>.{' '}
  <Link href="#">Ver histórico →</Link>
</Text>`} />
        </div>
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 8. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props">
        <Title level={5} style={{ marginBottom: 12, color: G[800] }}>Title</Title>
        <Table columns={apiColumns} dataSource={apiTitle} pagination={false} size="small" bordered={false} style={{ marginBottom: 32 }} />

        <Title level={5} style={{ marginBottom: 12, color: G[800] }}>Text</Title>
        <Table columns={apiColumns} dataSource={apiText} pagination={false} size="small" bordered={false} style={{ marginBottom: 32 }} />

        <Title level={5} style={{ marginBottom: 12, color: G[800] }}>Paragraph</Title>
        <Table columns={apiColumns} dataSource={apiParagraph} pagination={false} size="small" bordered={false} />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Hierarquia de headings', 'Use Title em ordem sequencial (h1 → h2 → h3) — nunca pule níveis. A hierarquia correta é essencial para leitores de tela e SEO.'],
            ['Não use heading para estilo', 'Se precisar de texto grande sem significado semântico de heading, use Text com style.fontSize. Headings comunicam estrutura, não aparência.'],
            ['Contraste mínimo', 'type="secondary" (#6B7280) atinge contraste 4.6:1 sobre fundo branco — acima do mínimo WCAG AA (4.5:1). Verifique ao mudar o background.'],
            ['copyable e editable', 'Ambas as interações são acessíveis via teclado. O ícone de cópia/lápis recebe foco por Tab e é acionável por Enter/Space.'],
            ['ellipsis + tooltip', 'Sempre forneça tooltip={textoCompleto} quando usar ellipsis — isso garante que usuários de teclado e AT consigam acessar o conteúdo truncado.'],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              background: G[50], borderRadius: 8, border: `1px solid ${G[200]}`,
            }}>
              <Text code style={{ flexShrink: 0, fontSize: 12, color: '#1677FF', whiteSpace: 'nowrap' }}>{title}</Text>
              <Text style={{ fontSize: 13, color: G[700] }}>{desc}</Text>
            </div>
          ))}
        </Space>
      </Section>

    </div>
  )
}
