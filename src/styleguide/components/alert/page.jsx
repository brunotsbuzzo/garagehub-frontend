import { Alert, Space, Divider, Typography, Tag, Button } from 'antd'
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

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

const AlertShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Alert</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Mensagens de alerta inline para informar o usuário sobre situações importantes.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
    </div>

    <Section title="Tipos" description="success, info, warning e error.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert type="success" title="Agendamento confirmado com sucesso!" />
          <Alert type="info" title="Seu veículo está em manutenção preventiva agendada." />
          <Alert type="warning" title="A revisão do Honda Civic está vencendo em 7 dias." />
          <Alert type="error" title="Falha ao processar o pagamento. Tente novamente." />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com ícone" description="showIcon exibe o ícone correspondente ao tipo.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert type="success" showIcon title="Serviço concluído com êxito" />
          <Alert type="info" showIcon title="3 novas oficinas disponíveis na sua região" />
          <Alert type="warning" showIcon title="Manutenção preventiva necessária em breve" />
          <Alert type="error" showIcon title="Documento CRLV expirado — regularize o veículo" />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com descrição" description="Texto adicional abaixo do título.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert
            type="success"
            showIcon
            title="Revisão Geral Concluída"
            description="Seu Honda Civic 2022 passou pela revisão completa. Próxima revisão recomendada em 12 meses ou 15.000 km."
          />
          <Alert
            type="warning"
            showIcon
            title="IPVA com vencimento próximo"
            description="O IPVA do seu Toyota Corolla 2021 vence em 15 dias. Evite multas e regularize o documento."
          />
          <Alert
            type="error"
            showIcon
            title="Falha no agendamento"
            description="Não foi possível confirmar o agendamento com a Oficina Silva. A agenda está indisponível neste horário. Selecione outro horário."
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Fechável (closable)" description="O usuário pode fechar o alerta.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert
            type="info"
            showIcon
            closable
            title="GarageHub agora suporta agendamento de serviços de reboque."
          />
          <Alert
            type="warning"
            showIcon
            closable
            title="Revisão pendente"
            description="Você tem 2 veículos com revisão pendente. Clique para agendar."
            action={<Button size="small" type="link">Agendar agora</Button>}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com ação" description="Botão de ação integrado no alert.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert
            type="info"
            showIcon
            title="Atualização disponível"
            description="Uma nova versão do GarageHub está disponível com melhorias de performance."
            action={
              <Space>
                <Button size="small" type="primary">Atualizar</Button>
                <Button size="small">Depois</Button>
              </Space>
            }
          />
          <Alert
            type="warning"
            showIcon
            title="Perfil incompleto"
            action={<Button size="small">Completar perfil</Button>}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Banner" description="Alert em modo banner (sem bordas arredondadas).">
      <Demo style={{ padding: 0, overflow: 'hidden', borderRadius: 8 }}>
        <Alert
          banner
          type="warning"
          showIcon
          title="Manutenção programada: O sistema estará indisponível de 02:00 às 04:00 do dia 15/03."
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Painel de alertas" description="Múltiplos alertas do sistema em um painel.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Alert
            type="success"
            showIcon
            closable
            title="Revisão Geral concluída — Honda Civic 2022"
            description="A Oficina Silva finalizou o serviço. Seu veículo está pronto para retirada."
            action={<Button size="small" type="primary" ghost>Ver laudo</Button>}
          />
          <Alert
            type="warning"
            showIcon
            closable
            title="Troca de óleo vencida há 2.000 km"
            description="O intervalo de troca de óleo do Ford Ka foi ultrapassado. Agende o quanto antes."
            action={<Button size="small">Agendar</Button>}
          />
          <Alert
            type="error"
            showIcon
            title="Documento vencido"
            description="O licenciamento do Toyota Corolla 2021 está vencido desde 01/01/2026."
          />
        </Space>
      </Demo>
    </Section>
  </div>
)

export default AlertShowcase
