import { Cascader, Space, Divider, Typography, Tag } from 'antd'

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

const locationOptions = [
  {
    value: 'sp', label: 'São Paulo',
    children: [
      {
        value: 'capital', label: 'Capital',
        children: [
          { value: 'centro', label: 'Centro' },
          { value: 'pinheiros', label: 'Pinheiros' },
          { value: 'moema', label: 'Moema' },
        ],
      },
      {
        value: 'grande-sp', label: 'Grande São Paulo',
        children: [
          { value: 'guarulhos', label: 'Guarulhos' },
          { value: 'osasco', label: 'Osasco' },
          { value: 'santo-andre', label: 'Santo André' },
        ],
      },
    ],
  },
  {
    value: 'rj', label: 'Rio de Janeiro',
    children: [
      {
        value: 'capital-rj', label: 'Capital',
        children: [
          { value: 'copacabana', label: 'Copacabana' },
          { value: 'ipanema', label: 'Ipanema' },
          { value: 'barra', label: 'Barra da Tijuca' },
        ],
      },
    ],
  },
  {
    value: 'mg', label: 'Minas Gerais',
    children: [
      {
        value: 'bh', label: 'Belo Horizonte',
        children: [
          { value: 'savassi', label: 'Savassi' },
          { value: 'lourdes', label: 'Lourdes' },
        ],
      },
    ],
  },
]

const serviceOptions = [
  {
    value: 'mecanica', label: 'Mecânica',
    children: [
      {
        value: 'motor', label: 'Motor',
        children: [
          { value: 'oil', label: 'Troca de Óleo' },
          { value: 'filter', label: 'Filtro de Ar' },
          { value: 'spark', label: 'Velas de Ignição' },
        ],
      },
      {
        value: 'freios', label: 'Freios',
        children: [
          { value: 'pads', label: 'Pastilhas de Freio' },
          { value: 'discs', label: 'Discos de Freio' },
          { value: 'fluid', label: 'Fluido de Freio' },
        ],
      },
      {
        value: 'suspensao', label: 'Suspensão',
        children: [
          { value: 'amortecedor', label: 'Amortecedor' },
          { value: 'mola', label: 'Mola' },
          { value: 'batente', label: 'Batente' },
        ],
      },
    ],
  },
  {
    value: 'eletrica', label: 'Elétrica',
    children: [
      {
        value: 'bateria', label: 'Bateria',
        children: [
          { value: 'troca-bat', label: 'Troca de Bateria' },
          { value: 'teste-bat', label: 'Teste de Bateria' },
        ],
      },
    ],
  },
]

const CascaderShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Cascader</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Seletor em cascata para dados hierárquicos como localização, categorias e sub-categorias.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Cascader com dados hierárquicos.">
      <Demo label="Selecione Estado / Cidade / Bairro">
        <Cascader
          options={locationOptions}
          placeholder="Localização da oficina"
          style={{ width: 300 }}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Busca integrada" description="Permite filtrar opções digitando.">
      <Demo>
        <Cascader
          options={serviceOptions}
          showSearch
          placeholder="Buscar serviço..."
          style={{ width: 320 }}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Múltipla seleção" description="Permite selecionar múltiplos caminhos.">
      <Demo label="Serviços para revisão completa">
        <Cascader
          options={serviceOptions}
          multiple
          placeholder="Selecione serviços..."
          style={{ width: 380 }}
          maxTagCount="responsive"
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Exibir apenas o último nível" description="displayRender mostra só o último valor.">
      <Demo>
        <Cascader
          options={locationOptions}
          displayRender={(labels) => labels[labels.length - 1]}
          placeholder="Bairro"
          style={{ width: 240 }}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Expansão ao passar o mouse" description="Expande sub-níveis com hover.">
      <Demo>
        <Cascader
          options={serviceOptions}
          expandTrigger="hover"
          placeholder="Passe o mouse para expandir"
          style={{ width: 300 }}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Estados" description="Desabilitado, erro e aviso.">
      <Demo>
        <Space wrap>
          <Cascader
            options={locationOptions}
            disabled
            defaultValue={['sp', 'capital', 'pinheiros']}
            style={{ width: 220 }}
          />
          <Cascader options={locationOptions} status="error" placeholder="Erro" style={{ width: 220 }} />
          <Cascader options={locationOptions} status="warning" placeholder="Aviso" style={{ width: 220 }} />
        </Space>
      </Demo>
    </Section>
  </div>
)

export default CascaderShowcase
