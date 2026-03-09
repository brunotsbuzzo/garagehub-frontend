import { useState } from 'react'
import { Checkbox, Space, Divider, Typography, Tag, Row, Col, Alert } from 'antd'

const { Title, Text, Paragraph } = Typography

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 56 }}>
    <div style={{ marginBottom: 20 }}>
      <Title level={4} style={{ margin: 0, color: G[800] }}>{title}</Title>
      {description && (
        <Paragraph style={{ margin: '6px 0 0', color: G[500], fontSize: 13 }}>
          {description}
        </Paragraph>
      )}
    </div>
    {children}
  </section>
)

const Demo = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{
      background: G[50], border: `1px solid ${G[200]}`,
      borderRadius: 8, padding: '24px',
    }}>
      {children}
    </div>
  </div>
)

const serviceOptions = [
  { label: 'Troca de Óleo', value: 'oil' },
  { label: 'Revisão Geral', value: 'review' },
  { label: 'Alinhamento e Balanceamento', value: 'align' },
  { label: 'Troca de Pneus', value: 'tires' },
  { label: 'Freios', value: 'brakes' },
  { label: 'Ar Condicionado', value: 'ac' },
]

const CheckboxShowcase = () => {
  const [checked, setChecked] = useState(false)
  const [selectedServices, setSelectedServices] = useState(['oil', 'review'])
  const [checkedAll, setCheckedAll] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)

  const allValues = serviceOptions.map(o => o.value)

  const handleCheckAll = (e) => {
    setSelectedServices(e.target.checked ? allValues : [])
    setCheckedAll(e.target.checked)
    setIndeterminate(false)
  }

  const handleGroupChange = (values) => {
    setSelectedServices(values)
    setCheckedAll(values.length === allValues.length)
    setIndeterminate(values.length > 0 && values.length < allValues.length)
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Checkbox</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Permite ao usuário selecionar uma ou mais opções de um conjunto.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Entrada de Dados</Tag>
        </Space>
      </div>

      <Section title="Básico" description="Checkbox simples com estado controlado.">
        <Demo>
          <Space orientation="vertical">
            <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}>
              Aceito os termos de uso do GarageHub
            </Checkbox>
            <Text style={{ fontSize: 12, color: G[500] }}>
              Estado: {checked ? 'Marcado' : 'Desmarcado'}
            </Text>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Padrão, desabilitado e indeterminado.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <Checkbox defaultChecked>Revisão agendada</Checkbox>
            <Checkbox>Lembrete por e-mail</Checkbox>
            <Checkbox disabled>Plano premium (bloqueado)</Checkbox>
            <Checkbox disabled checked>Cadastro confirmado (somente leitura)</Checkbox>
            <Checkbox indeterminate>Selecionar todos (parcial)</Checkbox>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Grupo de checkboxes" description="Múltipla seleção com Checkbox.Group.">
        <Demo label="Selecione os serviços desejados">
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <Checkbox
              indeterminate={indeterminate}
              checked={checkedAll}
              onChange={handleCheckAll}
            >
              <Text strong>Selecionar todos</Text>
            </Checkbox>
            <Divider style={{ margin: '4px 0' }} />
            <Checkbox.Group
              value={selectedServices}
              onChange={handleGroupChange}
            >
              <Space orientation="vertical">
                {serviceOptions.map(opt => (
                  <Checkbox key={opt.value} value={opt.value}>{opt.label}</Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
            {selectedServices.length > 0 && (
              <Alert
                type="info"
                showIcon
                title={`${selectedServices.length} serviço(s) selecionado(s): ${selectedServices.join(', ')}`}
                style={{ marginTop: 8 }}
              />
            )}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Grupo horizontal" description="Checkbox.Group em layout de grid.">
        <Demo label="Tipos de veículo">
          <Checkbox.Group
            options={[
              { label: 'Carro', value: 'car' },
              { label: 'Moto', value: 'moto' },
              { label: 'Caminhão', value: 'truck' },
              { label: 'SUV', value: 'suv' },
              { label: 'Van', value: 'van' },
              { label: 'Pickup', value: 'pickup' },
            ]}
            defaultValue={['car']}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Em formulário de agendamento" description="Uso real: seleção de extras ao agendar serviço.">
        <Demo>
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Serviço principal</Text>
              <Checkbox defaultChecked disabled>Revisão Geral (selecionado)</Checkbox>
            </div>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Serviços adicionais</Text>
              <Checkbox.Group defaultValue={['oil']}>
                <Space orientation="vertical">
                  <Checkbox value="oil">
                    <Space>
                      Troca de Óleo
                      <Tag color="green" style={{ fontSize: 11 }}>+R$ 89,90</Tag>
                    </Space>
                  </Checkbox>
                  <Checkbox value="filter">
                    <Space>
                      Troca de Filtro de Ar
                      <Tag color="green" style={{ fontSize: 11 }}>+R$ 49,90</Tag>
                    </Space>
                  </Checkbox>
                  <Checkbox value="ac">
                    <Space>
                      Higienização do Ar Condicionado
                      <Tag color="green" style={{ fontSize: 11 }}>+R$ 129,90</Tag>
                    </Space>
                  </Checkbox>
                </Space>
              </Checkbox.Group>
            </div>
            <div>
              <Checkbox>
                <Text>Desejo receber notificações por WhatsApp</Text>
              </Checkbox>
            </div>
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default CheckboxShowcase
