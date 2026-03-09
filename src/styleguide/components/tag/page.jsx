import { useState } from 'react'
import { Tag, Space, Divider, Typography, Input, Tooltip } from 'antd'
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, ClockCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

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

const TagShowcase = () => {
  const [tags, setTags] = useState(['Honda Civic', 'Revisão', 'IPVA Pago'])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClose = (tag) => setTags(tags.filter(t => t !== tag))

  const handleConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Tag</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Rótulos categorizados para classificar e filtrar conteúdo. Suporta fechamento, cores e ícones.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Tag simples e com fechamento.">
        <Demo>
          <Space wrap>
            <Tag>Honda Civic</Tag>
            <Tag closable>Revisão</Tag>
            <Tag closable color="green">Ativo</Tag>
            <Tag>Moto</Tag>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Cores predefinidas" description="Paleta semântica e de cores do antd.">
        <Demo label="Semânticas">
          <Space wrap>
            <Tag color="success">Concluído</Tag>
            <Tag color="processing">Em andamento</Tag>
            <Tag color="warning">Pendente</Tag>
            <Tag color="error">Cancelado</Tag>
            <Tag color="default">Padrão</Tag>
          </Space>
        </Demo>
        <Demo label="Cores antd">
          <Space wrap>
            {['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple'].map(c => (
              <Tag key={c} color={c}>{c}</Tag>
            ))}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Cores personalizadas" description="Use qualquer cor HEX/RGB.">
        <Demo>
          <Space wrap>
            <Tag color="#3DD9A4">Mint Green</Tag>
            <Tag color="#0E885F">Dark Green</Tag>
            <Tag color="#EDFCF7" style={{ color: '#0E885F', border: '1px solid #3DD9A4' }}>Outline</Tag>
            <Tag color="#1F2937">Dark</Tag>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com ícones" description="Combinação de ícone e texto.">
        <Demo>
          <Space wrap>
            <Tag icon={<CheckCircleOutlined />} color="success">Aprovado</Tag>
            <Tag icon={<SyncOutlined spin />} color="processing">Processando</Tag>
            <Tag icon={<ClockCircleOutlined />} color="warning">Aguardando</Tag>
            <Tag icon={<CloseCircleOutlined />} color="error">Recusado</Tag>
            <Tag icon={<MinusCircleOutlined />} color="default">Inativo</Tag>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tags editáveis (add/remove)" description="Adicione e remova tags dinamicamente.">
        <Demo label="Etiquetas do veículo">
          <Space wrap>
            {tags.map(tag => (
              <Tag
                key={tag}
                closable
                onClose={() => handleClose(tag)}
                style={{ fontSize: 13 }}
              >
                {tag.length > 14 ? (
                  <Tooltip title={tag}>{tag.slice(0, 14)}…</Tooltip>
                ) : tag}
              </Tag>
            ))}
            {inputVisible ? (
              <Input
                size="small"
                style={{ width: 120 }}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={handleConfirm}
                onPressEnter={handleConfirm}
                autoFocus
              />
            ) : (
              <Tag
                onClick={() => setInputVisible(true)}
                style={{ cursor: 'pointer', borderStyle: 'dashed', background: '#fff' }}
              >
                <PlusOutlined /> Nova etiqueta
              </Tag>
            )}
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Status de serviço" description="Tags de status em lista de serviços.">
        <Demo>
          <Space orientation="vertical" style={{ width: '100%' }} size="small">
            {[
              { service: 'Revisão Geral — Honda Civic 2022', status: 'Concluído', color: 'success' },
              { service: 'Troca de Óleo — Toyota Corolla', status: 'Em andamento', color: 'processing', icon: <SyncOutlined spin /> },
              { service: 'Alinhamento — Ford Ka', status: 'Aguardando aprovação', color: 'warning', icon: <ClockCircleOutlined /> },
              { service: 'Freios — Volkswagen Gol', status: 'Cancelado', color: 'error', icon: <CloseCircleOutlined /> },
            ].map(s => (
              <div key={s.service} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px', background: '#fff',
                border: `1px solid ${G[200]}`, borderRadius: 8,
              }}>
                <Text style={{ fontSize: 13 }}>{s.service}</Text>
                <Tag icon={s.icon} color={s.color}>{s.status}</Tag>
              </div>
            ))}
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default TagShowcase
