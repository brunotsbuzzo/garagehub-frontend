import { Spin, Space, Divider, Typography, Tag, Button, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

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

const SpinShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Spin</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Indicador de carregamento circular. Use para estados de loading em componentes e páginas.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Feedback</Tag></Space>
    </div>

    <Section title="Tamanhos" description="small, default e large.">
      <Demo>
        <Space size="large" align="center">
          <div style={{ textAlign: 'center' }}>
            <Spin size="small" />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Small</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Spin size="default" />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Default</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Large</Text>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Sobreposto a conteúdo" description="Spin wrapping um elemento — bloqueia a interação.">
      <Demo>
        <Spin spinning description="Carregando veículos...">
          <div style={{
            padding: 24, background: '#fff', border: `1px solid ${G[200]}`,
            borderRadius: 8, minHeight: 100,
          }}>
            <Text style={{ color: G[500] }}>Conteúdo bloqueado durante o carregamento.</Text>
          </div>
        </Spin>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com texto de dica" description="tip adiciona mensagem abaixo do spinner.">
      <Demo>
        <Space size="large">
          <Spin description="Buscando oficinas..." size="large">
            <div style={{ width: 160, height: 80 }} />
          </Spin>
          <Spin description="Salvando..." size="default">
            <div style={{ width: 120, height: 60 }} />
          </Spin>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Ícone customizado" description="Substitua o spinner padrão por um ícone personalizado.">
      <Demo>
        <Space size="large" align="center">
          <div style={{ textAlign: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3DD9A4' }} spin />} />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>GarageHub Green</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: '#1677FF' }} spin />} size="large" />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Large custom</Text>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Delay" description="delay evita flash do spinner em carregamentos rápidos.">
      <Demo>
        <Alert
          type="info"
          showIcon
          title="Spin com delay={500}"
          description="O spinner só aparece se o carregamento demorar mais de 500ms, evitando flashes indesejados em operações rápidas."
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Loading states" description="Spinners em cenários reais do app.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="large">
          <Spin description="Buscando oficinas próximas..." spinning size="default">
            <div style={{
              padding: 20, background: '#fff', border: `1px solid ${G[200]}`,
              borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Text style={{ color: G[500] }}>Mapa de oficinas será exibido aqui...</Text>
            </div>
          </Spin>

          <Spin description="Processando pagamento..." indicator={<LoadingOutlined style={{ fontSize: 20, color: '#3DD9A4' }} spin />}>
            <div style={{
              padding: 20, background: '#EDFCF7', border: `1px solid #3DD9A4`,
              borderRadius: 8,
            }}>
              <Text style={{ color: '#0E885F' }}>Aguarde enquanto confirmamos o pagamento...</Text>
            </div>
          </Spin>
        </Space>
      </Demo>
    </Section>
  </div>
)

export default SpinShowcase
