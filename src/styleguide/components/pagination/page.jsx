import { useState } from 'react'
import { Pagination, Space, Divider, Typography, Tag, Select, Row, Col, Card } from 'antd'
import { CarOutlined } from '@ant-design/icons'

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

const fakeVehicles = [
  { id: 1, name: 'Honda Civic 2022', plate: 'ABC-1234', status: 'Ativo' },
  { id: 2, name: 'Toyota Corolla 2021', plate: 'DEF-5678', status: 'Ativo' },
  { id: 3, name: 'Ford Ka 2020', plate: 'GHI-9012', status: 'Inativo' },
  { id: 4, name: 'Volkswagen Gol 2019', plate: 'JKL-3456', status: 'Ativo' },
  { id: 5, name: 'Chevrolet Onix 2023', plate: 'MNO-7890', status: 'Ativo' },
]

const PaginationShowcase = () => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Pagination</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Permite navegar entre múltiplas páginas de conteúdo.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Navegação</Tag>
        </Space>
      </div>

      <Section title="Básico" description="Paginação simples com número de páginas.">
        <Demo>
          <Pagination defaultCurrent={1} total={50} />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com total de itens" description="Exibe o total de registros.">
        <Demo>
          <Pagination
            current={current}
            total={248}
            showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} veículos`}
            onChange={setCurrent}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Seletor de tamanho de página" description="Permite ao usuário escolher quantos itens por página.">
        <Demo>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={500}
            showSizeChanger
            pageSizeOptions={[10, 20, 50, 100]}
            showTotal={(total) => `Total: ${total} itens`}
            onChange={(page, size) => { setCurrent(page); setPageSize(size) }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com jump rápido" description="Campo de input para navegar diretamente para uma página.">
        <Demo>
          <Pagination
            defaultCurrent={1}
            total={500}
            showQuickJumper
            showSizeChanger
            showTotal={(total) => `Total: ${total} registros`}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Simples (mobile)" description="Versão simplificada para interfaces móveis.">
        <Demo>
          <Pagination simple defaultCurrent={2} total={50} />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanhos" description="Paginação em tamanho pequeno e padrão.">
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <Demo label="Padrão">
            <Pagination defaultCurrent={3} total={100} />
          </Demo>
          <Demo label="Pequena">
            <Pagination size="small" defaultCurrent={3} total={100} />
          </Demo>
        </Space>
      </Section>

      <Divider />

      <Section title="Desabilitado" description="Paginação no estado desabilitado.">
        <Demo>
          <Pagination disabled defaultCurrent={3} total={100} showSizeChanger />
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub" description="Paginação integrada em lista de veículos.">
        <Demo>
          <Space orientation="vertical" style={{ width: '100%' }} size="middle">
            {fakeVehicles.map(v => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: '#fff',
                border: `1px solid ${G[200]}`, borderRadius: 8,
              }}>
                <Space>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: '#EDFCF7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CarOutlined style={{ color: '#0E885F' }} />
                  </div>
                  <div>
                    <Text strong style={{ display: 'block' }}>{v.name}</Text>
                    <Text style={{ fontSize: 12, color: G[500] }}>{v.plate}</Text>
                  </div>
                </Space>
                <Tag color={v.status === 'Ativo' ? 'green' : 'default'}>{v.status}</Tag>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
              <Pagination
                defaultCurrent={1}
                pageSize={5}
                total={48}
                showTotal={(total) => `Total: ${total} veículos`}
                size="small"
              />
            </div>
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default PaginationShowcase
