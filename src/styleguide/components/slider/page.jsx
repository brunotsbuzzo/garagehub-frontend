import { useState } from 'react'
import { Slider, Space, Divider, Typography, Tag, Row, Col, InputNumber } from 'antd'

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '24px 40px 24px 24px' }}>
      {children}
    </div>
  </div>
)

const SliderShowcase = () => {
  const [km, setKm] = useState(50)
  const [priceRange, setPriceRange] = useState([100, 500])
  const [yearRange, setYearRange] = useState([2015, 2024])

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Slider</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Seletor de valor numérico em uma faixa contínua. Suporta valor único e intervalo (range).
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Slider simples com valor padrão.">
        <Demo>
          <Slider defaultValue={30} />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com InputNumber sincronizado" description="Slider e InputNumber controlados em conjunto.">
        <Demo label="Raio de busca (km)">
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Slider
                min={1}
                max={200}
                value={km}
                onChange={setKm}
                trackStyle={{ backgroundColor: '#3DD9A4' }}
                handleStyle={{ borderColor: '#3DD9A4' }}
              />
            </Col>
            <Col>
              <InputNumber
                min={1}
                max={200}
                value={km}
                onChange={setKm}
                addonAfter="km"
                style={{ width: 110 }}
              />
            </Col>
          </Row>
        </Demo>
      </Section>

      <Divider />

      <Section title="Range (intervalo)" description="Seleção de intervalo de valores.">
        <Space orientation="vertical" style={{ width: '100%' }} size="large">
          <Demo label="Faixa de preço (R$)">
            <Row gutter={16} align="middle">
              <Col flex="auto">
                <Slider
                  range
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onChange={setPriceRange}
                  trackStyle={{ backgroundColor: '#3DD9A4' }}
                />
              </Col>
              <Col>
                <Text style={{ fontSize: 13, color: G[700], whiteSpace: 'nowrap' }}>
                  R$ {priceRange[0]} – R$ {priceRange[1]}
                </Text>
              </Col>
            </Row>
          </Demo>
          <Demo label="Ano do veículo">
            <Row gutter={16} align="middle">
              <Col flex="auto">
                <Slider
                  range
                  min={2000}
                  max={2025}
                  value={yearRange}
                  onChange={setYearRange}
                />
              </Col>
              <Col>
                <Text style={{ fontSize: 13, color: G[700], whiteSpace: 'nowrap' }}>
                  {yearRange[0]} – {yearRange[1]}
                </Text>
              </Col>
            </Row>
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Com marcas (marks)" description="Pontos de referência no slider.">
        <Demo label="Quilometragem do veículo (mil km)">
          <Slider
            marks={{
              0: '0',
              25: '25k',
              50: '50k',
              75: '75k',
              100: { label: <Text style={{ color: '#FF4D4F', fontSize: 11 }}>100k+</Text> },
            }}
            defaultValue={37}
            style={{ marginBottom: 8 }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Vertical" description="Slider na orientação vertical.">
        <Demo>
          <div style={{ height: 200, display: 'flex', gap: 48, alignItems: 'flex-start', padding: '0 16px' }}>
            <div style={{ textAlign: 'center' }}>
              <Slider vertical defaultValue={30} />
              <Text style={{ fontSize: 11, color: G[400], marginTop: 8, display: 'block' }}>Simples</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Slider vertical range defaultValue={[20, 60]} />
              <Text style={{ fontSize: 11, color: G[400], marginTop: 8, display: 'block' }}>Range</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Slider vertical disabled defaultValue={50} />
              <Text style={{ fontSize: 11, color: G[400], marginTop: 8, display: 'block' }}>Disabled</Text>
            </div>
          </div>
        </Demo>
      </Section>

      <Divider />

      <Section title="Passos customizados" description="Slider com step maior que 1.">
        <Demo label="Avaliação do serviço (0-10, passo 1)">
          <Slider
            min={0}
            max={10}
            step={1}
            defaultValue={7}
            marks={{ 0: '0', 5: '5', 10: '10' }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Desabilitado.">
        <Demo>
          <Space orientation="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Text style={{ fontSize: 12, color: G[400] }}>Desabilitado — valor fixo</Text>
              <Slider disabled defaultValue={65} />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400] }}>Desabilitado — range</Text>
              <Slider disabled range defaultValue={[30, 70]} />
            </div>
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default SliderShowcase
