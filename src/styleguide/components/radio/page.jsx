import { useState } from 'react'
import { Radio, Space, Divider, Typography, Tag, Card } from 'antd'
import { CarOutlined, ToolOutlined } from '@ant-design/icons'

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

const RadioShowcase = () => {
  const [vehicleType, setVehicleType] = useState('car')
  const [plan, setPlan] = useState('basic')

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Radio</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Seleção exclusiva de uma opção entre várias. Use quando as opções são mutuamente exclusivas.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Radio individual e em grupo.">
        <Demo>
          <Space direction="vertical" size="middle">
            <Radio>Aceito os termos de uso</Radio>
            <Radio defaultChecked>Desejo receber notificações</Radio>
            <Radio disabled>Opção indisponível</Radio>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Grupo horizontal" description="Radio.Group padrão — layout horizontal.">
        <Demo label="Tipo de veículo">
          <Radio.Group value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
            <Radio value="car">Carro</Radio>
            <Radio value="moto">Moto</Radio>
            <Radio value="truck">Caminhão</Radio>
            <Radio value="suv">SUV</Radio>
            <Radio value="van">Van</Radio>
          </Radio.Group>
        </Demo>
      </Section>

      <Divider />

      <Section title="Grupo vertical" description="Radio.Group em orientação vertical.">
        <Demo label="Tipo de serviço">
          <Radio.Group defaultValue="review">
            <Space direction="vertical">
              <Radio value="oil">Troca de Óleo — R$ 89,90</Radio>
              <Radio value="review">Revisão Geral — R$ 299,90</Radio>
              <Radio value="align">Alinhamento e Balanceamento — R$ 149,90</Radio>
              <Radio value="ac">Ar Condicionado — R$ 189,90</Radio>
            </Space>
          </Radio.Group>
        </Demo>
      </Section>

      <Divider />

      <Section title="Botões de radio" description="Radio.Button — ideal para seleção em barra de opções.">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Demo label="Padrão">
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">Carro</Radio.Button>
              <Radio.Button value="b">Moto</Radio.Button>
              <Radio.Button value="c">Caminhão</Radio.Button>
            </Radio.Group>
          </Demo>
          <Demo label="Sólido (outline)">
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">Hoje</Radio.Button>
              <Radio.Button value="b">Esta semana</Radio.Button>
              <Radio.Button value="c">Este mês</Radio.Button>
              <Radio.Button value="d">Personalizado</Radio.Button>
            </Radio.Group>
          </Demo>
          <Demo label="Tamanho pequeno">
            <Radio.Group size="small" defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">Ativo</Radio.Button>
              <Radio.Button value="b">Pendente</Radio.Button>
              <Radio.Button value="c">Concluído</Radio.Button>
            </Radio.Group>
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Seleção de plano" description="Seleção de plano de serviço com cards.">
        <Demo>
          <Radio.Group value={plan} onChange={e => setPlan(e.target.value)} style={{ width: '100%' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {[
                { value: 'basic', title: 'Básico', price: 'Grátis', features: 'Até 1 veículo · Agendamentos básicos' },
                { value: 'pro', title: 'Pro', price: 'R$ 29,90/mês', features: 'Até 3 veículos · Histórico completo · Alertas' },
                { value: 'fleet', title: 'Frota', price: 'R$ 99,90/mês', features: 'Veículos ilimitados · Relatórios · API' },
              ].map(p => (
                <div key={p.value} onClick={() => setPlan(p.value)} style={{
                  padding: '16px 20px',
                  border: `2px solid ${plan === p.value ? '#3DD9A4' : G[200]}`,
                  borderRadius: 8,
                  background: plan === p.value ? '#EDFCF7' : '#fff',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'all .2s',
                }}>
                  <Radio value={p.value} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>{p.title}</Text>
                      <Text strong style={{ color: '#0E885F' }}>{p.price}</Text>
                    </div>
                    <Text style={{ fontSize: 12, color: G[500] }}>{p.features}</Text>
                  </div>
                </div>
              ))}
            </Space>
          </Radio.Group>
        </Demo>
      </Section>
    </div>
  )
}

export default RadioShowcase
