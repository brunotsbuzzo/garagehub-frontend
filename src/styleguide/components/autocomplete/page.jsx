import { useState } from 'react'
import { AutoComplete, Space, Divider, Typography, Tag, Input } from 'antd'
import { SearchOutlined, CarOutlined } from '@ant-design/icons'

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

const allVehicles = [
  'Honda Civic', 'Honda Fit', 'Honda HR-V', 'Honda City',
  'Toyota Corolla', 'Toyota Yaris', 'Toyota Hilux',
  'Ford Ka', 'Ford Ranger', 'Ford Territory',
  'Volkswagen Gol', 'Volkswagen Polo', 'Volkswagen T-Cross',
  'Chevrolet Onix', 'Chevrolet Tracker', 'Chevrolet S10',
  'Fiat Argo', 'Fiat Cronos', 'Fiat Pulse',
  'Hyundai HB20', 'Hyundai Creta',
  'Renault Kwid', 'Renault Sandero',
  'Jeep Renegade', 'Jeep Compass',
]

const allServices = [
  'Troca de Óleo', 'Revisão Geral', 'Alinhamento e Balanceamento',
  'Troca de Pneus', 'Freios', 'Suspensão', 'Ar Condicionado',
  'Embreagem', 'Injeção Eletrônica', 'Elétrica Automotiva',
  'Funilaria e Pintura', 'Vidros e Película', 'Instalação de Som',
]

const AutoCompleteShowcase = () => {
  const [vehicleOptions, setVehicleOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [value, setValue] = useState('')

  const handleVehicleSearch = (q) => {
    const filtered = q
      ? allVehicles
          .filter(v => v.toLowerCase().includes(q.toLowerCase()))
          .map(v => ({ value: v, label: v }))
      : []
    setVehicleOptions(filtered)
  }

  const handleServiceSearch = (q) => {
    const filtered = q
      ? allServices
          .filter(s => s.toLowerCase().includes(q.toLowerCase()))
          .map(s => ({ value: s, label: s }))
      : []
    setServiceOptions(filtered)
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>AutoComplete</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Campo de input com sugestões automáticas baseadas no valor digitado.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Entrada de Dados</Tag>
        </Space>
      </div>

      <Section title="Básico" description="AutoComplete simples com opções estáticas.">
        <Demo>
          <AutoComplete
            style={{ width: 300 }}
            options={[
              { value: 'Honda Civic 2022' },
              { value: 'Toyota Corolla 2021' },
              { value: 'Ford Ka 2020' },
              { value: 'Volkswagen Gol 2019' },
            ]}
            placeholder="Selecione um veículo"
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com busca dinâmica" description="Filtra opções em tempo real conforme o usuário digita.">
        <Demo label="Digite um modelo de veículo para buscar">
          <AutoComplete
            style={{ width: 300 }}
            options={vehicleOptions}
            onSearch={handleVehicleSearch}
            placeholder="Ex: Honda, Toyota, Ford..."
            prefix={<SearchOutlined style={{ color: G[400] }} />}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Busca de serviços" description="AutoComplete para serviços automotivos.">
        <Demo label="Digite o tipo de serviço">
          <AutoComplete
            style={{ width: 320 }}
            options={serviceOptions}
            onSearch={handleServiceSearch}
            placeholder="Ex: Troca de óleo, Revisão..."
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com input personalizado" description="Use um Input customizado como filho.">
        <Demo>
          <AutoComplete
            style={{ width: 350 }}
            options={vehicleOptions}
            onSearch={handleVehicleSearch}
          >
            <Input
              size="large"
              prefix={<SearchOutlined style={{ color: '#3DD9A4' }} />}
              placeholder="Buscar veículo ou serviço..."
              allowClear
            />
          </AutoComplete>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com agrupamentos" description="Opções organizadas por categoria.">
        <Demo>
          <AutoComplete
            style={{ width: 320 }}
            options={[
              {
                label: <Text style={{ fontSize: 11, color: G[400], fontWeight: 600 }}>JAPONESES</Text>,
                options: [
                  { value: 'Honda Civic', label: 'Honda Civic' },
                  { value: 'Toyota Corolla', label: 'Toyota Corolla' },
                  { value: 'Hyundai Creta', label: 'Hyundai Creta' },
                ],
              },
              {
                label: <Text style={{ fontSize: 11, color: G[400], fontWeight: 600 }}>EUROPEUS</Text>,
                options: [
                  { value: 'Volkswagen Polo', label: 'Volkswagen Polo' },
                  { value: 'Renault Sandero', label: 'Renault Sandero' },
                ],
              },
              {
                label: <Text style={{ fontSize: 11, color: G[400], fontWeight: 600 }}>NACIONAIS</Text>,
                options: [
                  { value: 'Fiat Argo', label: 'Fiat Argo' },
                  { value: 'Chevrolet Onix', label: 'Chevrolet Onix' },
                ],
              },
            ]}
            placeholder="Selecione um modelo"
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Variações de estado: padrão, desabilitado e com status de erro.">
        <Space orientation="vertical" size="middle">
          <Demo label="Padrão">
            <AutoComplete
              style={{ width: 280 }}
              options={[{ value: 'Honda Civic 2022' }]}
              placeholder="Padrão"
            />
          </Demo>
          <Demo label="Desabilitado">
            <AutoComplete
              style={{ width: 280 }}
              disabled
              value="Toyota Corolla 2021"
              placeholder="Desabilitado"
            />
          </Demo>
          <Demo label="Erro">
            <AutoComplete
              style={{ width: 280 }}
              status="error"
              placeholder="Veículo inválido"
            />
          </Demo>
        </Space>
      </Section>
    </div>
  )
}

export default AutoCompleteShowcase
