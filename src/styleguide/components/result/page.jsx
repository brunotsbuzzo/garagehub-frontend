import { Result, Button, Space, Divider, Typography, Tag, Steps } from 'antd'
import { SmileOutlined, CarOutlined } from '@ant-design/icons'

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
    <div style={{ background: G[50], border: `1px solid ${G[200]}`, borderRadius: 8, padding: '16px' }}>
      {children}
    </div>
  </div>
)

const ResultShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Result</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Página de resultado para conclusão de processos — sucesso, erro, aviso ou informação.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
    </div>

    <Section title="Sucesso" description="Operação concluída com êxito.">
      <Demo>
        <Result
          status="success"
          title="Agendamento confirmado!"
          subTitle="Revisão Geral no Honda Civic 2022 — Oficina Silva — 20/03/2026 às 09:00"
          extra={[
            <Button type="primary" key="view">Ver agendamento</Button>,
            <Button key="home">Voltar ao início</Button>,
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Erro" description="Falha ao processar a operação.">
      <Demo>
        <Result
          status="error"
          title="Falha no agendamento"
          subTitle="Não foi possível confirmar o agendamento. Verifique sua conexão e tente novamente."
          extra={[
            <Button type="primary" danger key="retry">Tentar novamente</Button>,
            <Button key="cancel">Cancelar</Button>,
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Aviso" description="Ação requer atenção do usuário.">
      <Demo>
        <Result
          status="warning"
          title="Conta incompleta"
          subTitle="Complete seu perfil para acessar todos os recursos do GarageHub."
          extra={<Button type="primary">Completar perfil</Button>}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Informação" description="Resultado informativo neutro.">
      <Demo>
        <Result
          status="info"
          title="Aguardando aprovação"
          subTitle="Seu orçamento foi enviado para a Oficina Silva. Você receberá uma resposta em até 2 horas."
          extra={<Button>Ver status</Button>}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="404 e 403" description="Páginas de erro HTTP.">
      <Space orientation="vertical" style={{ width: '100%' }} size="large">
        <Demo label="Página não encontrada (404)">
          <Result
            status="404"
            title="404"
            subTitle="Esta página não existe. Verifique o endereço ou volte ao início."
            extra={<Button type="primary">Ir ao início</Button>}
          />
        </Demo>
        <Demo label="Acesso negado (403)">
          <Result
            status="403"
            title="403"
            subTitle="Você não tem permissão para acessar esta funcionalidade."
            extra={<Button type="primary">Solicitar acesso</Button>}
          />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Ícone customizado" description="Substitua o ícone padrão por um personalizado.">
      <Demo>
        <Result
          icon={<CarOutlined style={{ color: '#3DD9A4', fontSize: 48 }} />}
          title="Veículo cadastrado!"
          subTitle="Honda Civic 2022 foi adicionado à sua garagem com sucesso."
          extra={<Button type="primary">Ver garagem</Button>}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com conteúdo extra" description="Resultado com detalhes adicionais.">
      <Demo>
        <Result
          status="success"
          title="Serviço concluído"
          subTitle="Seu Honda Civic 2022 está pronto para retirada."
          extra={[
            <Button type="primary" key="invoice">Ver nota fiscal</Button>,
            <Button key="review">Avaliar serviço</Button>,
          ]}
        >
          <div style={{ padding: '0 24px' }}>
            <Title level={5} style={{ marginBottom: 12 }}>Resumo do serviço</Title>
            {[
              ['Serviço', 'Revisão Geral'],
              ['Oficina', 'Oficina Silva'],
              ['Entrada', '20/03/2026 às 09:00'],
              ['Entrega', '20/03/2026 às 17:30'],
              ['Valor total', 'R$ 299,90'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${G[100]}` }}>
                <Text style={{ color: G[500] }}>{k}</Text>
                <Text strong>{v}</Text>
              </div>
            ))}
          </div>
        </Result>
      </Demo>
    </Section>
  </div>
)

export default ResultShowcase
