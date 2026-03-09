import { useRef, useState } from 'react'
import { Tour, Button, Space, Divider, Typography, Tag } from 'antd'
import { QuestionCircleOutlined, CarOutlined, CalendarOutlined, ToolOutlined } from '@ant-design/icons'

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

const TourShowcase = () => {
  const [open, setOpen] = useState(false)
  const [openMask, setOpenMask] = useState(false)
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)

  const steps = [
    {
      title: 'Meus Veículos',
      description: 'Visualize e gerencie todos os seus veículos cadastrados. Clique em um veículo para ver o histórico.',
      target: () => ref1.current,
      cover: <div style={{ width: '100%', height: 80, background: 'linear-gradient(135deg, #3DD9A4, #0E885F)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CarOutlined style={{ fontSize: 32, color: '#fff' }} /></div>,
    },
    {
      title: 'Agendar Serviço',
      description: 'Agende manutenções preventivas e corretivas em oficinas parceiras próximas a você.',
      target: () => ref2.current,
    },
    {
      title: 'Histórico de Serviços',
      description: 'Consulte todo o histórico de serviços realizados, com laudos e notas fiscais.',
      target: () => ref3.current,
    },
  ]

  const maskSteps = [
    {
      title: 'Bem-vindo ao GarageHub!',
      description: 'Esta é uma demonstração do Tour com máscara. A área escurecida destaca o elemento-alvo.',
      target: () => ref1.current,
      mask: { style: { boxShadow: 'inset 0 0 15px #3DD9A4' } },
    },
    {
      title: 'Agende com facilidade',
      description: 'Encontre oficinas próximas e agende serviços em poucos cliques.',
      target: () => ref2.current,
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Tour</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Guia interativo de onboarding que destaca elementos da interface com dicas step-by-step.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Tour básico" description="Guia com 3 etapas destacando elementos da tela.">
        <Demo>
          <Space orientation="vertical" style={{ width: '100%' }} size="large">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button ref={ref1} icon={<CarOutlined />} type="primary">
                Meus Veículos
              </Button>
              <Button ref={ref2} icon={<CalendarOutlined />}>
                Agendar Serviço
              </Button>
              <Button ref={ref3} icon={<ToolOutlined />}>
                Histórico
              </Button>
            </div>
            <Button
              type="primary"
              icon={<QuestionCircleOutlined />}
              onClick={() => setOpen(true)}
              style={{ background: '#0E885F', borderColor: '#0E885F' }}
            >
              Iniciar tour guiado
            </Button>
          </Space>
          <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </Demo>
      </Section>

      <Divider />

      <Section title="Com máscara" description="mask=true (padrão) escurece o fundo ao redor do elemento.">
        <Demo>
          <Space>
            <Button onClick={() => setOpenMask(true)} icon={<QuestionCircleOutlined />}>
              Tour com máscara
            </Button>
          </Space>
          <Tour
            open={openMask}
            onClose={() => setOpenMask(false)}
            steps={maskSteps}
            mask
          />
        </Demo>
      </Section>

      <Divider />

      <Section title="Sem máscara (primary)" description="type='primary' usa a cor primária no tour sem máscara.">
        <Demo>
          <Space orientation="vertical" size="middle">
            <Paragraph style={{ color: G[500], fontSize: 13 }}>
              Use <Text code>mask={'{false}'}</Text> para tour não bloqueante — o usuário pode interagir com a página durante o tour.
            </Paragraph>
            <Button onClick={() => setOpen(true)} icon={<QuestionCircleOutlined />}>
              Tour sem máscara (abrir novamente)
            </Button>
            <Tour
              open={open}
              onClose={() => setOpen(false)}
              steps={steps.map(s => ({ ...s, cover: undefined }))}
              mask={false}
              type="primary"
            />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Casos de uso" description="Quando usar Tour no GarageHub.">
        <Demo>
          <Space orientation="vertical" size="middle">
            {[
              { title: 'Onboarding inicial', desc: 'Guia o novo usuário pelas funcionalidades principais na primeira visita.' },
              { title: 'Nova funcionalidade', desc: 'Destaca recursos recém-lançados para usuários existentes.' },
              { title: 'Fluxo complexo', desc: 'Instrui o usuário em processos de múltiplas etapas, como cadastro de veículo.' },
              { title: 'Botão de ajuda', desc: 'Tour iniciado pelo botão ? para usuários que precisam de orientação.' },
            ].map(item => (
              <div key={item.title} style={{
                display: 'flex', gap: 12, padding: '10px 14px',
                background: '#fff', border: `1px solid ${G[200]}`, borderRadius: 8,
              }}>
                <QuestionCircleOutlined style={{ color: '#3DD9A4', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 13 }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: G[500] }}>{item.desc}</Text>
                </div>
              </div>
            ))}
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default TourShowcase
