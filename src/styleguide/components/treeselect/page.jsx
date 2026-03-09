import { TreeSelect, Space, Divider, Typography, Tag } from 'antd'

const { Title, Text, Paragraph } = Typography
const { SHOW_PARENT, SHOW_CHILD, SHOW_ALL } = TreeSelect

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

const serviceTree = [
  {
    title: 'Mecânica',
    value: 'mecanica',
    children: [
      {
        title: 'Motor',
        value: 'motor',
        children: [
          { title: 'Troca de Óleo', value: 'oil' },
          { title: 'Filtro de Ar', value: 'air-filter' },
          { title: 'Velas', value: 'spark' },
        ],
      },
      {
        title: 'Freios',
        value: 'freios',
        children: [
          { title: 'Pastilhas', value: 'pads' },
          { title: 'Discos', value: 'discs' },
          { title: 'Fluido', value: 'brake-fluid' },
        ],
      },
      {
        title: 'Suspensão',
        value: 'suspensao',
        children: [
          { title: 'Amortecedor', value: 'shock' },
          { title: 'Mola', value: 'spring' },
        ],
      },
    ],
  },
  {
    title: 'Elétrica',
    value: 'eletrica',
    children: [
      { title: 'Bateria', value: 'battery' },
      { title: 'Alternador', value: 'alternator' },
      { title: 'Injeção Eletrônica', value: 'injection' },
    ],
  },
  {
    title: 'Estética',
    value: 'estetica',
    children: [
      { title: 'Lavagem', value: 'wash' },
      { title: 'Polimento', value: 'polish' },
      { title: 'Película', value: 'film' },
    ],
  },
]

const TreeSelectShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>TreeSelect</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Selector com estrutura de árvore — ideal para dados hierárquicos como categorias e serviços.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="TreeSelect simples.">
      <Demo label="Categoria de serviço">
        <TreeSelect
          treeData={serviceTree}
          placeholder="Selecione a categoria"
          style={{ width: 280 }}
          treeDefaultExpandAll
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Múltipla seleção" description="Seleção de múltiplos nós.">
      <Demo label="Serviços da revisão">
        <TreeSelect
          treeData={serviceTree}
          placeholder="Selecione os serviços..."
          style={{ width: 400 }}
          multiple
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
          maxTagCount="responsive"
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Estratégia de exibição" description="SHOW_PARENT, SHOW_CHILD ou SHOW_ALL.">
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <Demo label="SHOW_PARENT — exibe o pai quando todos os filhos estão selecionados">
          <TreeSelect
            treeData={serviceTree}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            defaultValue={['oil', 'air-filter', 'spark']}
            style={{ width: 380 }}
            placeholder="SHOW_PARENT"
          />
        </Demo>
        <Demo label="SHOW_CHILD — exibe apenas os filhos selecionados">
          <TreeSelect
            treeData={serviceTree}
            treeCheckable
            showCheckedStrategy={SHOW_CHILD}
            defaultValue={['oil', 'pads']}
            style={{ width: 380 }}
            placeholder="SHOW_CHILD"
          />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Com busca" description="Filtro em tempo real na árvore.">
      <Demo>
        <TreeSelect
          treeData={serviceTree}
          showSearch
          placeholder="Buscar serviço..."
          style={{ width: 300 }}
          treeNodeFilterProp="title"
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Estados" description="Desabilitado e com erro.">
      <Demo>
        <Space wrap>
          <TreeSelect
            treeData={serviceTree}
            disabled
            defaultValue="oil"
            style={{ width: 220 }}
          />
          <TreeSelect
            treeData={serviceTree}
            status="error"
            placeholder="Erro"
            style={{ width: 220 }}
          />
        </Space>
      </Demo>
    </Section>
  </div>
)

export default TreeSelectShowcase
