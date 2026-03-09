import { Descriptions, Space, Divider, Typography, Tag, Badge, Button } from 'antd'
import { CarOutlined, EditOutlined } from '@ant-design/icons'

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

const vehicleItems = [
  { key: '1', label: 'Modelo', children: 'Honda Civic 2022' },
  { key: '2', label: 'Placa', children: <Tag>ABC-1234</Tag> },
  { key: '3', label: 'Status', children: <Badge status="success" text="Ativo" /> },
  { key: '4', label: 'Cor', children: 'Branco Perolado' },
  { key: '5', label: 'Motor', children: '1.5 Turbo Flex' },
  { key: '6', label: 'Câmbio', children: 'CVT' },
  { key: '7', label: 'Combustível', children: 'Flex' },
  { key: '8', label: 'Quilometragem', children: '45.230 km' },
  { key: '9', label: 'Aquisição', children: '10/03/2022' },
  { key: '10', label: 'Proprietário', children: 'João Silva', span: 2 },
  { key: '11', label: 'Observações', children: 'Revisão em dia. Próxima troca de óleo em 2.770 km.', span: 3 },
]

const serviceItems = [
  { key: '1', label: 'ID', children: <Text style={{ fontFamily: 'monospace' }}>SRV-2026-0148</Text> },
  { key: '2', label: 'Tipo', children: 'Revisão Geral' },
  { key: '3', label: 'Status', children: <Badge status="processing" text="Em andamento" /> },
  { key: '4', label: 'Veículo', children: 'Honda Civic 2022 (ABC-1234)' },
  { key: '5', label: 'Oficina', children: 'Oficina Silva' },
  { key: '6', label: 'Mecânico', children: 'Carlos Ferreira' },
  { key: '7', label: 'Entrada', children: '20/03/2026 09:00' },
  { key: '8', label: 'Previsão', children: '20/03/2026 17:30' },
  { key: '9', label: 'Valor estimado', children: <Text strong style={{ color: '#0E885F' }}>R$ 299,90</Text> },
]

const DescriptionsShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Descriptions</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibição de pares chave-valor em layout de grid. Ideal para detalhes de entidades e registros.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Descriptions horizontal com 3 colunas.">
      <Demo>
        <Descriptions
          title="Honda Civic 2022"
          extra={<Button icon={<EditOutlined />} size="small">Editar</Button>}
          items={vehicleItems}
          column={3}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Vertical" description="Labels acima dos valores — layout vertical.">
      <Demo>
        <Descriptions
          title="Serviço em andamento"
          layout="vertical"
          items={serviceItems}
          column={3}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Bordado" description="bordered=true adiciona linhas de grade.">
      <Demo>
        <Descriptions
          bordered
          title="Dados do veículo"
          column={{ xs: 1, sm: 2, md: 3 }}
          items={vehicleItems.slice(0, 8)}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="default e small.">
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Demo label="Default">
          <Descriptions
            bordered
            items={serviceItems.slice(0, 4)}
            column={2}
          />
        </Demo>
        <Demo label="Small">
          <Descriptions
            bordered
            size="small"
            items={serviceItems.slice(0, 4)}
            column={2}
          />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Responsivo" description="Número de colunas se adapta à largura.">
      <Demo>
        <Descriptions
          title="Perfil do proprietário"
          bordered
          column={{ xs: 1, sm: 2, lg: 3 }}
          items={[
            { key: '1', label: 'Nome', children: 'João Silva' },
            { key: '2', label: 'CPF', children: '***.***.***-00' },
            { key: '3', label: 'E-mail', children: 'joao.silva@email.com' },
            { key: '4', label: 'Telefone', children: '(11) 99999-9999' },
            { key: '5', label: 'Cidade', children: 'São Paulo, SP' },
            { key: '6', label: 'Membro desde', children: 'Março de 2024' },
          ]}
        />
      </Demo>
    </Section>
  </div>
)

export default DescriptionsShowcase
