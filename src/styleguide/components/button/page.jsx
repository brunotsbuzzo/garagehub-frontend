import { useState } from 'react'
import {
  Button as AntButton,
  Space, Divider, Typography, Row, Col, Tag, Segmented, Table, Alert,
} from 'antd'
import {
  DownloadOutlined, DeleteOutlined, PlusOutlined, SearchOutlined,
  CheckOutlined, WarningOutlined, InfoCircleOutlined, CloseCircleOutlined,
  EditOutlined, ShareAltOutlined, HeartOutlined, BellOutlined,
  ArrowRightOutlined, SendOutlined,
} from '@ant-design/icons'

/* ── Intent wrapper (inline — sem dependência de src/components) ── */
const intentStyles = {
  success: { backgroundColor: '#52C41A', borderColor: '#52C41A', color: '#fff' },
  warning: { backgroundColor: '#FAAD14', borderColor: '#FAAD14', color: '#fff' },
  info:    { backgroundColor: '#1677FF', borderColor: '#1677FF', color: '#fff' },
  danger:  { backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: '#fff' },
}
function Button({ intent, style, ...props }) {
  return (
    <AntButton
      style={{ ...(intent ? intentStyles[intent] : {}), ...style }}
      {...props}
    />
  )
}

const { Title, Text, Paragraph } = Typography

/* ── Paleta ─────────────────────────────────────────────────── */
const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

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

const Demo = ({ children, style }) => (
  <div style={{
    background: G[50],
    border: `1px solid ${G[200]}`,
    borderRadius: 8,
    padding: '24px 20px',
    ...style,
  }}>
    {children}
  </div>
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
    <Demo style={{ borderRadius: 0, border: 'none', borderBottom: `1px solid ${G[200]}` }}>
      {children}
    </Demo>
    <CodeBlock code={code} />
  </div>
)

/* ── API table columns ──────────────────────────────────────── */
const apiColumns = [
  {
    title: 'Prop',
    dataIndex: 'prop',
    width: 140,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    width: 260,
    render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Padrão',
    dataIndex: 'default',
    width: 100,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text>,
  },
]

const apiData = [
  { key: 'intent',   prop: 'intent',   type: "'success' | 'warning' | 'info' | 'danger'", default: '—',        description: 'Cor semântica adicionada pelo wrapper GarageHub' },
  { key: 'type',     prop: 'type',     type: "'primary' | 'default' | 'dashed' | 'text' | 'link'", default: "'default'", description: 'Estilo visual nativo Ant Design' },
  { key: 'size',     prop: 'size',     type: "'large' | 'middle' | 'small'", default: "'middle'",  description: 'Tamanho do botão' },
  { key: 'shape',    prop: 'shape',    type: "'default' | 'circle' | 'round'", default: "'default'", description: 'Formato do botão' },
  { key: 'icon',     prop: 'icon',     type: 'ReactNode', default: '—',        description: 'Ícone renderizado antes do label' },
  { key: 'loading',  prop: 'loading',  type: 'boolean',   default: 'false',    description: 'Exibe spinner e desabilita o botão' },
  { key: 'disabled', prop: 'disabled', type: 'boolean',   default: 'false',    description: 'Bloqueia interação' },
  { key: 'danger',   prop: 'danger',   type: 'boolean',   default: 'false',    description: 'Aplica estilo de erro/exclusão (nativo antd)' },
  { key: 'block',    prop: 'block',    type: 'boolean',   default: 'false',    description: 'Expande para 100% da largura do contêiner' },
  { key: 'ghost',    prop: 'ghost',    type: 'boolean',   default: 'false',    description: 'Fundo transparente — ideal sobre fundos coloridos' },
  { key: 'htmlType', prop: 'htmlType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo HTML nativo (para uso dentro de Form)' },
  { key: 'href',     prop: 'href',     type: 'string',    default: '—',        description: 'Transforma o botão em link <a>' },
  { key: 'target',   prop: 'target',   type: 'string',    default: '—',        description: 'Atributo target do link (ex: "_blank")' },
  { key: 'onClick',  prop: 'onClick',  type: '(e) => void', default: '—',      description: 'Callback de clique' },
]

