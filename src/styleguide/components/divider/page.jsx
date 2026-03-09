import {
  Divider, Space, Typography, Tag, Table, Alert, Row, Col,
} from 'antd'
import {
  StarOutlined, ToolOutlined, CalendarOutlined, CarOutlined,
  UserOutlined, CheckCircleOutlined, ClockCircleOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph, Link } = Typography

/* ── Paleta ─────────────────────────────────────────────────── */
const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
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

const LOREM = {
  a: 'O GarageHub conecta proprietários de veículos a oficinas de confiança em todo o Brasil, facilitando agendamentos e o acompanhamento em tempo real de cada serviço.',
  b: 'Com mais de 1.200 veículos cadastrados e 38 oficinas parceiras, garantimos transparência e praticidade em cada etapa do processo de manutenção automotiva.',
  c: 'Próxima revisão recomendada em 10.000 km ou 12 meses, o que ocorrer primeiro. Consulte o histórico completo na aba Serviços.',
}

/* ── API table ──────────────────────────────────────────────── */
const apiColumns = [
  { title: 'Prop', dataIndex: 'prop', width: 160, render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Tipo', dataIndex: 'type', width: 260, render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 100, render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description', render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiData = [
  { key: 'orientation',    prop: 'orientation',    type: "'horizontal' | 'vertical'",      default: "'horizontal'", description: 'Direção do separador' },
  { key: 'titlePlacement', prop: 'titlePlacement', type: "'left' | 'center' | 'right'",   default: "'center'",     description: 'Posição do texto em relação à linha' },
  { key: 'plain',          prop: 'plain',          type: 'boolean',                         default: 'false',        description: 'Remove o negrito do texto filho' },
  { key: 'dashed',         prop: 'dashed',         type: 'boolean',                         default: 'false',        description: 'Linha tracejada' },
  { key: 'variant',        prop: 'variant',        type: "'solid' | 'dashed' | 'dotted'",  default: "'solid'",      description: 'Variante de linha (alternativa moderna a dashed)' },
  { key: 'style',          prop: 'style',          type: 'CSSProperties',                  default: '—',            description: 'Estilos inline — borderColor, borderWidth, margin etc.' },
  { key: 'styles',         prop: 'styles',         type: '{ content: CSSProperties }',     default: '—',            description: 'Token de estilo do texto interno. Ex: styles.content.margin' },
  { key: 'children',       prop: 'children',       type: 'ReactNode',                      default: '—',            description: 'Texto ou elemento exibido no centro da linha' },
]

/* ── Showcase ──────────────────────────────────────────────── */
export default function DividerShowcase() {
  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue" style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="cyan" style={{ borderRadius: 4 }}>Layout</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Divider</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Separador visual para organizar blocos de conteúdo. Funciona tanto em modo
          horizontal — entre seções de uma página — quanto vertical — entre itens inline
          como ações de uma tabela ou breadcrumbs.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          message="Divider é puramente visual"
          description={
            <span>
              Não substitui headings ou estrutura semântica. Use-o para{' '}
              <Text strong>complementar</Text> a hierarquia visual, nunca para criar
              hierarquia onde ela não existe no markup.
            </span>
          }
        />
      </div>

      {/* ── 1. Básico ───────────────────────────────────────── */}
      <Section
        id="basic"
        title="Básico"
        description="Separador horizontal simples. A linha ocupa toda a largura do contêiner pai."
      >
        <DemoCard code={`import { Divider } from 'antd'

<p>Conteúdo da seção A</p>
<Divider />
<p>Conteúdo da seção B</p>
<Divider />
<p>Conteúdo da seção C</p>`}>
          <Paragraph style={{ color: G[500], lineHeight: 1.7, marginBottom: 0 }}>{LOREM.a}</Paragraph>
          <Divider />
          <Paragraph style={{ color: G[500], lineHeight: 1.7, marginBottom: 0 }}>{LOREM.b}</Paragraph>
          <Divider />
          <Paragraph style={{ color: G[500], lineHeight: 1.7, marginBottom: 0 }}>{LOREM.c}</Paragraph>
        </DemoCard>
      </Section>

      {/* ── 2. Com texto ────────────────────────────────────── */}
      <Section
        id="with-text"
        title="Com Texto"
        description="Passe children para exibir texto ou ReactNode na linha. titlePlacement controla o alinhamento."
      >
        <DemoCard code={`// Centralizado (padrão)
<Divider>Seção de Serviços</Divider>

// Alinhado à esquerda
<Divider titlePlacement="left">Pendentes</Divider>

// Alinhado à direita
<Divider titlePlacement="right">Ver todos →</Divider>

// Sem margem no texto
<Divider titlePlacement="left" styles={{ content: { margin: 0 } }}>
  Sem espaço esquerdo
</Divider>

// Com ícone + texto
<Divider>
  <Space>
    <StarOutlined style={{ color: '#3DD9A4' }} />
    <span>Destaque</span>
  </Space>
</Divider>`}>
          <Divider>Seção de Serviços</Divider>
          <Divider titlePlacement="left">Pendentes</Divider>
          <Divider titlePlacement="right">Ver todos →</Divider>
          <Divider titlePlacement="left" styles={{ content: { margin: 0 } }}>
            Sem espaço esquerdo
          </Divider>
          <Divider>
            <Space size={6}>
              <StarOutlined style={{ color: PRIMARY }} />
              <Text strong style={{ fontSize: 13 }}>Destaque</Text>
            </Space>
          </Divider>
          <Divider>
            <Space size={6}>
              <ToolOutlined style={{ color: G[500] }} />
              <Text style={{ fontSize: 13 }}>Manutenção</Text>
            </Space>
          </Divider>
        </DemoCard>
      </Section>

      {/* ── 3. Variantes de linha ───────────────────────────── */}
      <Section
        id="variants"
        title="Variantes de Linha"
        description="Três estilos: solid (padrão), dashed e dotted. Combinam com texto e titlePlacement."
      >
        <DemoCard code={`// Solid (padrão)
<Divider />
<Divider>Solid com texto</Divider>

// Dashed
<Divider dashed />
<Divider dashed titlePlacement="left">Opcional</Divider>

// Dotted (via style)
<Divider style={{ borderStyle: 'dotted' }} />
<Divider style={{ borderStyle: 'dotted' }}>Dotted com texto</Divider>`}>
          <div>
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 4 }}>Solid</Text>
            <Divider style={{ marginTop: 0 }} />
            <Divider>Solid com texto</Divider>
          </div>
          <div style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 4 }}>Dashed</Text>
            <Divider dashed style={{ marginTop: 0 }} />
            <Divider dashed titlePlacement="left">Opcional</Divider>
          </div>
          <div style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 4 }}>Dotted</Text>
            <Divider style={{ borderStyle: 'dotted', marginTop: 0 }} />
            <Divider style={{ borderStyle: 'dotted' }}>Dotted com texto</Divider>
          </div>
        </DemoCard>
      </Section>

      {/* ── 4. Plain ────────────────────────────────────────── */}
      <Section
        id="plain"
        title="Plain — Texto sem Negrito"
        description="A prop plain remove o font-weight do texto filho, deixando-o com peso regular."
      >
        <DemoCard code={`// Padrão — texto em negrito
<Divider>Com negrito</Divider>

// Plain — texto em peso normal
<Divider plain>Sem negrito</Divider>
<Divider plain titlePlacement="left">Label de seção</Divider>
<Divider plain titlePlacement="right">Opcional</Divider>`}>
          <Divider>Com negrito (padrão)</Divider>
          <Divider plain>Sem negrito (plain)</Divider>
          <Divider plain titlePlacement="left">Label de seção</Divider>
          <Divider plain titlePlacement="right">
            <Text type="secondary" style={{ fontSize: 12 }}>Opcional</Text>
          </Divider>
        </DemoCard>
      </Section>

      {/* ── 5. Vertical ─────────────────────────────────────── */}
      <Section
        id="vertical"
        title="Vertical"
        description="type='vertical' cria um separador inline — ideal para ações em tabelas, breadcrumbs e metadados."
      >
        <DemoCard code={`// Ações de tabela
<Space>
  <Link>Editar</Link>
  <Divider type="vertical" />
  <Link>Duplicar</Link>
  <Divider type="vertical" />
  <Link type="danger">Excluir</Link>
</Space>

// Metadados de veículo
<Space>
  <Text strong>BRA-1D23</Text>
  <Divider type="vertical" />
  <Text>Honda Civic 2021</Text>
  <Divider type="vertical" />
  <Text type="secondary">42.500 km</Text>
</Space>`}>
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Ações de linha de tabela
              </Text>
              <Space size={0}>
                <Link href="#vertical">Editar</Link>
                <Divider type="vertical" />
                <Link href="#vertical">Duplicar</Link>
                <Divider type="vertical" />
                <Link href="#vertical" type="danger">Excluir</Link>
              </Space>
            </div>

            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Metadados de veículo
              </Text>
              <Space size={0} wrap>
                <Text strong style={{ fontFamily: 'monospace', letterSpacing: 1 }}>BRA-1D23</Text>
                <Divider type="vertical" />
                <Text>Honda Civic 2021</Text>
                <Divider type="vertical" />
                <Space size={4}><CarOutlined style={{ color: G[400] }} /><Text type="secondary">42.500 km</Text></Space>
                <Divider type="vertical" />
                <Space size={4}><CalendarOutlined style={{ color: G[400] }} /><Text type="secondary">15/01/2026</Text></Space>
              </Space>
            </div>

            <div>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginBottom: 8 }}>
                Dados de OS
              </Text>
              <Space size={0} wrap>
                <Space size={4}><UserOutlined style={{ color: G[400] }} /><Text>Carlos Mendes</Text></Space>
                <Divider type="vertical" />
                <Space size={4}><ToolOutlined style={{ color: G[400] }} /><Text>Troca de óleo</Text></Space>
                <Divider type="vertical" />
                <Space size={4}><CheckCircleOutlined style={{ color: '#52C41A' }} /><Text type="success">Concluído</Text></Space>
                <Divider type="vertical" />
                <Space size={4}><ClockCircleOutlined style={{ color: G[400] }} /><Text type="secondary">2h 15min</Text></Space>
              </Space>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 6. Cor e Espessura ──────────────────────────────── */}
      <Section
        id="custom"
        title="Cor e Espessura"
        description="Use style para customizar borderColor, borderWidth e margin."
      >
        <DemoCard code={`// Cores semânticas
<Divider style={{ borderColor: '#3DD9A4' }}>Primary</Divider>
<Divider style={{ borderColor: '#52C41A' }}>Success</Divider>
<Divider style={{ borderColor: '#FAAD14' }}>Warning</Divider>
<Divider style={{ borderColor: '#FF4D4F' }}>Danger</Divider>

// Espessura personalizada
<Divider style={{ borderWidth: 2, borderColor: '#3DD9A4' }}>2px</Divider>
<Divider style={{ borderWidth: 3, borderColor: '#1677FF' }}>3px</Divider>`}>
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            {[
              { color: PRIMARY,   text: 'Primary' },
              { color: '#52C41A', text: 'Success' },
              { color: '#FAAD14', text: 'Warning' },
              { color: '#FF4D4F', text: 'Danger' },
              { color: '#1677FF', text: 'Info' },
            ].map(({ color, text }) => (
              <Divider key={text} style={{ borderColor: color }}>
                <Text style={{ color, fontSize: 12 }}>{text}</Text>
              </Divider>
            ))}
          </Space>
          <Divider style={{ borderWidth: 2, borderColor: PRIMARY }}>2px</Divider>
          <Divider style={{ borderWidth: 3, borderColor: '#1677FF' }}>3px</Divider>
        </DemoCard>
      </Section>

      {/* ── 7. Composição GarageHub ─────────────────────────── */}
      <Section
        id="examples"
        title="Composição — Exemplos GarageHub"
        description="Padrões de uso real dentro da plataforma."
      >
        <Row gutter={[16, 16]}>
          {/* Card de veículo */}
          <Col xs={24} md={12}>
            <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px 0', background: '#fff' }}>
                <Title level={5} style={{ marginTop: 0, marginBottom: 0 }}>Honda Civic 2021</Title>
                <Divider style={{ marginTop: 12, marginBottom: 12 }} />
                <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 12 }}>
                  {[
                    { label: 'Placa',    value: 'BRA-1D23',   mono: true },
                    { label: 'Cor',      value: 'Prata Metálico' },
                    { label: 'Km atual', value: '42.500 km' },
                  ].map(({ label, value, mono }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary" style={{ fontSize: 13 }}>{label}</Text>
                      <Text strong style={{ fontSize: 13, fontFamily: mono ? 'monospace' : undefined }}>{value}</Text>
                    </div>
                  ))}
                </Space>
                <Divider dashed style={{ margin: '0 0 12px' }} />
                <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 16 }}>
                  {[
                    { label: 'Último serviço',  value: '15/01/2026' },
                    { label: 'Próxima revisão', value: '52.500 km' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary" style={{ fontSize: 13 }}>{label}</Text>
                      <Text style={{ fontSize: 13 }}>{value}</Text>
                    </div>
                  ))}
                </Space>
              </div>
              <CodeBlock code={`<Title level={5}>Honda Civic 2021</Title>
<Divider style={{ margin: '12px 0' }} />
{/* dados principais */}
<Divider dashed style={{ margin: '12px 0' }} />
{/* dados secundários */}`} />
            </div>
          </Col>

          {/* OS por categoria */}
          <Col xs={24} md={12}>
            <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px 0', background: '#fff' }}>
                <Divider
                  titlePlacement="left" plain
                  style={{ marginTop: 0, borderColor: '#52C41A' }}
                >
                  <Space size={4}>
                    <CheckCircleOutlined style={{ color: '#52C41A' }} />
                    <Text style={{ color: '#52C41A', fontSize: 12 }}>Concluídos (3)</Text>
                  </Space>
                </Divider>
                <Space direction="vertical" size={4} style={{ width: '100%', marginBottom: 4 }}>
                  {['Troca de óleo', 'Revisão dos freios', 'Troca do filtro de ar'].map(s => (
                    <Text key={s} type="secondary" style={{ fontSize: 13 }}>• {s}</Text>
                  ))}
                </Space>

                <Divider
                  titlePlacement="left" plain
                  style={{ borderColor: '#FAAD14' }}
                >
                  <Space size={4}>
                    <ClockCircleOutlined style={{ color: '#FAAD14' }} />
                    <Text style={{ color: '#FAAD14', fontSize: 12 }}>Pendentes (2)</Text>
                  </Space>
                </Divider>
                <Space direction="vertical" size={4} style={{ width: '100%', marginBottom: 16 }}>
                  {['Alinhamento e balanceamento', 'Revisão da suspensão'].map(s => (
                    <Text key={s} style={{ fontSize: 13 }}>• {s}</Text>
                  ))}
                </Space>
              </div>
              <CodeBlock code={`<Divider
  titlePlacement="left" plain
  style={{ borderColor: '#52C41A' }}
>
  <CheckCircleOutlined /> Concluídos (3)
</Divider>

<Divider
  titlePlacement="left" plain
  style={{ borderColor: '#FAAD14' }}
>
  <ClockCircleOutlined /> Pendentes (2)
</Divider>`} />
            </div>
          </Col>
        </Row>
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
          bordered={false}
        />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['<hr> semântico',    'O Divider horizontal renderiza um <hr> nativo — leitores de tela o anunciam como "separador", indicando mudança de tema entre blocos.'],
            ['Vertical',          'O Divider vertical usa role="separator" e aria-orientation="vertical" automaticamente.'],
            ['Texto decorativo',  'Quando o children é puramente decorativo (ex: ícone), adicione aria-hidden="true" ao elemento para não poluir o anúncio do AT.'],
            ['Não substitua heading', 'Nunca use Divider com texto como substituto de um <Title>. Use headings para títulos de seção e Divider apenas como complemento visual.'],
            ['Contraste da linha', 'A cor padrão (#E5E7EB) tem contraste suficiente sobre fundo branco. Evite tons mais claros que possam desaparecer para usuários com baixa visão.'],
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
