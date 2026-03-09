import { Popconfirm, Button, Space, Divider, Typography, Tag, message } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'

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

const confirm = (action) => message.success(`Ação confirmada: ${action}`)
const cancel = () => message.info('Ação cancelada')

const PopconfirmShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Popconfirm</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Caixa de confirmação flutuante para ações irreversíveis. Menos intrusivo que Modal.confirm.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
    </div>

    <Section title="Básico" description="Confirmação simples com ícone de pergunta.">
      <Demo>
        <Popconfirm
          title="Remover veículo"
          description="Tem certeza que deseja remover este veículo?"
          onConfirm={() => confirm('remover veículo')}
          onCancel={cancel}
          okText="Sim, remover"
          cancelText="Cancelar"
        >
          <Button danger icon={<DeleteOutlined />}>Remover veículo</Button>
        </Popconfirm>
      </Demo>
    </Section>

    <Divider />

    <Section title="Ícone customizado" description="Substitua o ícone padrão.">
      <Demo>
        <Space wrap>
          <Popconfirm
            title="Cancelar agendamento?"
            description="O cancelamento é gratuito até 24h antes do serviço."
            icon={<QuestionCircleOutlined style={{ color: '#FAAD14' }} />}
            onConfirm={() => confirm('cancelar agendamento')}
            okText="Cancelar agendamento"
            cancelText="Manter"
            okButtonProps={{ danger: false }}
          >
            <Button>Cancelar agendamento</Button>
          </Popconfirm>

          <Popconfirm
            title="Excluir histórico?"
            description="Todos os registros de serviço serão removidos permanentemente."
            icon={<ExclamationCircleOutlined style={{ color: '#FF4D4F' }} />}
            onConfirm={() => confirm('excluir histórico')}
            okText="Excluir"
            cancelText="Não"
            okButtonProps={{ danger: true }}
          >
            <Button danger>Excluir histórico</Button>
          </Popconfirm>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Posicionamentos" description="Controle onde o popconfirm aparece.">
      <Demo>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 8, width: 'fit-content' }}>
          {['topLeft', 'top', 'topRight', 'left', 'right', 'bottomLeft', 'bottom', 'bottomRight'].map(p => (
            <Popconfirm
              key={p}
              placement={p}
              title={`Confirmar? (${p})`}
              onConfirm={() => confirm(p)}
              okText="Sim"
              cancelText="Não"
            >
              <Button size="small">{p}</Button>
            </Popconfirm>
          ))}
        </div>
      </Demo>
    </Section>

    <Divider />

    <Section title="Condicionalmente desabilitado" description="Use disabled para pular a confirmação.">
      <Demo label="O Popconfirm aparece apenas se necessário">
        <Space>
          {[true, false].map(disabled => (
            <Popconfirm
              key={String(disabled)}
              title="Confirmar ação?"
              disabled={disabled}
              onConfirm={() => confirm(`disabled=${disabled}`)}
              okText="Confirmar"
              cancelText="Cancelar"
            >
              <Button type={disabled ? 'default' : 'primary'}>
                {disabled ? 'Sem confirmação (disabled)' : 'Com confirmação'}
              </Button>
            </Popconfirm>
          ))}
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Ações destrutivas" description="Confirmações em lista de veículos.">
      <Demo>
        <Space direction="vertical" style={{ width: '100%', maxWidth: 480 }} size="small">
          {['Honda Civic 2022', 'Toyota Corolla 2021', 'Ford Ka 2020'].map(car => (
            <div key={car} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px', background: '#fff',
              border: `1px solid ${G[200]}`, borderRadius: 8,
            }}>
              <Text>{car}</Text>
              <Popconfirm
                title={`Remover ${car}?`}
                description="O histórico de serviços será excluído."
                onConfirm={() => confirm(`remover ${car}`)}
                onCancel={cancel}
                okText="Remover"
                cancelText="Cancelar"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: '#FF4D4F' }} />}
              >
                <Button type="text" size="small" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          ))}
        </Space>
      </Demo>
    </Section>
  </div>
)

export default PopconfirmShowcase