/* ── Showcase ──────────────────────────────────────────────── */
export default function ButtonShowcase() {
  const [size, setSize] = useState('middle')
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue" style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="green" style={{ borderRadius: 4 }}>General</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Button</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Dispara ações ao ser clicado. Use quando uma ação precisa ser ativada imediatamente
          — enviar formulário, excluir registro, navegar para uma nova seção.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          message="Wrapper GarageHub"
          description={
            <span>
              O componente <Text code>Button</Text> deste design system é um wrapper sobre o{' '}
              <Text code>antd/Button</Text> que adiciona a prop <Text code>intent</Text> para variantes
              semânticas (success, warning, info, danger). Todas as demais props do antd são
              passadas diretamente.
            </span>
          }
        />
      </div>

      {/* ── 1. Tipos ────────────────────────────────────────── */}
      <Section
        id="types"
        title="Tipos"
        description="Cinco variantes visuais para diferentes níveis de hierarquia na interface."
      >
        <DemoCard
          code={`import { Button } from 'antd'

<Button type="primary">Primary</Button>
<Button>Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>`}
        >
          <Space wrap size="middle">
            <div style={{ textAlign: 'center' }}>
              <Button type="primary">Primary</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>primary</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button>Default</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>default</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button type="dashed">Dashed</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>dashed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button type="text">Text</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>text</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button type="link">Link</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>link</div>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 2. Intent ───────────────────────────────────────── */}
      <Section
        id="intent"
        title="Intent — Variantes Semânticas"
        description="Prop exclusiva do wrapper GarageHub. Aplica cores semânticas do design system sem precisar estilizar manualmente."
      >
        <DemoCard
          code={`<Button intent="success" icon={<CheckOutlined />}>Confirmar</Button>
<Button intent="warning" icon={<WarningOutlined />}>Atenção</Button>
<Button intent="info"    icon={<InfoCircleOutlined />}>Informação</Button>
<Button intent="danger"  icon={<CloseCircleOutlined />}>Excluir</Button>`}
        >
          <Space wrap size="middle">
            <div style={{ textAlign: 'center' }}>
              <Button intent="success" icon={<CheckOutlined />}>Confirmar</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>success</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button intent="warning" icon={<WarningOutlined />}>Atenção</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>warning</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button intent="info" icon={<InfoCircleOutlined />}>Informação</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>info</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button intent="danger" icon={<CloseCircleOutlined />}>Excluir</Button>
              <div style={{ fontSize: 11, color: G[400], marginTop: 6 }}>danger</div>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 3. Tamanhos ─────────────────────────────────────── */}
      <Section
        id="sizes"
        title="Tamanhos"
        description="Três tamanhos disponíveis. Use o Segmented abaixo para comparar."
      >
        <div style={{ marginBottom: 12 }}>
          <Segmented
            value={size}
            onChange={setSize}
            options={[
              { label: 'Large', value: 'large' },
              { label: 'Middle', value: 'middle' },
              { label: 'Small', value: 'small' },
            ]}
          />
        </div>
        <DemoCard
          code={`<Button type="primary" size="large">Large</Button>
<Button type="primary" size="middle">Middle</Button>
<Button type="primary" size="small">Small</Button>`}
        >
          <Space wrap align="center" size="middle">
            <Button type="primary" size={size}>Primary</Button>
            <Button size={size}>Default</Button>
            <Button type="dashed" size={size}>Dashed</Button>
            <Button intent="success" size={size}>Success</Button>
            <Button size={size} icon={<DownloadOutlined />}>Baixar</Button>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 4. Ícones ───────────────────────────────────────── */}
      <Section
        id="icons"
        title="Com Ícones"
        description="Combine com ícones do @ant-design/icons para reforçar a ação visualmente."
      >
        <DemoCard
          code={`// Ícone + label
<Button type="primary" icon={<PlusOutlined />}>Novo serviço</Button>
<Button icon={<SearchOutlined />}>Buscar</Button>
<Button icon={<DownloadOutlined />}>Exportar</Button>

// Somente ícone
<Button type="primary" icon={<PlusOutlined />} />
<Button icon={<EditOutlined />} />

// Circle e Round
<Button shape="circle" type="primary" icon={<PlusOutlined />} />
<Button shape="round" type="primary" icon={<SendOutlined />}>Enviar</Button>`}
        >
          <Space wrap size="middle">
            <Button type="primary" icon={<PlusOutlined />}>Novo serviço</Button>
            <Button icon={<SearchOutlined />}>Buscar</Button>
            <Button icon={<DownloadOutlined />}>Exportar</Button>
            <Button icon={<ShareAltOutlined />}>Compartilhar</Button>
            <Divider type="vertical" />
            <Button type="primary" icon={<PlusOutlined />} />
            <Button icon={<EditOutlined />} />
            <Button icon={<HeartOutlined />} />
            <Button icon={<BellOutlined />} />
            <Divider type="vertical" />
            <Button shape="circle" type="primary" icon={<PlusOutlined />} />
            <Button shape="circle" icon={<SearchOutlined />} />
            <Button shape="round" type="primary" icon={<SendOutlined />}>Enviar</Button>
            <Button shape="round" icon={<ArrowRightOutlined />}>Continuar</Button>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 5. Estados ──────────────────────────────────────── */}
      <Section
        id="states"
        title="Estados"
        description="Loading, disabled e danger são estados nativos do Ant Design Button."
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div style={{
              border: `1px solid ${G[200]}`, borderRadius: 8,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${G[200]}`, background: G[50] }}>
                <Text strong style={{ fontSize: 12, color: G[700] }}>Loading</Text>
              </div>
              <div style={{ padding: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" loading block>Carregando…</Button>
                  <Button loading block>Aguarde</Button>
                  <Button
                    type="primary"
                    loading={loading}
                    block
                    icon={<CheckOutlined />}
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => setLoading(false), 2000)
                    }}
                  >
                    {loading ? 'Salvando…' : 'Salvar (demo)'}
                  </Button>
                </Space>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div style={{
              border: `1px solid ${G[200]}`, borderRadius: 8,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${G[200]}`, background: G[50] }}>
                <Text strong style={{ fontSize: 12, color: G[700] }}>Disabled</Text>
              </div>
              <div style={{ padding: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" disabled block>Primary</Button>
                  <Button disabled block>Default</Button>
                  <Button type="dashed" disabled block>Dashed</Button>
                  <Button intent="success" disabled block>Success</Button>
                </Space>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div style={{
              border: `1px solid ${G[200]}`, borderRadius: 8,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${G[200]}`, background: G[50] }}>
                <Text strong style={{ fontSize: 12, color: G[700] }}>Danger</Text>
              </div>
              <div style={{ padding: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button danger block>Default</Button>
                  <Button type="primary" danger block>Primary</Button>
                  <Button type="dashed" danger block>Dashed</Button>
                  <Button type="link" danger>Link Danger</Button>
                </Space>
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ border: `1px solid ${G[200]}`, borderRadius: '0 0 8px 8px', overflow: 'hidden', marginTop: 0 }}>
          <CodeBlock code={`// Loading
<Button type="primary" loading>Carregando…</Button>

// Disabled
<Button type="primary" disabled>Desabilitado</Button>

// Danger (prop nativa antd)
<Button danger>Danger</Button>
<Button type="primary" danger>Primary Danger</Button>`} />
        </div>
      </Section>

      {/* ── 6. Ghost ────────────────────────────────────────── */}
      <Section
        id="ghost"
        title="Ghost"
        description="Fundo transparente — ideal para uso sobre banners, imagens ou contêineres coloridos."
      >
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            padding: '24px 20px',
            background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
            borderBottom: `1px solid ${G[200]}`,
          }}>
            <Space wrap>
              <Button ghost type="primary">Primary Ghost</Button>
              <Button ghost>Default Ghost</Button>
              <Button ghost type="dashed">Dashed Ghost</Button>
              <Button ghost danger>Danger Ghost</Button>
            </Space>
          </div>
          <CodeBlock code={`<Button ghost type="primary">Primary Ghost</Button>
<Button ghost>Default Ghost</Button>
<Button ghost type="dashed">Dashed Ghost</Button>
<Button ghost danger>Danger Ghost</Button>`} />
        </div>
      </Section>

      {/* ── 7. Block ────────────────────────────────────────── */}
      <Section
        id="block"
        title="Block (largura total)"
        description="A prop block expande o botão para ocupar toda a largura do contêiner — útil em formulários mobile."
      >
        <DemoCard
          code={`<Button type="primary" block>Confirmar agendamento</Button>
<Button block>Cancelar</Button>
<Button intent="danger" block icon={<DeleteOutlined />}>Excluir veículo</Button>`}
        >
          <div style={{ maxWidth: 360, margin: '0 auto' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <Button type="primary" block icon={<CheckOutlined />}>Confirmar agendamento</Button>
              <Button block>Cancelar</Button>
              <Button intent="danger" block icon={<DeleteOutlined />}>Excluir veículo</Button>
            </Space>
          </div>
        </DemoCard>
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 8. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props">
        <Table
          columns={apiColumns}
          dataSource={apiData}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          rowStyle={{ verticalAlign: 'top' }}
          bordered={false}
        />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Elemento nativo', 'Renderiza um <button> HTML — focável por Tab e ativável por Enter / Space sem nenhuma configuração extra.'],
            ['disabled', 'Adiciona o atributo disabled ao elemento HTML, impedindo foco e sinalizando ao leitor de tela corretamente.'],
            ['loading', 'Desabilita o botão automaticamente enquanto carrega, evitando duplo envio e informando o estado ao AT.'],
            ['Botão somente ícone', 'Sempre adicione aria-label para descrever a ação: <Button icon={<DeleteOutlined />} aria-label="Excluir item" />.'],
            ['htmlType="submit"', 'Use dentro de <Form> para acionar a validação nativa do Ant Design ao pressionar Enter.'],
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
