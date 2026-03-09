import { message, Button, Space, Divider, Typography, Tag } from 'antd'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'

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

const MessageShowcase = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showSuccess = () => messageApi.success('Veículo cadastrado com sucesso!')
  const showError = () => messageApi.error('Falha ao processar. Tente novamente.')
  const showWarning = () => messageApi.warning('Revisão pendente: Honda Civic 2022')
  const showInfo = () => messageApi.info('3 novas oficinas disponíveis na sua região.')
  const showLoading = () => {
    const hide = messageApi.loading('Salvando agendamento...', 0)
    setTimeout(hide, 2500)
    setTimeout(() => messageApi.success('Agendamento salvo!'), 2600)
  }
  const showDuration = () => messageApi.info('Esta mensagem some em 5 segundos', 5)
  const showKey = () => {
    messageApi.loading({ content: 'Conectando à oficina...', key: 'updatable' })
    setTimeout(() => {
      messageApi.success({ content: 'Oficina Silva confirmou o agendamento!', key: 'updatable', duration: 3 })
    }, 2000)
  }

  return (
    <div>
      {contextHolder}
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Message</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Mensagens de feedback global exibidas no topo da página. Leve e não intrusivo.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Tipos" description="success, error, warning e info.">
        <Demo>
          <Space wrap>
            <Button onClick={showSuccess} style={{ color: '#52C41A', borderColor: '#52C41A' }}>Sucesso</Button>
            <Button onClick={showError} danger>Erro</Button>
            <Button onClick={showWarning} style={{ color: '#FAAD14', borderColor: '#FAAD14' }}>Aviso</Button>
            <Button onClick={showInfo}>Info</Button>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Loading" description="Mensagem de carregamento com duração controlada.">
        <Demo>
          <Button onClick={showLoading} icon={<LoadingOutlined />}>
            Salvar agendamento (simular)
          </Button>
        </Demo>
      </Section>

      <Divider />

      <Section title="Duração personalizada" description="Controle por quanto tempo a mensagem fica visível.">
        <Demo>
          <Space>
            <Button onClick={() => messageApi.success('Some em 2s (padrão)', 2)}>2s (padrão)</Button>
            <Button onClick={showDuration}>5s</Button>
            <Button onClick={() => messageApi.info('Mensagem permanente', 0)}>Permanente (0)</Button>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Atualização por key" description="Use key para atualizar uma mensagem existente.">
        <Demo label="Loading → Success (após 2s)">
          <Button type="primary" onClick={showKey}>Confirmar agendamento</Button>
        </Demo>
      </Section>

      <Divider />

      <Section title="Múltiplas mensagens" description="Controle do máximo de mensagens simultâneas.">
        <Demo>
          <Space>
            <Button onClick={() => {
              for (let i = 1; i <= 3; i++) {
                setTimeout(() => messageApi.info(`Serviço ${i} agendado`), i * 200)
              }
            }}>
              Disparar 3 mensagens
            </Button>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="API de uso" description="Como usar message com useMessage hook (recomendado).">
        <Demo>
          <div style={{ background: '#1F2937', borderRadius: 8, padding: 16 }}>
            <Text style={{ fontFamily: 'monospace', fontSize: 12, color: '#3DD9A4', whiteSpace: 'pre-wrap' }}>
{`// Hook (recomendado no antd v5+)
const [messageApi, contextHolder] = message.useMessage()

// No JSX:
<>{contextHolder}</>

// Disparar mensagem:
messageApi.success('Operação concluída!')
messageApi.error('Algo deu errado')
messageApi.loading('Processando...', 0) // 0 = não fecha`}
            </Text>
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default MessageShowcase
