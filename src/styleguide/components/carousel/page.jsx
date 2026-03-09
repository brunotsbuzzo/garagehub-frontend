import { useRef } from 'react'
import { Carousel, Button, Space, Divider, Typography, Tag } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
)

const slides = [
  { bg: 'linear-gradient(135deg, #3DD9A4, #0E885F)', title: 'Revisão Completa', sub: 'Honda Civic 2022 · Oficina Silva', tag: 'Em andamento' },
  { bg: 'linear-gradient(135deg, #1677FF, #0958D9)', title: 'Troca de Óleo', sub: 'Toyota Corolla 2021 · Auto Mecânica', tag: 'Agendado' },
  { bg: 'linear-gradient(135deg, #FAAD14, #D48806)', title: 'Alinhamento', sub: 'Ford Ka 2020 · Garagem João', tag: 'Pendente' },
]

const CarouselSlide = ({ bg, title, sub, tag }) => (
  <div>
    <div style={{
      background: bg, height: 200, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 8,
    }}>
      <Tag color="rgba(255,255,255,0.3)" style={{ color: '#fff', border: 'none' }}>{tag}</Tag>
      <Title level={3} style={{ color: '#fff', margin: 0 }}>{title}</Title>
      <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{sub}</Text>
    </div>
  </div>
)

const CarouselShowcase = () => {
  const carouselRef = useRef(null)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Carousel</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Componente de carrossel para rotação de conteúdo. Suporta autoplay, dots e controles personalizados.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Carousel com dots de navegação.">
        <Demo>
          <Carousel autoplay dotPosition="bottom">
            {slides.map(s => <CarouselSlide key={s.title} {...s} />)}
          </Carousel>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com efeito fade" description="Transição em fade em vez de slide.">
        <Demo>
          <Carousel effect="fade" autoplay>
            {slides.map(s => <CarouselSlide key={s.title} {...s} />)}
          </Carousel>
        </Demo>
      </Section>

      <Divider />

      <Section title="Dots em diferentes posições" description="top, bottom, left, right.">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {['top', 'bottom', 'left', 'right'].map(pos => (
            <Demo key={pos} label={`dotPosition="${pos}"`}>
              <Carousel dotPosition={pos} style={{ minHeight: 120 }}>
                {slides.map(s => (
                  <div key={s.title}>
                    <div style={{
                      background: s.bg, height: 100,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Text style={{ color: '#fff', fontWeight: 600 }}>{s.title}</Text>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Demo>
          ))}
        </Space>
      </Section>

      <Divider />

      <Section title="Controles externos" description="Botões prev/next fora do Carousel.">
        <Demo>
          <div style={{ position: 'relative' }}>
            <Carousel ref={carouselRef} dots={false}>
              {slides.map(s => <CarouselSlide key={s.title} {...s} />)}
            </Carousel>
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 8,
            }}>
              <Button
                shape="circle"
                size="small"
                icon={<LeftOutlined />}
                onClick={() => carouselRef.current?.prev()}
                style={{ background: 'rgba(255,255,255,0.9)' }}
              />
              <Button
                shape="circle"
                size="small"
                icon={<RightOutlined />}
                onClick={() => carouselRef.current?.next()}
                style={{ background: 'rgba(255,255,255,0.9)' }}
              />
            </div>
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default CarouselShowcase
