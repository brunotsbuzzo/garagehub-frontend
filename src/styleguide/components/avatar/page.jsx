import { Avatar, Space, Divider, Typography, Tag, Badge, Tooltip } from 'antd'
import {
  UserOutlined, CarOutlined, ToolOutlined, ShopOutlined,
  PlusOutlined, CameraOutlined,
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

const AvatarShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Avatar</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Representação visual de usuário, entidade ou objeto. Suporta imagem, ícone, texto e grupos.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Tipos" description="Imagem, ícone e texto.">
      <Demo>
        <Space size="large" align="center">
          <div style={{ textAlign: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Ícone</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar>JD</Avatar>
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Texto</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=garageHub" />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Imagem</Text>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="large, default (32px) e small.">
      <Demo>
        <Space size="large" align="center">
          <Avatar size="large" icon={<UserOutlined />} />
          <Avatar icon={<UserOutlined />} />
          <Avatar size="small" icon={<UserOutlined />} />
          <Avatar size={64} icon={<UserOutlined />} />
          <Avatar size={80} style={{ background: 'linear-gradient(135deg, #3DD9A4, #12A875)', fontSize: 28 }}>
            GH
          </Avatar>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Formas" description="Circle (padrão) e Square.">
      <Demo>
        <Space size="large">
          <div style={{ textAlign: 'center' }}>
            <Avatar size={48} icon={<UserOutlined />} />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Circle</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={48} shape="square" icon={<UserOutlined />} />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Square</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={48} shape="square" style={{ borderRadius: 8 }}>GH</Avatar>
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Rounded</Text>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Cores personalizadas" description="Customize background e cor do texto.">
      <Demo>
        <Space size="middle">
          <Avatar style={{ background: '#3DD9A4', color: '#fff' }}>GH</Avatar>
          <Avatar style={{ background: '#0E885F', color: '#fff' }}>OF</Avatar>
          <Avatar style={{ background: '#1677FF', color: '#fff' }}>AM</Avatar>
          <Avatar style={{ background: '#FAAD14', color: '#fff' }}>JD</Avatar>
          <Avatar style={{ background: '#FF4D4F', color: '#fff' }}>EX</Avatar>
          <Avatar style={{ background: G[200], color: G[700] }}>NN</Avatar>
          <Avatar
            icon={<CarOutlined />}
            style={{ background: '#EDFCF7', color: '#0E885F' }}
          />
          <Avatar
            icon={<ToolOutlined />}
            style={{ background: '#E6F4FF', color: '#1677FF' }}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com Badge" description="Exiba notificações sobre o avatar.">
      <Demo>
        <Space size="large">
          <Badge count={5}>
            <Avatar icon={<UserOutlined />} />
          </Badge>
          <Badge dot>
            <Avatar icon={<UserOutlined />} />
          </Badge>
          <Badge status="success" dot>
            <Avatar style={{ background: '#3DD9A4' }}>OF</Avatar>
          </Badge>
          <Badge count={99} overflowCount={99}>
            <Avatar icon={<ShopOutlined />} />
          </Badge>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Grupo de avatares" description="Avatar.Group exibe múltiplos avatares compactos.">
      <Demo>
        <Space orientation="vertical" size="large">
          <div>
            <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>Equipe da oficina</Text>
            <Avatar.Group maxCount={4} maxStyle={{ color: '#0E885F', background: '#EDFCF7' }}>
              {['Carlos', 'Pedro', 'Ana', 'João', 'Maria', 'Lucas'].map(name => (
                <Tooltip key={name} title={name}>
                  <Avatar style={{
                    background: ['#3DD9A4', '#1677FF', '#FAAD14', '#FF4D4F', '#0E885F', '#9CA3AF'][
                      ['Carlos', 'Pedro', 'Ana', 'João', 'Maria', 'Lucas'].indexOf(name)
                    ],
                  }}>
                    {name[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          <div>
            <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>Tamanho large</Text>
            <Avatar.Group size="large" maxCount={3}>
              <Avatar icon={<UserOutlined />} style={{ background: '#3DD9A4' }} />
              <Avatar icon={<UserOutlined />} style={{ background: '#1677FF' }} />
              <Avatar icon={<UserOutlined />} style={{ background: '#FAAD14' }} />
              <Avatar icon={<UserOutlined />} style={{ background: '#FF4D4F' }} />
            </Avatar.Group>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub" description="Uso real na lista de oficinas e perfil de usuário.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          {[
            { initials: 'OS', name: 'Oficina Silva', sub: 'Mecânica Geral · 4.8 ⭐', color: '#3DD9A4', bg: '#EDFCF7' },
            { initials: 'AM', name: 'Auto Mecânica Central', sub: 'Elétrica · 4.6 ⭐', color: '#1677FF', bg: '#E6F4FF' },
            { initials: 'GJ', name: 'Garagem do João', sub: 'Multimarca · 4.2 ⭐', color: '#FAAD14', bg: '#FFFBE6' },
          ].map(w => (
            <div key={w.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', background: '#fff',
              border: `1px solid ${G[200]}`, borderRadius: 8,
            }}>
              <Avatar size={42} style={{ background: w.bg, color: w.color, fontWeight: 700 }}>
                {w.initials}
              </Avatar>
              <div>
                <Text strong style={{ display: 'block' }}>{w.name}</Text>
                <Text style={{ fontSize: 12, color: G[500] }}>{w.sub}</Text>
              </div>
            </div>
          ))}
        </Space>
      </Demo>
    </Section>
  </div>
)

export default AvatarShowcase
