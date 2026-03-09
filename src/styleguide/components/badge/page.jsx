import { useState } from 'react'
import { Badge, Avatar, Button, Space, Divider, Typography, Tag, Switch } from 'antd'
import { BellOutlined, ShoppingCartOutlined, MessageOutlined, CarOutlined } from '@ant-design/icons'

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

const BadgeShowcase = () => {
  const [show, setShow] = useState(true)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Badge</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Indicador de contagem ou status sobreposto a elementos como botões, ícones e avatares.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Contagem" description="Badge com número de notificações.">
        <Demo>
          <Space size="large" wrap>
            <Badge count={5}>
              <Avatar shape="square" icon={<BellOutlined />} />
            </Badge>
            <Badge count={0} showZero>
              <Avatar shape="square" icon={<MessageOutlined />} />
            </Badge>
            <Badge count={99}>
              <Avatar shape="square" icon={<ShoppingCartOutlined />} />
            </Badge>
            <Badge count={1000} overflowCount={999}>
              <Avatar shape="square" icon={<BellOutlined />} />
            </Badge>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Ponto (dot)" description="Indicador discreto sem número.">
        <Demo>
          <Space size="large">
            <Badge dot>
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>
            <Badge dot>
              <Avatar icon={<CarOutlined />} />
            </Badge>
            <Badge dot color="#3DD9A4">
              <Avatar>OS</Avatar>
            </Badge>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Status" description="Badge de status (standalone ou com texto).">
        <Demo>
          <Space orientation="vertical" size="small">
            <Badge status="success" text="Serviço concluído" />
            <Badge status="processing" text="Em andamento" />
            <Badge status="warning" text="Aguardando aprovação" />
            <Badge status="error" text="Serviço cancelado" />
            <Badge status="default" text="Agendado" />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Cores customizadas" description="Use a prop color para cores personalizadas.">
        <Demo>
          <Space wrap size="middle">
            {[
              { color: '#3DD9A4', label: 'Ativo' },
              { color: '#1677FF', label: 'Em análise' },
              { color: '#FAAD14', label: 'Pendente' },
              { color: '#FF4D4F', label: 'Urgente' },
              { color: '#0E885F', label: 'Aprovado' },
              { color: G[400], label: 'Inativo' },
            ].map(b => (
              <Badge key={b.label} color={b.color} text={b.label} />
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Overflow e showZero" description="Controle de exibição para contagens extremas.">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <Badge count={1000} overflowCount={99}>
                <Avatar shape="square" icon={<BellOutlined />} />
              </Badge>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>overflowCount=99</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Badge count={1000} overflowCount={999}>
                <Avatar shape="square" icon={<BellOutlined />} />
              </Badge>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>overflowCount=999</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Badge count={0} showZero>
                <Avatar shape="square" icon={<MessageOutlined />} />
              </Badge>
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>showZero</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Animação (show/hide)" description="Transição ao mostrar/ocultar o badge.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <Space align="center" size="middle">
              <Switch checked={show} onChange={setShow} checkedChildren="Mostrar" unCheckedChildren="Ocultar" />
              <Badge count={show ? 7 : 0} showZero={false}>
                <Avatar shape="square" icon={<BellOutlined />} />
              </Badge>
            </Space>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Notificações" description="Badges nas abas de navegação do app.">
        <Demo>
          <Space size="large">
            <Badge count={3}>
              <Button type="text" icon={<BellOutlined />} style={{ height: 40, padding: '0 12px' }}>
                Alertas
              </Button>
            </Badge>
            <Badge count={1} dot>
              <Button type="text" icon={<MessageOutlined />} style={{ height: 40, padding: '0 12px' }}>
                Mensagens
              </Button>
            </Badge>
            <Badge status="processing" text="2 serviços em andamento" />
            <Badge status="warning" text="1 orçamento aguardando" />
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default BadgeShowcase
