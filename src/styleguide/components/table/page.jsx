import { useState } from 'react'
import { Table, Space, Divider, Typography, Tag, Button, Avatar, Badge } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined, CarOutlined } from '@ant-design/icons'

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

const vehicles = [
  { key: '1', id: 'V001', model: 'Honda Civic 2022', plate: 'ABC-1234', km: 45230, status: 'Ativo', owner: 'João Silva' },
  { key: '2', id: 'V002', model: 'Toyota Corolla 2021', plate: 'DEF-5678', km: 32100, status: 'Ativo', owner: 'Maria Santos' },
  { key: '3', id: 'V003', model: 'Ford Ka 2020', plate: 'GHI-9012', km: 78400, status: 'Inativo', owner: 'Carlos Oliveira' },
  { key: '4', id: 'V004', model: 'Volkswagen Gol 2019', plate: 'JKL-3456', km: 102500, status: 'Ativo', owner: 'Ana Lima' },
  { key: '5', id: 'V005', model: 'Chevrolet Onix 2023', plate: 'MNO-7890', km: 12400, status: 'Ativo', owner: 'Pedro Costa' },
]

const services = [
  { key: '1', id: 'S001', type: 'Revisão Geral', vehicle: 'Honda Civic 2022', workshop: 'Oficina Silva', date: '15/03/2026', value: 299.90, status: 'Concluído' },
  { key: '2', id: 'S002', type: 'Troca de Óleo', vehicle: 'Toyota Corolla 2021', workshop: 'Auto Mecânica', date: '12/03/2026', value: 89.90, status: 'Em andamento' },
  { key: '3', id: 'S003', type: 'Alinhamento', vehicle: 'Ford Ka 2020', workshop: 'Garagem João', date: '10/03/2026', value: 149.90, status: 'Aguardando' },
  { key: '4', id: 'S004', type: 'Freios', vehicle: 'Volkswagen Gol', workshop: 'Oficina Silva', date: '08/03/2026', value: 380.00, status: 'Cancelado' },
]

const statusColor = { Ativo: 'success', Inativo: 'default', Concluído: 'success', 'Em andamento': 'processing', Aguardando: 'warning', Cancelado: 'error' }

const vehicleColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: v => <Text style={{ fontFamily: 'monospace', fontSize: 12, color: G[500] }}>{v}</Text> },
  {
    title: 'Veículo',
    dataIndex: 'model',
    key: 'model',
    render: (model) => (
      <Space>
        <Avatar size={32} icon={<CarOutlined />} style={{ background: '#EDFCF7', color: '#0E885F' }} />
        <Text strong>{model}</Text>
      </Space>
    ),
    sorter: (a, b) => a.model.localeCompare(b.model),
  },
  { title: 'Placa', dataIndex: 'plate', key: 'plate', render: v => <Tag>{v}</Tag> },
  { title: 'Quilometragem', dataIndex: 'km', key: 'km', sorter: (a, b) => a.km - b.km, render: v => `${v.toLocaleString('pt-BR')} km` },
  { title: 'Proprietário', dataIndex: 'owner', key: 'owner' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [{ text: 'Ativo', value: 'Ativo' }, { text: 'Inativo', value: 'Inativo' }],
    onFilter: (value, record) => record.status === value,
    render: s => <Tag color={statusColor[s]}>{s}</Tag>,
  },
  {
    title: 'Ações',
    key: 'actions',
    render: () => (
      <Space>
        <Button type="text" size="small" icon={<EyeOutlined />} />
        <Button type="text" size="small" icon={<EditOutlined />} />
        <Button type="text" size="small" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
]

const serviceColumns = [
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
  { title: 'Veículo', dataIndex: 'vehicle', key: 'vehicle' },
  { title: 'Oficina', dataIndex: 'workshop', key: 'workshop' },
  { title: 'Data', dataIndex: 'date', key: 'date' },
  { title: 'Valor', dataIndex: 'value', key: 'value', sorter: (a, b) => a.value - b.value, render: v => `R$ ${v.toFixed(2).replace('.', ',')}` },
  { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
]

const TableShowcase = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Table</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Tabela de dados com suporte a ordenação, filtragem, seleção de linhas, paginação e expansão.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Tabela de veículos" description="Lista completa com ordenação, filtros e ações.">
        <Demo>
          <Table
            columns={vehicleColumns}
            dataSource={vehicles}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            pagination={{ pageSize: 5, showTotal: (total) => `Total: ${total} veículos` }}
            size="middle"
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tabela de serviços" description="Histórico de serviços com valor e status.">
        <Demo>
          <Table
            columns={serviceColumns}
            dataSource={services}
            pagination={false}
            size="middle"
            summary={(data) => {
              const total = data.reduce((sum, row) => sum + row.value, 0)
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <Text strong>Total</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <Text strong style={{ color: '#0E885F' }}>
                      R$ {total.toFixed(2).replace('.', ',')}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} />
                </Table.Summary.Row>
              )
            }}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanho compacto" description="Table com size='small' para espaços reduzidos.">
        <Demo>
          <Table
            columns={[
              { title: 'Modelo', dataIndex: 'model', key: 'model' },
              { title: 'Placa', dataIndex: 'plate', key: 'plate' },
              { title: 'KM', dataIndex: 'km', key: 'km', render: v => `${v.toLocaleString('pt-BR')}` },
              { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
            ]}
            dataSource={vehicles}
            size="small"
            pagination={false}
          />
        </Demo>
      </Section>
    </div>
  )
}

export default TableShowcase
