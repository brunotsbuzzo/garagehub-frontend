import { Breadcrumb, Space, Divider, Typography, Tag } from 'antd'
import {
  HomeOutlined, CarOutlined, ToolOutlined, FileTextOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 56 }}>
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

const Demo = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{
      background: G[50], border: `1px solid ${G[200]}`,
      borderRadius: 8, padding: '20px 24px',
    }}>
      {children}
    </div>
  </div>
)

const BreadcrumbShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Breadcrumb</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Exibe a localização atual do usuário dentro da hierarquia da aplicação e permite navegar de volta.
      </Paragraph>
      <Space size={8}>
        <Tag color="blue">antd v6</Tag>
        <Tag color="default">Navegação</Tag>
      </Space>
    </div>

    <Section title="Básico" description="O breadcrumb mais simples — lista de itens com separador padrão.">
      <Demo>
        <Breadcrumb
          items={[
            { title: 'Início' },
            { title: 'Veículos' },
            { title: 'Honda Civic 2022' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com ícones" description="Adicione ícones ao primeiro item ou a todos.">
      <Demo>
        <Breadcrumb
          items={[
            { title: <><HomeOutlined /> Início</> },
            { title: <><CarOutlined /> Meus Veículos</> },
            { title: <><ToolOutlined /> Serviços</> },
            { title: <><FileTextOutlined /> Revisão Geral</> },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com links" description="Itens clicáveis usando href.">
      <Demo>
        <Breadcrumb
          items={[
            { title: 'GarageHub', href: '/' },
            { title: 'Veículos', href: '/vehicles' },
            { title: 'Honda Civic', href: '/vehicles/civic' },
            { title: 'Histórico de Serviços' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Separador personalizado" description="Use separadores alternativos.">
      <Demo label="Separador ›">
        <Breadcrumb
          separator="›"
          items={[
            { title: 'Início' },
            { title: 'Oficinas' },
            { title: 'Oficina Silva' },
          ]}
        />
      </Demo>
      <Demo label="Separador /">
        <Breadcrumb
          separator="/"
          items={[
            { title: 'Início' },
            { title: 'Agendamentos' },
            { title: 'AGD-2024-001' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com menu dropdown" description="Itens intermediários podem ter sub-menus.">
      <Demo>
        <Breadcrumb
          items={[
            { title: 'Início' },
            {
              title: 'Serviços',
              menu: {
                items: [
                  { key: '1', label: 'Revisão Geral' },
                  { key: '2', label: 'Troca de Óleo' },
                  { key: '3', label: 'Alinhamento' },
                ],
              },
            },
            { title: 'Revisão Geral' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub" description="Exemplos de uso real na aplicação.">
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Demo label="Página de agendamento">
          <Breadcrumb
            items={[
              { title: <HomeOutlined />, href: '/' },
              { title: 'Minha Garagem' },
              { title: 'Honda Civic 2022' },
              { title: 'Novo Agendamento' },
            ]}
          />
        </Demo>
        <Demo label="Página de orçamento">
          <Breadcrumb
            items={[
              { title: <HomeOutlined />, href: '/' },
              { title: 'Oficinas', href: '/workshops' },
              { title: 'Oficina Silva', href: '/workshops/silva' },
              { title: 'Solicitar Orçamento' },
            ]}
          />
        </Demo>
      </Space>
    </Section>
  </div>
)

export default BreadcrumbShowcase
