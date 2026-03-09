import { useState } from 'react'
import {
  FloatButton, Space, Typography, Tag, Table, Alert, Row, Col, Switch,
  Segmented, Badge,
} from 'antd'
import {
  PlusOutlined, QuestionCircleOutlined, CustomerServiceOutlined,
  CommentOutlined, EditOutlined, SyncOutlined, VerticalAlignTopOutlined,
  SettingOutlined, CloseOutlined, CheckCircleOutlined, BulbOutlined,
  UpOutlined,
} from '@ant-design/icons'

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

/* Container isolado para demos do FloatButton (position: relative) */
const FloatDemo = ({ height = 140, children, code, description }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    {description && (
      <div style={{ padding: '8px 16px', background: G[50], borderBottom: `1px solid ${G[200]}` }}>
        <Text style={{ fontSize: 12, color: G[500] }}>{description}</Text>
      </div>
    )}
    <div style={{
      position: 'relative',
      height,
      background: `
        radial-gradient(circle at 1px 1px, ${G[200]} 1px, transparent 0)
      `,
      backgroundSize: '24px 24px',
      backgroundColor: G[50],
      overflow: 'hidden',
    }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* ── API table ──────────────────────────────────────────────── */
const apiColumns = [
  {
    title: 'Prop',
    dataIndex: 'prop',
    width: 160,
    render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text>,
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
    width: 100,
    render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text>,
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text>,
  },
]

const apiFloatButton = [
  { key: 'icon',        prop: 'icon',        type: 'ReactNode',                      default: '—',         description: 'Ícone do botão' },
  { key: 'description', prop: 'description', type: 'ReactNode',                      default: '—',         description: 'Texto abaixo do ícone (requer shape="square")' },
  { key: 'tooltip',     prop: 'tooltip',     type: 'ReactNode | TooltipProps',        default: '—',         description: 'Conteúdo do tooltip exibido ao passar o mouse' },
  { key: 'type',        prop: 'type',        type: "'default' | 'primary'",           default: "'default'", description: 'Estilo visual do botão' },
  { key: 'shape',       prop: 'shape',       type: "'circle' | 'square'",             default: "'circle'",  description: 'Formato do botão' },
  { key: 'badge',       prop: 'badge',       type: 'BadgeProps',                      default: '—',         description: 'Badge de notificação sobreposto (count, dot)' },
  { key: 'href',        prop: 'href',        type: 'string',                          default: '—',         description: 'Transforma o botão em link <a>' },
  { key: 'target',      prop: 'target',      type: 'string',                          default: '—',         description: 'Atributo target do link' },
  { key: 'onClick',     prop: 'onClick',     type: '(e: MouseEvent) => void',         default: '—',         description: 'Callback de clique' },
]

const apiGroup = [
  { key: 'shape',   prop: 'shape',   type: "'circle' | 'square'",              default: "'circle'",  description: 'Formato de todos os botões do grupo' },
  { key: 'trigger', prop: 'trigger', type: "'click' | 'hover'",                default: '—',         description: 'Modo de abertura do grupo' },
  { key: 'open',    prop: 'open',    type: 'boolean',                           default: '—',         description: 'Controlado externamente: open / close' },
  { key: 'onOpenChange', prop: 'onOpenChange', type: '(open: boolean) => void', default: '—',         description: 'Callback quando o estado de abertura muda' },
  { key: 'closeIcon', prop: 'closeIcon', type: 'ReactNode',                    default: '<CloseOutlined />', description: 'Ícone do botão de fechar (substitui o trigger quando aberto)' },
]

/* ── Showcase ──────────────────────────────────────────────── */
export default function FloatButtonShowcase() {
  const [groupOpen, setGroupOpen] = useState(false)
  const [shape, setShape] = useState('circle')

  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue" style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="green" style={{ borderRadius: 4 }}>General</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>FloatButton</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Botão flutuante fixado no viewport — ideal para ações globais e recorrentes como
          voltar ao topo, abrir chat de suporte ou acionar um menu de ações secundárias.
        </Paragraph>

        <Alert
          type="warning"
          showIcon
          style={{ borderRadius: 8 }}
          title="Posicionamento fixo"
          description={
            <span>
              O <Text code>FloatButton</Text> usa <Text code>position: fixed</Text> por padrão
              — ele é renderizado em relação ao viewport, não ao contêiner pai.
              As demos abaixo são renderizadas com <Text code>position: absolute</Text>{' '}
              e <Text code>overflow: hidden</Text> no contêiner para fins de demonstração.
            </span>
          }
        />
      </div>

      {/* ── 1. Básico ───────────────────────────────────────── */}
      <Section
        id="basic"
        title="Básico"
        description="FloatButton padrão com ícone. Aparece fixo no canto inferior direito."
      >
        <FloatDemo
          height={120}
          code={`import { FloatButton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

<FloatButton icon={<QuestionCircleOutlined />} tooltip="Ajuda" />`}
        >
          <FloatButton
            icon={<QuestionCircleOutlined />}
            tooltip="Ajuda"
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          />
        </FloatDemo>
      </Section>

      {/* ── 2. Tipos ────────────────────────────────────────── */}
      <Section
        id="types"
        title="Tipos"
        description="default usa a cor neutra; primary usa a cor primária do tema."
      >
        <FloatDemo
          height={120}
          code={`<FloatButton type="default" icon={<QuestionCircleOutlined />} tooltip="Default" />
<FloatButton type="primary" icon={<PlusOutlined />} tooltip="Primary" />`}
        >
          <FloatButton
            type="default"
            icon={<QuestionCircleOutlined />}
            tooltip="Default"
            style={{ position: 'absolute', bottom: 24, right: 80 }}
          />
          <FloatButton
            type="primary"
            icon={<PlusOutlined />}
            tooltip="Primary"
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          />
        </FloatDemo>
      </Section>

      {/* ── 3. Shapes ───────────────────────────────────────── */}
      <Section
        id="shape"
        title="Shape"
        description="circle é o padrão. square permite adicionar description abaixo do ícone."
      >
        <div style={{ marginBottom: 12 }}>
          <Segmented
            value={shape}
            onChange={setShape}
            options={[
              { label: 'Circle', value: 'circle' },
              { label: 'Square', value: 'square' },
            ]}
          />
        </div>

        <FloatDemo
          height={140}
          code={`// Circle (padrão)
<FloatButton shape="circle" icon={<CustomerServiceOutlined />} />

// Square — suporta description
<FloatButton
  shape="square"
  icon={<CustomerServiceOutlined />}
  description="Suporte"
/>`}
        >
          <FloatButton
            shape={shape}
            type="primary"
            icon={<CustomerServiceOutlined />}
            description={shape === 'square' ? 'Suporte' : undefined}
            tooltip={shape === 'circle' ? 'Suporte' : undefined}
            style={{ position: 'absolute', bottom: 24, right: 80 }}
          />
          <FloatButton
            shape={shape}
            icon={<EditOutlined />}
            description={shape === 'square' ? 'Editar' : undefined}
            tooltip={shape === 'circle' ? 'Editar' : undefined}
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          />
        </FloatDemo>
      </Section>

      {/* ── 4. Tooltip ──────────────────────────────────────── */}
      <Section
        id="tooltip"
        title="Tooltip"
        description="Passe uma string ou ReactNode para tooltip. Exibido ao passar o mouse sobre o botão."
      >
        <FloatDemo
          height={120}
          code={`<FloatButton
  icon={<BulbOutlined />}
  tooltip={
    <div>
      <strong>Dica:</strong> Clique para ver sugestões
    </div>
  }
/>`}
        >
          <FloatButton
            type="primary"
            icon={<BulbOutlined />}
            tooltip={<div><strong>Dica:</strong> Clique para ver sugestões</div>}
            style={{ position: 'absolute', bottom: 24, right: 80 }}
          />
          <FloatButton
            icon={<QuestionCircleOutlined />}
            tooltip="Precisa de ajuda?"
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          />
        </FloatDemo>
      </Section>

      {/* ── 5. Badge ────────────────────────────────────────── */}
      <Section
        id="badge"
        title="Badge"
        description="Sobrepõe um badge de contagem ou ponto ao FloatButton — útil para notificações."
      >
        <FloatDemo
          height={120}
          code={`// Contagem
<FloatButton badge={{ count: 5 }} icon={<CommentOutlined />} />

// Ponto (dot)
<FloatButton badge={{ dot: true }} icon={<BellOutlined />} />

// Contagem máxima
<FloatButton badge={{ count: 99, overflowCount: 50 }} icon={<CustomerServiceOutlined />} />`}
        >
          <FloatButton
            badge={{ count: 5 }}
            icon={<CommentOutlined />}
            type="primary"
            tooltip="5 mensagens"
            style={{ position: 'absolute', bottom: 24, right: 136 }}
          />
          <FloatButton
            badge={{ dot: true }}
            icon={<CustomerServiceOutlined />}
            tooltip="Notificação"
            style={{ position: 'absolute', bottom: 24, right: 80 }}
          />
          <FloatButton
            badge={{ count: 99, overflowCount: 50 }}
            type="primary"
            icon={<SettingOutlined />}
            tooltip="Configurações"
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          />
        </FloatDemo>
      </Section>

      {/* ── 6. Group — hover ────────────────────────────────── */}
      <Section
        id="group-hover"
        title="FloatButton.Group — Hover"
        description="Agrupa múltiplos botões em um grupo expansível. trigger='hover' abre ao passar o mouse."
      >
        <FloatDemo
          height={240}
          code={`<FloatButton.Group
  trigger="hover"
  type="primary"
  icon={<CustomerServiceOutlined />}
>
  <FloatButton icon={<CommentOutlined />} tooltip="Chat" />
  <FloatButton icon={<QuestionCircleOutlined />} tooltip="Ajuda" />
  <FloatButton icon={<BulbOutlined />} tooltip="Dicas" />
</FloatButton.Group>`}
          description="Passe o mouse sobre o botão principal para expandir o grupo"
        >
          <FloatButton.Group
            trigger="hover"
            type="primary"
            icon={<CustomerServiceOutlined />}
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          >
            <FloatButton icon={<CommentOutlined />} tooltip="Chat" />
            <FloatButton icon={<QuestionCircleOutlined />} tooltip="Ajuda" />
            <FloatButton icon={<BulbOutlined />} tooltip="Dicas" />
          </FloatButton.Group>
        </FloatDemo>
      </Section>

      {/* ── 7. Group — click ────────────────────────────────── */}
      <Section
        id="group-click"
        title="FloatButton.Group — Click"
        description="trigger='click' abre/fecha ao clicar. Suporta controle externo via open + onOpenChange."
      >
        <Row gutter={16} style={{ marginBottom: 12 }} align="middle">
          <Col>
            <Text style={{ fontSize: 13, color: G[500] }}>Controle externo:</Text>
          </Col>
          <Col>
            <Switch
              checked={groupOpen}
              onChange={setGroupOpen}
              checkedChildren="Aberto"
              unCheckedChildren="Fechado"
            />
          </Col>
        </Row>

        <FloatDemo
          height={260}
          code={`const [open, setOpen] = useState(false)

<FloatButton.Group
  open={open}
  trigger="click"
  type="primary"
  icon={<PlusOutlined />}
  closeIcon={<CloseOutlined />}
  onOpenChange={setOpen}
>
  <FloatButton icon={<EditOutlined />} tooltip="Editar" />
  <FloatButton icon={<SyncOutlined />} tooltip="Sincronizar" />
  <FloatButton icon={<CheckCircleOutlined />} tooltip="Concluir" />
</FloatButton.Group>`}
          description="Clique no botão principal para abrir/fechar"
        >
          <FloatButton.Group
            open={groupOpen}
            trigger="click"
            type="primary"
            icon={<PlusOutlined />}
            closeIcon={<CloseOutlined />}
            onOpenChange={setGroupOpen}
            style={{ position: 'absolute', bottom: 24, right: 24 }}
          >
            <FloatButton icon={<EditOutlined />} tooltip="Editar" />
            <FloatButton icon={<SyncOutlined />} tooltip="Sincronizar" />
            <FloatButton icon={<CheckCircleOutlined />} tooltip="Concluir" />
          </FloatButton.Group>
        </FloatDemo>
      </Section>

      {/* ── 8. BackTop ──────────────────────────────────────── */}
      <Section
        id="backtop"
        title="FloatButton.BackTop"
        description="Atalho para voltar ao topo da página. Aparece automaticamente após rolar 400px."
      >
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '16px 20px', background: G[50], borderBottom: `1px solid ${G[200]}` }}>
            <Space align="center">
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#3DD9A4', flexShrink: 0,
              }} />
              <Text style={{ fontSize: 13, color: G[500] }}>
                Rolar esta página para baixo ativa o botão BackTop nativo no canto inferior direito.
              </Text>
            </Space>
          </div>
          <div style={{ padding: '20px 20px 0' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{
                  background: G[100], borderRadius: 8, padding: 16,
                  border: `1px solid ${G[200]}`,
                }}>
                  <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 13 }}>
                    Padrão
                  </Text>
                  <Text style={{ fontSize: 12, color: G[500] }}>
                    Ícone de seta padrão, aparece após 400px de scroll.
                  </Text>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{
                  background: G[100], borderRadius: 8, padding: 16,
                  border: `1px solid ${G[200]}`,
                }}>
                  <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 13 }}>
                    Personalizado
                  </Text>
                  <Text style={{ fontSize: 12, color: G[500] }}>
                    Aceita icon, tooltip e visibilityHeight customizados.
                  </Text>
                </div>
              </Col>
            </Row>
          </div>
          <CodeBlock code={`// Padrão — ícone de seta automático
<FloatButton.BackTop />

// Personalizado
<FloatButton.BackTop
  icon={<UpOutlined />}
  tooltip="Voltar ao topo"
  visibilityHeight={200}
  type="primary"
/>

// Dentro de contêiner com scroll
<FloatButton.BackTop target={() => document.getElementById('meu-container')} />`} />
        </div>

        {/* BackTop real desta página */}
        <FloatButton.BackTop
          icon={<UpOutlined />}
          tooltip="Voltar ao topo"
          visibilityHeight={300}
          type="primary"
        />
      </Section>

      {/* ── 9. Casos de uso GarageHub ───────────────────────── */}
      <Section
        id="examples"
        title="Casos de uso — GarageHub"
        description="Exemplos aplicados ao contexto da plataforma."
      >
        <Row gutter={[16, 16]}>
          {[
            {
              label: 'Suporte ao cliente',
              desc: 'Grupo com chat, telefone e FAQ acessível de qualquer página.',
              code: `<FloatButton.Group trigger="hover" type="primary" icon={<CustomerServiceOutlined />}>
  <FloatButton icon={<CommentOutlined />} tooltip="Chat" />
  <FloatButton icon={<QuestionCircleOutlined />} tooltip="FAQ" />
</FloatButton.Group>`,
            },
            {
              label: 'Ações de registro',
              desc: 'Adicionar veículo, serviço ou agendamento rapidamente.',
              code: `<FloatButton.Group trigger="click" type="primary" icon={<PlusOutlined />}>
  <FloatButton icon={<CarOutlined />} tooltip="Novo veículo" />
  <FloatButton icon={<ToolOutlined />} tooltip="Novo serviço" />
  <FloatButton icon={<CalendarOutlined />} tooltip="Agendar" />
</FloatButton.Group>`,
            },
            {
              label: 'Notificações',
              desc: 'Badge de contagem sobre ícone de chat para mensagens não lidas.',
              code: `<FloatButton
  badge={{ count: mensagensNaoLidas }}
  icon={<CommentOutlined />}
  type="primary"
  tooltip="Mensagens"
/>`,
            },
          ].map(({ label, desc, code }) => (
            <Col xs={24} key={label}>
              <div style={{
                border: `1px solid ${G[200]}`, borderRadius: 8,
                overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', background: G[50], borderBottom: `1px solid ${G[200]}` }}>
                  <Text strong style={{ fontSize: 13, color: G[800] }}>{label}</Text>
                  <Text style={{ display: 'block', fontSize: 12, color: G[500], marginTop: 2 }}>{desc}</Text>
                </div>
                <CodeBlock code={code} />
              </div>
            </Col>
          ))}
        </Row>
      </Section>

      {/* ── 10. API ─────────────────────────────────────────── */}
      <Section id="api-floatbutton" title="API — FloatButton">
        <Table
          columns={apiColumns}
          dataSource={apiFloatButton}
          pagination={false}
          size="small"
          style={{ marginBottom: 32, fontSize: 13 }}
          bordered={false}
        />

        <Title level={5} style={{ marginBottom: 12, color: G[800] }}>FloatButton.Group</Title>
        <Table
          columns={apiColumns}
          dataSource={apiGroup}
          pagination={false}
          size="small"
          style={{ marginBottom: 32, fontSize: 13 }}
          bordered={false}
        />

        <Title level={5} style={{ marginBottom: 12, color: G[800] }}>FloatButton.BackTop</Title>
        <Table
          columns={apiColumns}
          dataSource={[
            { key: 'visibilityHeight', prop: 'visibilityHeight', type: 'number', default: '400', description: 'Scroll mínimo (px) para o botão aparecer' },
            { key: 'target', prop: 'target', type: '() => HTMLElement', default: '() => window', description: 'Contêiner alvo do scroll' },
            { key: 'duration', prop: 'duration', type: 'number', default: '450', description: 'Duração da animação de scroll em ms' },
            { key: 'onClick', prop: 'onClick', type: '() => void', default: '—', description: 'Callback ao clicar no botão' },
          ]}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          bordered={false}
        />
      </Section>

      {/* ── 11. Acessibilidade ──────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['tooltip obrigatório', 'FloatButton com somente ícone deve sempre ter tooltip — é a única descrição acessível da ação para leitores de tela.'],
            ['aria-label', 'Se não usar tooltip, adicione aria-label diretamente: <FloatButton aria-label="Novo veículo" icon={<PlusOutlined />} />.'],
            ['Focus trap no grupo', 'Ao abrir um FloatButton.Group via teclado, o foco é movido para dentro do grupo. Pressione Esc para fechar.'],
            ['BackTop', 'Garante que usuários de teclado possam voltar ao topo sem rolar manualmente — melhora a navegação por Tab.'],
            ['z-index', 'O FloatButton usa z-index alto por padrão. Certifique-se de que não está sobrepondo modais ou drawers abertos.'],
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
