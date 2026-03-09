import { Tree, Space, Divider, Typography, Tag } from 'antd'
import { CarOutlined, ToolOutlined, FileTextOutlined, FolderOutlined } from '@ant-design/icons'

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

const serviceTreeData = [
  {
    title: 'Mecânica',
    key: 'mecanica',
    icon: <ToolOutlined style={{ color: '#3DD9A4' }} />,
    children: [
      {
        title: 'Motor',
        key: 'motor',
        children: [
          { title: 'Troca de Óleo', key: 'oil', isLeaf: true },
          { title: 'Filtro de Ar', key: 'air-filter', isLeaf: true },
          { title: 'Velas de Ignição', key: 'spark', isLeaf: true },
        ],
      },
      {
        title: 'Freios',
        key: 'freios',
        children: [
          { title: 'Pastilhas', key: 'pads', isLeaf: true },
          { title: 'Discos', key: 'discs', isLeaf: true },
          { title: 'Fluido', key: 'brake-fluid', isLeaf: true },
        ],
      },
      {
        title: 'Suspensão',
        key: 'suspensao',
        children: [
          { title: 'Amortecedor', key: 'shock', isLeaf: true },
          { title: 'Mola', key: 'spring', isLeaf: true },
        ],
      },
    ],
  },
  {
    title: 'Elétrica',
    key: 'eletrica',
    icon: <ToolOutlined style={{ color: '#1677FF' }} />,
    children: [
      { title: 'Bateria', key: 'battery', isLeaf: true },
      { title: 'Alternador', key: 'alternator', isLeaf: true },
      { title: 'Injeção Eletrônica', key: 'injection', isLeaf: true },
    ],
  },
  {
    title: 'Estética',
    key: 'estetica',
    icon: <ToolOutlined style={{ color: '#FAAD14' }} />,
    children: [
      { title: 'Lavagem', key: 'wash', isLeaf: true },
      { title: 'Polimento', key: 'polish', isLeaf: true },
      { title: 'Película', key: 'film', isLeaf: true },
    ],
  },
]

const documentTree = [
  {
    title: 'Documentos do Veículo',
    key: 'docs',
    icon: <FolderOutlined style={{ color: '#3DD9A4' }} />,
    children: [
      {
        title: 'Honda Civic 2022',
        key: 'civic',
        icon: <CarOutlined style={{ color: '#0E885F' }} />,
        children: [
          { title: 'CRLV 2026.pdf', key: 'crlv-civic', isLeaf: true, icon: <FileTextOutlined /> },
          { title: 'Seguro 2026.pdf', key: 'seguro-civic', isLeaf: true, icon: <FileTextOutlined /> },
          { title: 'Laudo revisão mar-26.pdf', key: 'laudo-civic', isLeaf: true, icon: <FileTextOutlined /> },
        ],
      },
      {
        title: 'Toyota Corolla 2021',
        key: 'corolla',
        icon: <CarOutlined style={{ color: '#1677FF' }} />,
        children: [
          { title: 'CRLV 2026.pdf', key: 'crlv-corolla', isLeaf: true, icon: <FileTextOutlined /> },
          { title: 'Nota de compra.pdf', key: 'nota-corolla', isLeaf: true, icon: <FileTextOutlined /> },
        ],
      },
    ],
  },
]

const TreeShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Tree</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibição hierárquica de dados em árvore. Suporta checkbox, ícones, seleção e drag & drop.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Árvore de serviços com expansão padrão.">
      <Demo>
        <Tree
          defaultExpandAll
          treeData={serviceTreeData}
          showIcon
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com checkbox" description="checkable permite seleção múltipla de nós.">
      <Demo label="Selecione os serviços para orçamento">
        <Tree
          checkable
          defaultExpandAll
          defaultCheckedKeys={['oil', 'pads']}
          treeData={serviceTreeData}
          showIcon
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com linhas de conexão" description="showLine exibe linhas entre os nós.">
      <Demo>
        <Tree
          showLine
          defaultExpandAll
          treeData={serviceTreeData}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Documentos" description="Estrutura de documentos por veículo.">
      <Demo>
        <Tree
          defaultExpandAll
          treeData={documentTree}
          showIcon
          showLine
        />
      </Demo>
    </Section>
  </div>
)

export default TreeShowcase
