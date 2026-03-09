import { Watermark, Space, Divider, Typography, Tag, Slider, Switch, ColorPicker, Row, Col } from 'antd'
import { useState } from 'react'

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

const placeholder = (
  <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: G[400] }}>Área de conteúdo protegida pela marca d'água</Text>
  </div>
)

const WatermarkShowcase = () => {
  const [fontSize, setFontSize] = useState(16)
  const [rotate, setRotate] = useState(-22)
  const [opacity, setOpacity] = useState(0.15)
  const [gap, setGap] = useState([100, 100])

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Watermark</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Marca d'água aplicada sobre conteúdo para proteção e identificação. Suporta texto, imagem e customização.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Texto simples" description="Marca d'água com texto padrão.">
        <Demo>
          <Watermark content="GarageHub">
            {placeholder}
          </Watermark>
        </Demo>
      </Section>

      <Divider />

      <Section title="Múltiplas linhas" description="content como array exibe múltiplas linhas.">
        <Demo>
          <Watermark content={['GarageHub', 'Confidencial']}>
            {placeholder}
          </Watermark>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com rotação e espaçamento" description="Controle o ângulo e espaçamento da marca d'água.">
        <Demo>
          <Watermark
            content="GarageHub"
            rotate={-30}
            gap={[80, 80]}
            font={{ fontSize: 18, color: 'rgba(14,136,95,0.12)' }}
          >
            {placeholder}
          </Watermark>
        </Demo>
      </Section>

      <Divider />

      <Section title="Customização de fonte" description="Tamanho, cor e estilo da fonte.">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Demo label="Cor da marca GarageHub">
            <Watermark
              content="GarageHub"
              font={{ fontSize: 14, color: 'rgba(61,217,164,0.2)', fontWeight: 700 }}
            >
              {placeholder}
            </Watermark>
          </Demo>
          <Demo label="Usuário identificado">
            <Watermark
              content={['João Silva', 'joao@email.com']}
              font={{ fontSize: 13, color: 'rgba(0,0,0,0.08)' }}
              rotate={-15}
            >
              {placeholder}
            </Watermark>
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Documentos" description="Marca d'água em laudos e orçamentos.">
        <Demo label="Laudo técnico de serviço">
          <Watermark
            content={['GarageHub', 'Documento Oficial']}
            font={{ fontSize: 14, color: 'rgba(14,136,95,0.08)' }}
            rotate={-22}
            gap={[120, 80]}
          >
            <div style={{ padding: 24 }}>
              <Title level={4} style={{ margin: '0 0 16px' }}>Laudo Técnico — Revisão Geral</Title>
              {[
                ['Veículo', 'Honda Civic 2022 (ABC-1234)'],
                ['Proprietário', 'João Silva'],
                ['Data', '20/03/2026'],
                ['Quilometragem', '45.230 km'],
                ['Mecânico responsável', 'Carlos Ferreira · CREA 12345-SP'],
                ['Diagnóstico', 'Veículo em perfeitas condições. Troca de óleo realizada.'],
                ['Garantia', '90 dias ou 5.000 km'],
                ['Valor total', 'R$ 299,90'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${G[100]}` }}>
                  <Text style={{ color: G[500], fontSize: 13 }}>{k}</Text>
                  <Text style={{ fontSize: 13 }}>{v}</Text>
                </div>
              ))}
            </div>
          </Watermark>
        </Demo>
      </Section>
    </div>
  )
}

export default WatermarkShowcase
