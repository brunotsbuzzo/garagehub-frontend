import { useState } from 'react'
import { Drawer, Button, Space, Divider, Typography, Tag, Form, Input, Select, Avatar } from 'antd'
import { CarOutlined, ToolOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'

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

const serviceHistory = [
  { type: 'Revisão Geral', date: '15/01/2026', workshop: 'Oficina Silva', value: 299.90, status: 'Concluído' },
  { type: 'Troca de Óleo', date: '20/10/2025', workshop: 'Auto Mecânica', value: 89.90, status: 'Concluído' },
  { type: 'Alinhamento', date: '05/08/2025', workshop: 'Garagem João', value: 149.90, status: 'Concluído' },
]

const DrawerShowcase = () => {
  const [placement, setPlacement] = useState('right')
  const [placementOpen, setPlacementOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Drawer</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Painel deslizante que abre a partir de uma borda da tela. Ideal para detalhes, filtros e formulários.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Posicionamentos" description="right, left, top e bottom.">
        <Demo>
          <Space wrap>
            {['right', 'left', 'top', 'bottom'].map(p => (
              <Button key={p} onClick={() => { setPlacement(p); setPlacementOpen(true) }}>
                {p}
              </Button>
            ))}
          </Space>
          <Drawer
            title={`Drawer — ${placement}`}
            placement={placement}
            open={placementOpen}
            onClose={() => setPlacementOpen(false)}
          >
            <Paragraph style={{ color: G[500] }}>
              Este drawer abre pela borda <Text strong>{placement}</Text> da tela.
            </Paragraph>
          </Drawer>
        </Demo>
      </Section>

      <Divider />

      <Section title="Detalhes do veículo" description="Drawer de consulta com histórico.">
        <Demo>
          <Button icon={<CarOutlined />} onClick={() => setDetailOpen(true)}>
            Ver Honda Civic 2022
          </Button>
          <Drawer
            title="Honda Civic 2022"
            size="large"
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
            extra={
              <Button type="primary" size="small" icon={<PlusOutlined />}>
                Agendar serviço
              </Button>
            }
          >
            <Space orientation="vertical" style={{ width: '100%' }} size="large">
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Avatar size={56} icon={<CarOutlined />} style={{ background: '#EDFCF7', color: '#0E885F' }} />
                <div>
                  <Title level={5} style={{ margin: 0 }}>Honda Civic 2022</Title>
                  <Text style={{ color: G[500] }}>Placa: ABC-1234 · Branco · 45.230 km</Text>
                </div>
              </div>

              <Divider style={{ margin: '0' }} />

              <div>
                <Text strong style={{ display: 'block', marginBottom: 12 }}>Dados do veículo</Text>
                {[
                  ['Motor', '1.5 Turbo Flex'],
                  ['Combustível', 'Flex'],
                  ['Câmbio', 'CVT'],
                  ['Aquisição', '10/03/2022'],
                  ['Próxima revisão', '45.000 km'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${G[100]}` }}>
                    <Text style={{ color: G[500], fontSize: 13 }}>{k}</Text>
                    <Text style={{ fontSize: 13 }}>{v}</Text>
                  </div>
                ))}
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: 12 }}>Histórico de serviços</Text>
                <div>
                  {serviceHistory.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < serviceHistory.length - 1 ? `1px solid ${G[200]}` : 'none' }}>
                      <div>
                        <Text strong style={{ fontSize: 13, display: 'block' }}>{item.type}</Text>
                        <Text style={{ fontSize: 12, color: G[500] }}>{item.date} · {item.workshop}</Text>
                      </div>
                      <Text style={{ color: '#0E885F', fontWeight: 600 }}>
                        R$ {item.value.toFixed(2).replace('.', ',')}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </Space>
          </Drawer>
        </Demo>
      </Section>

      <Divider />

      <Section title="Formulário no drawer" description="Drawer com form de cadastro.">
        <Demo>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
            Novo Agendamento
          </Button>
          <Drawer
            title="Agendar Serviço"
            size="default"
            open={formOpen}
            onClose={() => setFormOpen(false)}
            footer={
              <div style={{ textAlign: 'right' }}>
                <Space>
                  <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
                  <Button type="primary" onClick={() => setFormOpen(false)}>Confirmar</Button>
                </Space>
              </div>
            }
          >
            <Form layout="vertical">
              <Form.Item label="Veículo" name="vehicle">
                <Select placeholder="Selecione o veículo" options={[
                  { value: 'civic', label: 'Honda Civic 2022' },
                  { value: 'corolla', label: 'Toyota Corolla 2021' },
                ]} />
              </Form.Item>
              <Form.Item label="Tipo de serviço" name="service">
                <Select placeholder="Selecione o serviço" options={[
                  { value: 'review', label: 'Revisão Geral' },
                  { value: 'oil', label: 'Troca de Óleo' },
                  { value: 'align', label: 'Alinhamento' },
                ]} />
              </Form.Item>
              <Form.Item label="Oficina" name="workshop">
                <Select placeholder="Selecione a oficina" options={[
                  { value: 'silva', label: 'Oficina Silva' },
                  { value: 'auto', label: 'Auto Mecânica Central' },
                ]} />
              </Form.Item>
              <Form.Item label="Observações" name="notes">
                <Input.TextArea rows={3} placeholder="Descreva o problema ou solicitação..." />
              </Form.Item>
            </Form>
          </Drawer>
        </Demo>
      </Section>
    </div>
  )
}

export default DrawerShowcase
