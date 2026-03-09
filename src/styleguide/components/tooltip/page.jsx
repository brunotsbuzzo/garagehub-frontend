import { Tooltip, Button, Space, Divider, Typography, Tag } from 'antd'
import { QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

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

const placements = [
  'topLeft', 'top', 'topRight',
  'leftTop', 'left', 'leftBottom',
  'rightTop', 'right', 'rightBottom',
  'bottomLeft', 'bottom', 'bottomRight',
]

const TooltipShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Tooltip</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Dica flutuante exibida ao passar o mouse. Fornece contexto adicional sem poluir a interface.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Tooltip simples com texto.">
      <Demo>
        <Space wrap>
          <Tooltip title="Agendar manutenção preventiva do veículo">
            <Button>Agendar serviço</Button>
          </Tooltip>
          <Tooltip title="Visualizar histórico completo de manutenções">
            <Button type="primary">Ver histórico</Button>
          </Tooltip>
          <Tooltip title="Esta ação não pode ser desfeita">
            <Button danger>Remover veículo</Button>
          </Tooltip>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Posicionamentos" description="12 posições disponíveis ao redor do elemento alvo.">
      <Demo>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8, maxWidth: 500,
        }}>
          {placements.map(p => (
            <Tooltip key={p} title={`Posição: ${p}`} placement={p}>
              <Button size="small" style={{ width: '100%' }}>{p}</Button>
            </Tooltip>
          ))}
        </div>
      </Demo>
    </Section>

    <Divider />

    <Section title="Conteúdo customizado" description="HTML e componentes React no conteúdo do tooltip.">
      <Demo>
        <Space wrap>
          <Tooltip
            title={
              <div>
                <Text style={{ color: '#fff', fontWeight: 600, display: 'block' }}>Honda Civic 2022</Text>
                <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Placa: ABC-1234</Text>
                <br />
                <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>45.230 km · Último serviço: mar/2025</Text>
              </div>
            }
          >
            <Button>Ver detalhes do veículo</Button>
          </Tooltip>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Cor personalizada" description="Tooltip com background colorido.">
      <Demo>
        <Space wrap>
          <Tooltip title="GarageHub Green" color="#3DD9A4">
            <Button>Verde GarageHub</Button>
          </Tooltip>
          <Tooltip title="Atenção requerida" color="#FAAD14">
            <Button>Aviso</Button>
          </Tooltip>
          <Tooltip title="Erro crítico!" color="#FF4D4F">
            <Button danger>Erro</Button>
          </Tooltip>
          <Tooltip title="Informação" color="#1677FF">
            <Button type="link">Info</Button>
          </Tooltip>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Trigger customizado" description="Escolha o evento que dispara o tooltip.">
      <Demo>
        <Space wrap>
          <Tooltip title="Aparece no hover (padrão)" trigger="hover">
            <Button>Hover</Button>
          </Tooltip>
          <Tooltip title="Aparece ao focar (Tab)" trigger="focus">
            <Button>Focus</Button>
          </Tooltip>
          <Tooltip title="Aparece ao clicar" trigger="click">
            <Button>Click</Button>
          </Tooltip>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Labels de ajuda" description="Tooltips em campos de formulário.">
      <Demo>
        <Space orientation="vertical" size="middle">
          {[
            {
              label: 'Quilometragem atual',
              help: 'Informe a quilometragem atual do hodômetro. Isso nos ajuda a recomendar serviços preventivos.',
            },
            {
              label: 'Placa do veículo',
              help: 'Formato brasileiro: ABC-1234 (Mercosul: ABC1D23). A placa é usada para identificar o veículo no sistema.',
            },
            {
              label: 'Data de aquisição',
              help: 'Data em que você adquiriu o veículo. Usada para calcular garantias e intervalos de manutenção.',
            },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Text strong style={{ fontSize: 13 }}>{f.label}</Text>
              <Tooltip title={f.help} placement="right">
                <QuestionCircleOutlined style={{ color: G[400], cursor: 'pointer' }} />
              </Tooltip>
            </div>
          ))}
        </Space>
      </Demo>
    </Section>
  </div>
)

export default TooltipShowcase
