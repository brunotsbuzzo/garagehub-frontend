import { useState } from 'react'
import { Rate, Space, Divider, Typography, Tag, Avatar } from 'antd'
import { HeartOutlined, SmileOutlined, CarOutlined } from '@ant-design/icons'

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

const labels = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente']

const workshops = [
  { name: 'Oficina Silva', reviews: 142, rating: 4.8 },
  { name: 'Auto Mecânica Central', reviews: 89, rating: 4.6 },
  { name: 'Garagem do João', reviews: 57, rating: 4.2 },
  { name: 'Oficina Rápida 24h', reviews: 203, rating: 3.9 },
]

const RateShowcase = () => {
  const [value, setValue] = useState(3)
  const [hoverVal, setHoverVal] = useState(-1)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Rate</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Componente de avaliação por estrelas. Suporta meia estrela, ícones personalizados e tooltips.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Rate simples controlado.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <Rate defaultValue={3} />
            <Rate value={4.5} disabled />
            <Rate defaultValue={0} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Meia estrela" description="Permite seleção de 0,5 em 0,5.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <Rate allowHalf defaultValue={2.5} />
            <Rate allowHalf value={4.5} disabled />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com tooltips" description="Exibe rótulo ao passar o mouse sobre cada estrela.">
        <Demo label="Como foi o serviço?">
          <Space align="center" size="middle">
            <Rate
              value={value}
              onChange={setValue}
              onHoverChange={setHoverVal}
              tooltips={labels}
            />
            {(hoverVal !== -1 || value > 0) && (
              <Text style={{ color: '#0E885F', fontWeight: 600 }}>
                {labels[(hoverVal !== -1 ? hoverVal : value) - 1]}
              </Text>
            )}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Ícones personalizados" description="Substitua as estrelas por outros ícones.">
        <Demo>
          <Space orientation="vertical" size="large">
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>Corações</Text>
              <Rate character={<HeartOutlined />} allowHalf defaultValue={3.5} />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>Emojis</Text>
              <Rate character={<SmileOutlined />} defaultValue={4} />
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Somente leitura" description="Rate desabilitado para exibição de avaliações.">
        <Demo>
          <Space orientation="vertical" size="middle">
            {[5, 4.5, 4, 3.5, 3].map(v => (
              <Space key={v} align="center">
                <Rate allowHalf disabled value={v} style={{ fontSize: 14 }} />
                <Text style={{ fontSize: 13, color: G[700] }}>{v.toFixed(1)}</Text>
              </Space>
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Lista de oficinas" description="Avaliações reais de oficinas no app.">
        <Demo>
          <Space orientation="vertical" style={{ width: '100%' }} size="middle">
            {workshops.map(w => (
              <div key={w.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: '#fff',
                border: `1px solid ${G[200]}`, borderRadius: 8,
              }}>
                <Space>
                  <Avatar style={{ background: '#EDFCF7', color: '#0E885F' }}>
                    <CarOutlined />
                  </Avatar>
                  <div>
                    <Text strong style={{ display: 'block' }}>{w.name}</Text>
                    <Text style={{ fontSize: 12, color: G[500] }}>{w.reviews} avaliações</Text>
                  </div>
                </Space>
                <Space align="center">
                  <Rate allowHalf disabled value={w.rating} style={{ fontSize: 13 }} />
                  <Text strong style={{ color: '#0E885F', minWidth: 28 }}>{w.rating}</Text>
                </Space>
              </div>
            ))}
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default RateShowcase
