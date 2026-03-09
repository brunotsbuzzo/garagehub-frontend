import { useState } from 'react'
import { Modal, Button, Space, Divider, Typography, Tag, Form, Input, Select, Result } from 'antd'
import { ExclamationCircleOutlined, CheckCircleOutlined, DeleteOutlined, CarOutlined } from '@ant-design/icons'

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

const ModalShowcase = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleFormOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setFormOpen(false)
      form.resetFields()
    }, 1500)
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Modal</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Janela de diálogo que bloqueia a interação com o conteúdo de fundo.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Básico" description="Modal simples com título e conteúdo.">
        <Demo>
          <Button type="primary" onClick={() => setBasicOpen(true)}>Abrir Modal</Button>
          <Modal
            title="Detalhes do Veículo"
            open={basicOpen}
            onOk={() => setBasicOpen(false)}
            onCancel={() => setBasicOpen(false)}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <Space orientation="vertical" style={{ width: '100%' }} size="small">
              {[
                ['Modelo', 'Honda Civic 2022'],
                ['Placa', 'ABC-1234'],
                ['Cor', 'Branco Perolado'],
                ['Quilometragem', '45.230 km'],
                ['Último serviço', 'Revisão Geral — 15/01/2026'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${G[100]}` }}>
                  <Text style={{ color: G[500] }}>{k}</Text>
                  <Text strong>{v}</Text>
                </div>
              ))}
            </Space>
          </Modal>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com formulário" description="Modal com Form para cadastro de veículo.">
        <Demo>
          <Button icon={<CarOutlined />} onClick={() => setFormOpen(true)}>Cadastrar Veículo</Button>
          <Modal
            title="Cadastrar Novo Veículo"
            open={formOpen}
            onOk={handleFormOk}
            onCancel={() => { setFormOpen(false); form.resetFields() }}
            okText="Cadastrar"
            cancelText="Cancelar"
            confirmLoading={loading}
            width={520}
          >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
              <Form.Item label="Marca / Modelo" name="model" rules={[{ required: true }]}>
                <Input placeholder="Ex: Honda Civic" />
              </Form.Item>
              <Form.Item label="Ano" name="year" rules={[{ required: true }]}>
                <Input placeholder="Ex: 2022" />
              </Form.Item>
              <Form.Item label="Placa" name="plate" rules={[{ required: true }]}>
                <Input placeholder="Ex: ABC-1234" />
              </Form.Item>
              <Form.Item label="Cor" name="color">
                <Select placeholder="Selecione a cor" options={[
                  { value: 'branco', label: 'Branco' },
                  { value: 'preto', label: 'Preto' },
                  { value: 'prata', label: 'Prata' },
                  { value: 'cinza', label: 'Cinza' },
                  { value: 'vermelho', label: 'Vermelho' },
                  { value: 'azul', label: 'Azul' },
                ]} />
              </Form.Item>
              <Form.Item label="Quilometragem atual" name="km">
                <Input placeholder="Ex: 45000" addonAfter="km" />
              </Form.Item>
            </Form>
          </Modal>
        </Demo>
      </Section>

      <Divider />

      <Section title="Confirmação de exclusão" description="Modal de confirmação para ações destrutivas.">
        <Demo>
          <Button danger icon={<DeleteOutlined />} onClick={() => setConfirmOpen(true)}>
            Remover veículo
          </Button>
          <Modal
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: '#FF4D4F' }} />
                Confirmar remoção
              </Space>
            }
            open={confirmOpen}
            onOk={() => setConfirmOpen(false)}
            onCancel={() => setConfirmOpen(false)}
            okText="Sim, remover"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <Paragraph>
              Tem certeza que deseja remover o <Text strong>Honda Civic 2022 (ABC-1234)</Text>?
            </Paragraph>
            <Paragraph style={{ color: G[500], fontSize: 13, margin: 0 }}>
              Todo o histórico de serviços associado a este veículo será permanentemente excluído. Esta ação não pode ser desfeita.
            </Paragraph>
          </Modal>
        </Demo>
      </Section>

      <Divider />

      <Section title="Modal de sucesso" description="Feedback de conclusão de processo.">
        <Demo>
          <Button type="primary" style={{ background: '#52C41A', borderColor: '#52C41A' }} icon={<CheckCircleOutlined />} onClick={() => setSuccessOpen(true)}>
            Ver confirmação
          </Button>
          <Modal
            open={successOpen}
            footer={[
              <Button key="close" type="primary" onClick={() => setSuccessOpen(false)}>
                Ver agendamento
              </Button>,
            ]}
            onCancel={() => setSuccessOpen(false)}
            width={440}
          >
            <Result
              status="success"
              title="Agendamento confirmado!"
              subTitle="Revisão Geral na Oficina Silva — 20/03/2026 às 09:00"
            />
          </Modal>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanhos" description="Controle a largura do modal com a prop width.">
        <Demo>
          <Space wrap>
            {[320, 480, 680, 800].map(w => (
              <Button key={w} size="small" onClick={() => {
                Modal.info({
                  title: `Modal ${w}px`,
                  content: `Este modal tem width=${w}px`,
                  width: w,
                  okText: 'Fechar',
                })
              }}>
                {w}px
              </Button>
            ))}
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default ModalShowcase
