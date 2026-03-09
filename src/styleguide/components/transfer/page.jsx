import { useState } from 'react'
import { Transfer, Space, Divider, Typography, Tag } from 'antd'

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

const allServices = Array.from({ length: 12 }, (_, i) => {
  const services = [
    'Troca de Óleo', 'Revisão Geral', 'Alinhamento', 'Balanceamento',
    'Troca de Pneus', 'Freios', 'Ar Condicionado', 'Suspensão',
    'Injeção Eletrônica', 'Elétrica Geral', 'Funilaria', 'Polimento',
  ]
  return { key: String(i), title: services[i], description: `Serviço ${i + 1}` }
})

const initialTarget = ['0', '1', '4']

const TransferShowcase = () => {
  const [targetKeys, setTargetKeys] = useState(initialTarget)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [filteredTarget, setFilteredTarget] = useState(['2', '5'])

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Transfer</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Componente de transferência dupla. Permite mover itens entre duas listas.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Transfer simples entre duas listas.">
        <Demo>
          <Transfer
            dataSource={allServices}
            titles={['Disponíveis', 'Selecionados']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
            onSelectChange={(sourceSelectedKeys, targetSelectedKeys) =>
              setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
            }
            render={(item) => item.title}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com busca" description="Filtro de itens em ambas as listas.">
        <Demo label="Selecione os serviços do pacote de manutenção">
          <Transfer
            dataSource={allServices}
            titles={['Catálogo', 'No Pacote']}
            showSearch
            filterOption={(inputValue, item) =>
              item.title.toLowerCase().includes(inputValue.toLowerCase())
            }
            targetKeys={filteredTarget}
            onChange={(keys) => setFilteredTarget(keys)}
            render={(item) => item.title}
            listStyle={{ width: 220, height: 300 }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com seleção de página" description="Paginação embutida para listas grandes.">
        <Demo>
          <Transfer
            dataSource={allServices}
            titles={['Todos', 'Revisão']}
            targetKeys={['0', '1', '3']}
            render={(item) => item.title}
            pagination
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Desabilitado" description="Transfer no estado desabilitado.">
        <Demo>
          <Transfer
            dataSource={allServices.slice(0, 6)}
            titles={['Disponíveis', 'Selecionados']}
            targetKeys={['0', '2']}
            disabled
            render={(item) => item.title}
          />
        </Demo>
      </Section>
    </div>
  )
}

export default TransferShowcase
