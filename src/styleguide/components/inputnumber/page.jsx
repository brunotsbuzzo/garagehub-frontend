import { useState } from 'react'
import { InputNumber, Space, Divider, Typography, Tag, Row, Col } from 'antd'

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

const InputNumberShowcase = () => {
  const [km, setKm] = useState(45000)
  const [qty, setQty] = useState(1)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>InputNumber</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Campo numérico com controles de incremento e decremento. Suporta prefixo, sufixo, precisão e limites.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="InputNumber simples.">
        <Demo>
          <Space wrap>
            <InputNumber defaultValue={3} />
            <InputNumber min={1} max={10} defaultValue={3} />
            <InputNumber disabled defaultValue={5} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com prefixo/sufixo" description="Adicione unidades ou símbolos.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <InputNumber
              prefix="R$"
              defaultValue={299.90}
              precision={2}
              style={{ width: 160 }}
              step={10}
            />
            <Space.Compact>
              <InputNumber
                suffix="km"
                value={km}
                onChange={setKm}
                step={1000}
                formatter={v => v?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={v => v?.replace(/\./g, '')}
                style={{ width: 200 }}
              />
            </Space.Compact>
            <Space.Compact>
              <InputNumber
                prefix="+"
                suffix="%"
                defaultValue={15}
                min={0}
                max={100}
                style={{ width: 160 }}
              />
            </Space.Compact>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanhos" description="Small, Middle (padrão) e Large.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <InputNumber size="small" defaultValue={3} placeholder="Small" />
            <InputNumber size="middle" defaultValue={3} placeholder="Middle" />
            <InputNumber size="large" defaultValue={3} placeholder="Large" />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Passo personalizado" description="step define o incremento de cada clique.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <div>
              <Text style={{ fontSize: 12, color: G[400] }}>Passo 0,1 — Precisão 1</Text>
              <br />
              <InputNumber defaultValue={0} step={0.1} precision={1} style={{ width: 140 }} />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400] }}>Passo 1000 — Quilometragem</Text>
              <br />
              <InputNumber
                defaultValue={45000}
                step={1000}
                suffix="km"
                style={{ width: 200 }}
              />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: G[400] }}>Passo 50 — Preço</Text>
              <br />
              <InputNumber
                defaultValue={150}
                step={50}
                prefix="R$"
                precision={2}
                style={{ width: 160 }}
              />
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Controles personalizados" description="Mude a posição dos controles ou desative-os.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <InputNumber defaultValue={3} controls={false} style={{ width: 120 }} placeholder="Sem controles" />
            <InputNumber defaultValue={3} style={{ width: 120 }} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Erro, aviso e desabilitado.">
        <Demo>
          <Space wrap>
            <InputNumber status="error" defaultValue={-5} />
            <InputNumber status="warning" defaultValue={0} />
            <InputNumber disabled defaultValue={10} />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Seletor de quantidade" description="Seleção de quantidade de itens/serviços.">
        <Demo>
          <div style={{ maxWidth: 320 }}>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
              Trocas de óleo em pacote
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8 }}>
              <div>
                <Text strong>Troca de Óleo 5W30</Text>
                <br />
                <Text style={{ color: '#0E885F', fontWeight: 600 }}>R$ 89,90 / un</Text>
              </div>
              <InputNumber
                min={1}
                max={12}
                value={qty}
                onChange={v => setQty(v)}
                style={{ width: 80 }}
              />
            </div>
            <div style={{ marginTop: 12, padding: '10px 16px', background: '#EDFCF7', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: G[700] }}>Total:</Text>
              <Text strong style={{ color: '#0E885F' }}>
                R$ {((qty || 1) * 89.90).toFixed(2).replace('.', ',')}
              </Text>
            </div>
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default InputNumberShowcase
