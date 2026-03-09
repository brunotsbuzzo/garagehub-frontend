import { Collapse, Space, Divider, Typography, Tag, Alert } from 'antd'
import { CarOutlined, ToolOutlined, QuestionCircleOutlined } from '@ant-design/icons'

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

const faqItems = [
  {
    key: '1',
    label: 'Como faço para agendar um serviço?',
    children: <Paragraph style={{ margin: 0, color: G[700] }}>Acesse "Meus Veículos", selecione o veículo desejado e clique em "Agendar Serviço". Escolha o tipo de serviço, a oficina mais próxima e o horário disponível.</Paragraph>,
  },
  {
    key: '2',
    label: 'Posso cancelar um agendamento?',
    children: <Paragraph style={{ margin: 0, color: G[700] }}>Sim! Você pode cancelar até 24 horas antes do horário agendado sem nenhuma cobrança. Acesse "Agendamentos" e clique em "Cancelar".</Paragraph>,
  },
  {
    key: '3',
    label: 'Como acompanhar o progresso do meu serviço?',
    children: <Paragraph style={{ margin: 0, color: G[700] }}>Na aba "Serviços em Andamento", você verá a barra de progresso atualizada em tempo real. A oficina pode enviar fotos e mensagens diretamente pelo app.</Paragraph>,
  },
  {
    key: '4',
    label: 'O GarageHub tem garantia nos serviços?',
    children: <Paragraph style={{ margin: 0, color: G[700] }}>Todas as oficinas parceiras oferecem garantia mínima de 90 dias em peças e mão de obra. A garantia fica registrada automaticamente no histórico do veículo.</Paragraph>,
  },
]

const serviceItems = [
  {
    key: 'motor',
    label: <Space><ToolOutlined style={{ color: '#3DD9A4' }} />Motor</Space>,
    extra: <Tag color="green">6 opções</Tag>,
    children: (
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        {['Troca de Óleo', 'Filtro de Ar', 'Velas de Ignição', 'Correia Dentada', 'Radiador', 'Bomba d\'água'].map(s => (
          <div key={s} style={{ padding: '8px 0', borderBottom: `1px solid ${G[100]}` }}>
            <Text>{s}</Text>
          </div>
        ))}
      </Space>
    ),
  },
  {
    key: 'freios',
    label: <Space><ToolOutlined style={{ color: '#1677FF' }} />Freios</Space>,
    extra: <Tag color="blue">4 opções</Tag>,
    children: (
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        {['Pastilhas de Freio', 'Discos de Freio', 'Fluido de Freio', 'Tambor de Freio'].map(s => (
          <div key={s} style={{ padding: '8px 0', borderBottom: `1px solid ${G[100]}` }}>
            <Text>{s}</Text>
          </div>
        ))}
      </Space>
    ),
  },
  {
    key: 'eletrica',
    label: <Space><ToolOutlined style={{ color: '#FAAD14' }} />Elétrica</Space>,
    extra: <Tag color="warning">3 opções</Tag>,
    children: (
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        {['Bateria', 'Alternador', 'Injeção Eletrônica'].map(s => (
          <div key={s} style={{ padding: '8px 0', borderBottom: `1px solid ${G[100]}` }}>
            <Text>{s}</Text>
          </div>
        ))}
      </Space>
    ),
  },
]

const CollapseShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Collapse</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Painel de acordeão que expande/recolhe seções de conteúdo. Suporta múltiplos painéis abertos ou apenas um.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Accordion padrão — abre um painel por vez.">
      <Demo>
        <Collapse
          accordion
          defaultActiveKey={['1']}
          items={faqItems}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Múltiplos painéis" description="Vários painéis podem ser abertos simultaneamente.">
      <Demo>
        <Collapse
          defaultActiveKey={['motor', 'freios']}
          items={serviceItems}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Variantes visuais" description="ghost, borderless e sem ícone de seta.">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Demo label="Ghost (sem fundo)">
          <Collapse
            ghost
            items={[
              { key: '1', label: 'O que é o GarageHub?', children: <Text style={{ color: G[600] }}>O GarageHub conecta proprietários de veículos com oficinas de qualidade.</Text> },
              { key: '2', label: 'Como funciona o agendamento?', children: <Text style={{ color: G[600] }}>Selecione o veículo, o serviço e o horário disponível na oficina parceira.</Text> },
            ]}
          />
        </Demo>
        <Demo label="Sem borda">
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            items={[
              { key: '1', label: 'Posso adicionar múltiplos veículos?', children: <Text style={{ color: G[600] }}>Sim, o GarageHub suporta múltiplos veículos por conta.</Text> },
              { key: '2', label: 'Tem aplicativo mobile?', children: <Text style={{ color: G[600] }}>Estamos trabalhando no app iOS e Android, disponível em breve.</Text> },
            ]}
          />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="FAQ GarageHub" description="Perguntas frequentes com ícone customizado.">
      <Demo>
        <Collapse
          accordion
          expandIcon={() => <QuestionCircleOutlined style={{ color: '#3DD9A4' }} />}
          items={faqItems}
        />
      </Demo>
    </Section>
  </div>
)

export default CollapseShowcase
