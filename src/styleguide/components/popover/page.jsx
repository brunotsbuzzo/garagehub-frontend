import { Popover, Button, Space, Divider, Typography, Tag, Avatar, List } from 'antd'
import { InfoCircleOutlined, CarOutlined, UserOutlined } from '@ant-design/icons'

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

const vehicleContent = (
  <div style={{ maxWidth: 240 }}>
    {[
      ['Modelo', 'Honda Civic 2022'],
      ['Placa', 'ABC-1234'],
      ['Km', '45.230 km'],
      ['Última revisão', '15/01/2026'],
      ['Próxima revisão', 'em 2.770 km'],
    ].map(([k, v]) => (
      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${G[100]}` }}>
        <Text style={{ color: G[500], fontSize: 12 }}>{k}</Text>
        <Text style={{ fontSize: 12 }}>{v}</Text>
      </div>
    ))}
  </div>
)

const profileContent = (
  <div style={{ width: 220 }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
      <Avatar size={40} style={{ background: 'linear-gradient(135deg, #3DD9A4, #0E885F)', color: '#fff', fontWeight: 700 }}>JD</Avatar>
      <div>
        <Text strong style={{ display: 'block' }}>João Dono</Text>
        <Text style={{ fontSize: 12, color: G[500] }}>joao@email.com</Text>
      </div>
    </div>
    <List
      size="small"
      dataSource={[
        { label: 'Meu Perfil' },
        { label: 'Minha Garagem' },
        { label: 'Configurações' },
        { label: 'Sair', danger: true },
      ]}
      renderItem={item => (
        <List.Item style={{ padding: '6px 0', cursor: 'pointer', borderBottom: 'none' }}>
          <Text style={{ fontSize: 13, color: item.danger ? '#FF4D4F' : G[700] }}>{item.label}</Text>
        </List.Item>
      )}
    />
  </div>
)

const PopoverShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Popover</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Painel flutuante com título e conteúdo customizável. Mais rico que Tooltip — suporta HTML e interações.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Popover com título e conteúdo.">
      <Demo>
        <Space wrap>
          <Popover
            title="Informações do veículo"
            content={vehicleContent}
          >
            <Button icon={<CarOutlined />}>Honda Civic 2022</Button>
          </Popover>

          <Popover
            title="Minha conta"
            content={profileContent}
            trigger="click"
          >
            <Button icon={<UserOutlined />}>Meu perfil</Button>
          </Popover>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Posicionamentos" description="12 posições disponíveis.">
      <Demo>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 8, width: 'fit-content' }}>
          {['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'].map(p => (
            <Popover key={p} placement={p} title={p} content={<Text style={{ fontSize: 12 }}>Posição: {p}</Text>}>
              <Button size="small">{p}</Button>
            </Popover>
          ))}
        </div>
      </Demo>
    </Section>

    <Divider />

    <Section title="Triggers" description="hover (padrão), click e focus.">
      <Demo>
        <Space wrap>
          <Popover title="Hover" content="Abre ao passar o mouse." trigger="hover">
            <Button>Hover</Button>
          </Popover>
          <Popover title="Click" content="Abre ao clicar." trigger="click">
            <Button>Click</Button>
          </Popover>
          <Popover title="Focus" content="Abre ao focar (Tab)." trigger="focus">
            <Button>Focus</Button>
          </Popover>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Dica de ajuda" description="Popover com informações de ajuda em campos.">
      <Demo>
        <Space size="large">
          <Space>
            <Text>Quilometragem</Text>
            <Popover
              title="Por que precisamos da quilometragem?"
              content={
                <div style={{ maxWidth: 220 }}>
                  <Text style={{ fontSize: 12, color: G[700] }}>
                    A quilometragem é usada para calcular o intervalo de manutenção preventiva e alertar quando serviços como troca de óleo, filtros e revisão estão próximos do vencimento.
                  </Text>
                </div>
              }
            >
              <InfoCircleOutlined style={{ color: '#3DD9A4', cursor: 'pointer' }} />
            </Popover>
          </Space>
          <Space>
            <Text>Placa do veículo</Text>
            <Popover
              title="Formato da placa"
              content={
                <div style={{ maxWidth: 200 }}>
                  <Text style={{ fontSize: 12, color: G[700] }}>
                    Aceite placa no formato Mercosul (ABC1D23) ou placa antiga (ABC-1234).
                  </Text>
                </div>
              }
            >
              <InfoCircleOutlined style={{ color: '#3DD9A4', cursor: 'pointer' }} />
            </Popover>
          </Space>
        </Space>
      </Demo>
    </Section>
  </div>
)

export default PopoverShowcase
