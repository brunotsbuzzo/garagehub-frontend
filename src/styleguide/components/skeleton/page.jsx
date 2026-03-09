import { useState } from 'react'
import { Skeleton, Switch, Space, Divider, Typography, Tag, List, Avatar } from 'antd'

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

const VehicleCard = ({ loading }) => (
  <div style={{ padding: 16, background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8, maxWidth: 360 }}>
    <Skeleton loading={loading} avatar active>
      <div style={{ display: 'flex', gap: 12 }}>
        <Avatar size={40} style={{ background: '#EDFCF7', color: '#0E885F', flexShrink: 0 }}>HC</Avatar>
        <div>
          <Text strong style={{ display: 'block' }}>Honda Civic 2022</Text>
          <Text style={{ fontSize: 12, color: G[500] }}>Placa: ABC-1234 · 45.230 km</Text>
        </div>
      </div>
    </Skeleton>
  </div>
)

const SkeletonShowcase = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Skeleton</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Placeholder de carregamento que imita o layout do conteúdo final. Melhora a percepção de performance.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Básico" description="Skeleton padrão com avatar, título e parágrafos.">
        <Demo>
          <Skeleton />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com avatar" description="Skeleton com avatar circular ou quadrado.">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Demo label="Avatar circular">
            <Skeleton avatar active />
          </Demo>
          <Demo label="Avatar quadrado">
            <Skeleton avatar={{ shape: 'square' }} active />
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Apenas título ou parágrafo" description="Controle de rows e width.">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Demo label="Somente título">
            <Skeleton title paragraph={false} active />
          </Demo>
          <Demo label="Parágrafo com 4 linhas">
            <Skeleton title={false} paragraph={{ rows: 4 }} active />
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Elementos individuais" description="Skeleton.Input, Button, Image e Avatar.">
        <Demo>
          <Space direction="vertical" size="middle">
            <Space wrap>
              <Skeleton.Avatar active />
              <Skeleton.Avatar active shape="square" />
              <Skeleton.Avatar active size="small" />
              <Skeleton.Avatar active size="large" />
            </Space>
            <Space wrap>
              <Skeleton.Input active style={{ width: 200 }} />
              <Skeleton.Input active size="small" style={{ width: 120 }} />
              <Skeleton.Input active size="large" style={{ width: 280 }} />
            </Space>
            <Space wrap>
              <Skeleton.Button active />
              <Skeleton.Button active size="small" />
              <Skeleton.Button active shape="round" />
              <Skeleton.Button active shape="circle" />
            </Space>
            <Skeleton.Image active />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Toggle loading" description="Alterne entre skeleton e conteúdo real.">
        <Demo>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center">
              <Switch
                checked={loading}
                onChange={setLoading}
                checkedChildren="Carregando"
                unCheckedChildren="Loaded"
              />
              <Text style={{ color: G[500], fontSize: 13 }}>
                {loading ? 'Simulando carregamento...' : 'Conteúdo carregado!'}
              </Text>
            </Space>
            <VehicleCard loading={loading} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Lista com skeleton" description="Skeleton em lista de serviços carregando.">
        <Demo>
          <List
            dataSource={Array(3).fill(null)}
            renderItem={(_, i) => (
              <List.Item key={i} style={{ padding: '12px 0' }}>
                <Skeleton avatar active paragraph={{ rows: 1 }} />
              </List.Item>
            )}
          />
        </Demo>
      </Section>
    </div>
  )
}

export default SkeletonShowcase
