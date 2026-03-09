import { Mentions, Space, Divider, Typography, Tag } from 'antd'

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

const users = [
  { value: 'joao.silva', label: 'João Silva' },
  { value: 'maria.santos', label: 'Maria Santos' },
  { value: 'carlos.oficina', label: 'Carlos (Oficina Silva)' },
  { value: 'pedro.mecanico', label: 'Pedro Mecânico' },
  { value: 'ana.gestora', label: 'Ana Gestora' },
]

const serviceHash = [
  { value: 'troca-oleo', label: '#troca-oleo' },
  { value: 'revisao-geral', label: '#revisao-geral' },
  { value: 'alinhamento', label: '#alinhamento' },
  { value: 'urgente', label: '#urgente' },
  { value: 'preventiva', label: '#preventiva' },
]

const MentionsShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Mentions</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Campo de texto com autocomplete para mencionar usuários ou tags. Digite @ para usuários, # para etiquetas.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Mencione usuários com @.">
      <Demo label="Digite @ para mencionar">
        <Mentions
          style={{ width: '100%', maxWidth: 500 }}
          rows={3}
          placeholder="Digite @ para mencionar alguém..."
          options={users}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Múltiplos prefixos" description="Use @ para usuários e # para etiquetas de serviço.">
      <Demo label="Comentário do serviço — use @ para mencionar e # para etiquetar">
        <Mentions
          style={{ width: '100%', maxWidth: 500 }}
          rows={4}
          placeholder="Ex: @pedro.mecanico verificar #troca-oleo urgente..."
          prefix={['@', '#']}
          options={(prefix) => {
            if (prefix === '@') return users
            if (prefix === '#') return serviceHash
            return []
          }}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Posicionamento do popup" description="Controle onde o menu de sugestões aparece.">
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Demo label="Popup acima (top)">
          <Mentions
            style={{ width: '100%', maxWidth: 500 }}
            rows={2}
            placement="top"
            placeholder="Popup aparece acima..."
            options={users}
          />
        </Demo>
      </Space>
    </Section>

    <Divider />

    <Section title="Somente leitura e desabilitado" description="Estados não editáveis.">
      <Demo>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>Somente leitura</Text>
            <Mentions
              readOnly
              value="Solicitação para @carlos.oficina: realizar #troca-oleo e #revisao-geral no Honda Civic"
              style={{ width: '100%', maxWidth: 500 }}
              rows={2}
              options={users}
            />
          </div>
          <div>
            <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 6 }}>Desabilitado</Text>
            <Mentions
              disabled
              value="Comentário bloqueado"
              style={{ width: '100%', maxWidth: 500 }}
              options={users}
            />
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Contexto GarageHub — Chat com mecânico" description="Campo de mensagem interno com menção de responsáveis.">
      <Demo>
        <div style={{ maxWidth: 520 }}>
          <div style={{
            background: '#fff', border: `1px solid ${G[200]}`,
            borderRadius: 8, marginBottom: 12, padding: 16,
          }}>
            {[
              { user: 'Carlos (Oficina Silva)', msg: 'Veículo chegou, iniciando diagnóstico.', time: '09:15' },
              { user: 'João Silva', msg: '@carlos.oficina precisamos do orçamento até o meio-dia.', time: '09:22' },
              { user: 'Pedro Mecânico', msg: 'Problema identificado: #troca-oleo + pastilhas.', time: '09:45' },
            ].map((m, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < 2 ? `1px solid ${G[100]}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text strong style={{ fontSize: 13 }}>{m.user}</Text>
                  <Text style={{ fontSize: 11, color: G[400] }}>{m.time}</Text>
                </div>
                <Text style={{ fontSize: 13, color: G[700] }}>{m.msg}</Text>
              </div>
            ))}
          </div>
          <Mentions
            style={{ width: '100%' }}
            rows={2}
            placeholder="Responder... (@menção ou #etiqueta)"
            prefix={['@', '#']}
            options={(prefix) => {
              if (prefix === '@') return users
              if (prefix === '#') return serviceHash
              return []
            }}
          />
        </div>
      </Demo>
    </Section>
  </div>
)

export default MentionsShowcase
