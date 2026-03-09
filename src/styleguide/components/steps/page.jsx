import { useState } from 'react'
import { Steps, Button, Space, Divider, Typography, Tag, Result } from 'antd'
import {
  UserOutlined, CarOutlined, CalendarOutlined, CheckCircleOutlined,
  ToolOutlined, FileTextOutlined, CreditCardOutlined, SmileOutlined,
} from '@ant-design/icons'

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
      borderRadius: 8, padding: '24px 32px',
    }}>
      {children}
    </div>
  </div>
)

const scheduleSteps = [
  {
    title: 'Veículo',
    description: 'Selecione o veículo',
    icon: <CarOutlined />,
  },
  {
    title: 'Serviço',
    description: 'Escolha o tipo',
    icon: <ToolOutlined />,
  },
  {
    title: 'Oficina',
    description: 'Selecione a oficina',
    icon: <FileTextOutlined />,
  },
  {
    title: 'Data e Hora',
    description: 'Escolha o horário',
    icon: <CalendarOutlined />,
  },
  {
    title: 'Confirmação',
    description: 'Revise e confirme',
    icon: <CheckCircleOutlined />,
  },
]

const StepsShowcase = () => {
  const [current, setCurrent] = useState(0)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Steps</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Guia o usuário por fluxos multi-etapas, como formulários, checkouts e processos de registro.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">antd v6</Tag>
          <Tag color="default">Navegação</Tag>
        </Space>
      </div>

      <Section title="Básico" description="Steps horizontal simples com status padrão.">
        <Demo>
          <Steps
            current={1}
            items={[
              { title: 'Cadastro', description: 'Dados pessoais' },
              { title: 'Veículo', description: 'Dados do veículo' },
              { title: 'Confirmação', description: 'Revise tudo' },
            ]}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com ícones" description="Substitua os números padrão por ícones personalizados.">
        <Demo>
          <Steps
            current={2}
            items={scheduleSteps.map((s, i) => ({
              ...s,
              status: i < 2 ? 'finish' : i === 2 ? 'process' : 'wait',
            }))}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Status de erro" description="Exiba uma etapa com erro para validação.">
        <Demo>
          <Steps
            current={2}
            status="error"
            items={[
              { title: 'Dados Pessoais', description: 'Concluído' },
              { title: 'Documentos', description: 'Concluído' },
              { title: 'Pagamento', description: 'Dados inválidos' },
              { title: 'Confirmação', description: 'Aguardando' },
            ]}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Vertical" description="Orientação vertical — ideal para sidebars e flows longos.">
        <Demo>
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: 'Serviço solicitado',
                description: 'Revisão Geral — Honda Civic 2022',
                status: 'finish',
              },
              {
                title: 'Orçamento enviado',
                description: 'Aguardando sua aprovação',
                status: 'process',
              },
              {
                title: 'Agendamento confirmado',
                description: 'Data e hora definidos',
                status: 'wait',
              },
              {
                title: 'Serviço em andamento',
                description: 'Oficina Silva iniciou o trabalho',
                status: 'wait',
              },
              {
                title: 'Serviço concluído',
                description: 'Veículo pronto para retirada',
                status: 'wait',
              },
            ]}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Pequeno (small)" description="Variante compacta para espaços reduzidos.">
        <Demo>
          <Steps
            size="small"
            current={2}
            items={[
              { title: 'Login' },
              { title: 'Perfil' },
              { title: 'Veículo' },
              { title: 'Plano' },
            ]}
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Passo a passo interativo" description="Fluxo de agendamento GarageHub com navegação entre etapas.">
        <Demo>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Steps current={current} items={scheduleSteps} />

            <div style={{
              minHeight: 120, background: '#fff', border: `1px solid ${G[200]}`,
              borderRadius: 8, padding: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {current < scheduleSteps.length ? (
                <div style={{ textAlign: 'center' }}>
                  <Text style={{ color: G[500], fontSize: 14 }}>
                    Etapa {current + 1}: <Text strong>{scheduleSteps[current].title}</Text>
                  </Text>
                  <br />
                  <Text style={{ fontSize: 12, color: G[400] }}>
                    {scheduleSteps[current].description}
                  </Text>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <SmileOutlined style={{ fontSize: 32, color: '#3DD9A4' }} />
                  <br />
                  <Text strong style={{ color: '#0E885F' }}>Agendamento concluído!</Text>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={current === 0}
                onClick={() => setCurrent(c => c - 1)}
              >
                Anterior
              </Button>
              <Button
                type="primary"
                disabled={current >= scheduleSteps.length}
                onClick={() => setCurrent(c => Math.min(c + 1, scheduleSteps.length))}
              >
                {current === scheduleSteps.length - 1 ? 'Confirmar' : 'Próximo'}
              </Button>
            </div>
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default StepsShowcase
