import { useState } from 'react'
import { ColorPicker, Space, Divider, Typography, Tag, Row, Col } from 'antd'

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

const garageHubPresets = [
  {
    label: 'GarageHub Brand',
    colors: ['#3DD9A4', '#1CC78E', '#12A875', '#0E885F', '#0E6B4D', '#0C5840'],
  },
  {
    label: 'Semânticas',
    colors: ['#52C41A', '#FAAD14', '#FF4D4F', '#1677FF'],
  },
  {
    label: 'Neutras',
    colors: ['#F9FAFB', '#E5E7EB', '#9CA3AF', '#6B7280', '#374151', '#1F2937'],
  },
]

const ColorPickerShowcase = () => {
  const [color, setColor] = useState('#3DD9A4')
  const [colorHex, setColorHex] = useState('#3DD9A4')

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>ColorPicker</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Seletor de cor com suporte a HEX, RGB, HSB e presets.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="ColorPicker simples.">
        <Demo>
          <Space size="large" align="center">
            <ColorPicker defaultValue="#3DD9A4" />
            <ColorPicker defaultValue="#1677FF" />
            <ColorPicker defaultValue="#FF4D4F" />
            <ColorPicker defaultValue="#FAAD14" />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com valor controlado e exibição de hex" description="Exibe o valor hex selecionado em tempo real.">
        <Demo>
          <Space align="center" size="middle">
            <ColorPicker
              value={color}
              onChange={(c) => {
                setColor(c)
                setColorHex(c.toHexString())
              }}
            />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 6,
              background: colorHex, border: `1px solid ${G[200]}`,
            }}>
              <Text style={{
                fontSize: 13, fontFamily: 'monospace', fontWeight: 600,
                color: colorHex.toLowerCase() === '#ffffff' ? '#1F2937' : '#ffffff',
              }}>
                {colorHex.toUpperCase()}
              </Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Formato de cor" description="HEX, RGB, HSB.">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <ColorPicker defaultValue="#3DD9A4" format="hex" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>HEX</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ColorPicker defaultValue="rgb(61,217,164)" format="rgb" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>RGB</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ColorPicker defaultValue="hsb(157,72%,85%)" format="hsb" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>HSB</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com presets" description="Paleta de cores predefinidas.">
        <Demo label="Paleta GarageHub">
          <ColorPicker
            defaultValue="#3DD9A4"
            presets={garageHubPresets}
            showText
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanhos" description="Small, Middle (padrão) e Large.">
        <Demo>
          <Space size="large" align="center">
            <div style={{ textAlign: 'center' }}>
              <ColorPicker size="small" defaultValue="#3DD9A4" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Small</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ColorPicker size="middle" defaultValue="#3DD9A4" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Middle</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ColorPicker size="large" defaultValue="#3DD9A4" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Large</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com transparência (alpha)" description="Suporte a cores com canal alpha.">
        <Demo>
          <Space size="large">
            <ColorPicker defaultValue="rgba(61,217,164,0.5)" showText disabledAlpha={false} />
            <ColorPicker defaultValue="rgba(22,119,255,0.7)" showText disabledAlpha={false} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Desabilitado e com trigger customizado.">
        <Demo>
          <Space size="large">
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>Desabilitado</Text>
              <ColorPicker disabled defaultValue="#3DD9A4" />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>Com texto</Text>
              <ColorPicker defaultValue="#3DD9A4" showText />
            </div>
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default ColorPickerShowcase
