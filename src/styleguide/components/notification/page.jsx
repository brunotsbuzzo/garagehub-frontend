import { notification, Button, Space, Divider, Typography, Tag } from 'antd'
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, InfoCircleOutlined, BellOutlined } from '@ant-design/icons'

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

const NotificationShowcase = () => {
  const [api, contextHolder] = notification.useNotification()

  const openSuccess = () => api.success({
    message: 'Agendamento confirmado!',
    description: 'Revisão Geral na Oficina Silva — 20/03/2026 às 09:00. Você receberá um lembrete por e-mail.',
    duration: 4,
  })

  const openError = () => api.error({
    message: 'Falha ao salvar',
    description: 'Não foi possível salvar as alterações. Verifique sua conexão e tente novamente.',
    duration: 4,
  })

  const openWarning = () => api.warning({
    message: 'Atenção: revisão vencendo',
    description: 'O Honda Civic 2022 está com a revisão vencendo em 7 dias. Agende agora para evitar problemas.',
    duration: 6,
  })

  const openInfo = () => api.info({
    message: 'Nova oficina parceira',
    description: '3 novas oficinas foram cadastradas na sua região. Confira as avaliações e agende!',
    duration: 4,
  })

  const openWithIcon = () => api.open({
    message: 'Serviço concluído',
    description: 'O Honda Civic 2022 está pronto para retirada na Oficina Silva.',
    icon: <CheckCircleOutlined style={{ color: '#3DD9A4' }} />,
    duration: 4,
  })

  const openWithBtn = () => api.warning({
    message: 'IPVA vencendo em 15 dias',
    description: 'Regularize o pagamento do IPVA do Toyota Corolla 2021 para evitar multas.',
    btn: (
      <Space>
        <Button type="primary" size="small" onClick={() => api.destroy('ipva')}>
          Ver detalhes
        </Button>
        <Button size="small" onClick={() => api.destroy('ipva')}>
          Lembrar depois
        </Button>
      </Space>
    ),
    key: 'ipva',
    duration: 0,
  })

  const openPlacement = (placement) => api.info({
    message: `Posição: ${placement}`,
    description: 'Notification aparecendo no canto selecionado.',
    placement,
    duration: 2,
  })

  return (
    <div>
      {contextHolder}
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Notification</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Notificações de sistema no canto da tela. Mais rica que Message — suporta título, descrição, ícone e ações.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
      </div>

      <Section title="Tipos" description="success, error, warning e info.">
        <Demo>
          <Space wrap>
            <Button icon={<CheckCircleOutlined />} style={{ color: '#52C41A', borderColor: '#52C41A' }} onClick={openSuccess}>
              Sucesso
            </Button>
            <Button danger icon={<CloseCircleOutlined />} onClick={openError}>
              Erro
            </Button>
            <Button icon={<WarningOutlined />} style={{ color: '#FAAD14', borderColor: '#FAAD14' }} onClick={openWarning}>
              Aviso
            </Button>
            <Button icon={<InfoCircleOutlined />} onClick={openInfo}>
              Info
            </Button>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com ícone personalizado" description="Ícone customizado usando notification.open.">
        <Demo>
          <Button icon={<BellOutlined />} type="primary" onClick={openWithIcon}>
            Ícone GarageHub Green
          </Button>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com botões de ação" description="Adicione CTAs direto na notificação.">
        <Demo>
          <Button onClick={openWithBtn}>Notificação com ação (IPVA)</Button>
        </Demo>
      </Section>

      <Divider />

      <Section title="Posicionamentos" description="topLeft, topRight (padrão), bottomLeft, bottomRight.">
        <Demo>
          <Space wrap>
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(p => (
              <Button key={p} size="small" onClick={() => openPlacement(p)}>{p}</Button>
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="API de uso" description="Como usar notification com useNotification hook.">
        <Demo>
          <div style={{ background: '#1F2937', borderRadius: 8, padding: 16 }}>
            <Text style={{ fontFamily: 'monospace', fontSize: 12, color: '#3DD9A4', whiteSpace: 'pre-wrap' }}>
{`// Hook (recomendado no antd v5+)
const [api, contextHolder] = notification.useNotification()

// No JSX:
<>{contextHolder}</>

// Disparar notificação:
api.success({
  message: 'Agendamento confirmado!',
  description: 'Revisão Geral — Oficina Silva',
  duration: 4,
})`}
            </Text>
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default NotificationShowcase
