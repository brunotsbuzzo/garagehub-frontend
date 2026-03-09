import { Empty, Button, Space, Divider, Typography, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, CarOutlined, ToolOutlined } from '@ant-design/icons'

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

const EmptyShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Empty</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Placeholder visual para estados sem dados. Guia o usuário a executar uma ação inicial.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Padrão" description="Empty simples com imagem e descrição padrão.">
      <Demo>
        <Empty />
      </Demo>
    </Section>

    <Divider />

    <Section title="Sem imagem" description="image={null} ou Empty.PRESENTED_IMAGE_SIMPLE.">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Demo label="PRESENTED_IMAGE_SIMPLE">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Demo>
        <Demo label="Sem imagem">
          <Empty image={null} description="Sem dados" />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Com descrição personalizada" description="Texto customizado para o contexto da tela.">
      <Demo label="Lista de veículos vazia">
        <Empty
          description={
            <div>
              <Text style={{ fontSize: 14, color: G[700] }}>Nenhum veículo cadastrado</Text>
              <br />
              <Text style={{ fontSize: 13, color: G[500] }}>Adicione seu primeiro veículo para começar</Text>
            </div>
          }
        >
          <Button type="primary" icon={<PlusOutlined />}>Cadastrar veículo</Button>
        </Empty>
      </Demo>
    </Section>

    <Divider />

    <Section title="Imagem customizada" description="Substitua a imagem padrão por ícone da marca.">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Demo label="Sem veículos">
          <Empty
            image={
              <div style={{ width: 80, height: 80, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EDFCF7', borderRadius: '50%' }}>
                <CarOutlined style={{ fontSize: 36, color: '#3DD9A4' }} />
              </div>
            }
            description={
              <div>
                <Text style={{ display: 'block', fontWeight: 600 }}>Sua garagem está vazia</Text>
                <Text style={{ fontSize: 13, color: G[500] }}>Adicione veículos para agendar serviços</Text>
              </div>
            }
          >
            <Button type="primary" icon={<PlusOutlined />}>Adicionar veículo</Button>
          </Empty>
        </Demo>

        <Demo label="Sem serviços">
          <Empty
            image={
              <div style={{ width: 80, height: 80, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E6F4FF', borderRadius: '50%' }}>
                <ToolOutlined style={{ fontSize: 36, color: '#1677FF' }} />
              </div>
            }
            description={
              <div>
                <Text style={{ display: 'block', fontWeight: 600 }}>Nenhum serviço encontrado</Text>
                <Text style={{ fontSize: 13, color: G[500] }}>Agende seu primeiro serviço agora</Text>
              </div>
            }
          >
            <Button type="primary" icon={<PlusOutlined />}>Agendar serviço</Button>
          </Empty>
        </Demo>

        <Demo label="Busca sem resultados">
          <Empty
            image={
              <div style={{ width: 80, height: 80, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G[100], borderRadius: '50%' }}>
                <SearchOutlined style={{ fontSize: 36, color: G[400] }} />
              </div>
            }
            description={
              <div>
                <Text style={{ display: 'block', fontWeight: 600 }}>Nenhum resultado encontrado</Text>
                <Text style={{ fontSize: 13, color: G[500] }}>Tente buscar com outros termos</Text>
              </div>
            }
          />
        </Demo>
      </Space>
    </Section>
  </div>
)

export default EmptyShowcase
