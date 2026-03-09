import { useState } from 'react'
import { Switch, Space, Divider, Typography, Tag } from 'antd'
import { CheckOutlined, CloseOutlined, BellOutlined, WifiOutlined } from '@ant-design/icons'

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

const SettingRow = ({ label, description, defaultValue }) => {
  const [val, setVal] = useState(defaultValue)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: `1px solid ${G[100]}`,
    }}>
      <div>
        <Text strong style={{ display: 'block', fontSize: 14 }}>{label}</Text>
        {description && <Text style={{ fontSize: 12, color: G[500] }}>{description}</Text>}
      </div>
      <Switch checked={val} onChange={setVal} />
    </div>
  )
}

const SwitchShowcase = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Switch</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Alternância entre dois estados — ligado/desligado. Ideal para preferências e configurações.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="Switch padrão e com estado controlado.">
        <Demo>
          <Space size="large">
            <Switch defaultChecked />
            <Switch />
            <Switch disabled />
            <Switch disabled defaultChecked />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tamanhos" description="Default e small.">
        <Demo>
          <Space size="large" align="center">
            <div>
              <Switch defaultChecked />
              <Text style={{ fontSize: 12, color: G[400], marginLeft: 8 }}>Default</Text>
            </div>
            <div>
              <Switch size="small" defaultChecked />
              <Text style={{ fontSize: 12, color: G[400], marginLeft: 8 }}>Small</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com texto/ícone interno" description="Adicione labels ou ícones dentro do switch.">
        <Demo>
          <Space size="large">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
            />
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
            <Switch
              checkedChildren="Ativo"
              unCheckedChildren="Inativo"
            />
            <Switch
              checkedChildren={<BellOutlined />}
              unCheckedChildren={<BellOutlined />}
              defaultChecked
            />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Estado de carregamento" description="Switch com loading enquanto processa.">
        <Demo>
          <Space size="large" align="center">
            <Switch loading defaultChecked />
            <Switch loading />
            <div>
              <Switch
                loading={loading}
                defaultChecked
                onChange={() => {
                  setLoading(true)
                  setTimeout(() => setLoading(false), 2000)
                }}
              />
              <Text style={{ fontSize: 12, color: G[500], marginLeft: 8 }}>
                {loading ? 'Salvando...' : 'Clique para simular carregamento'}
              </Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Configurações" description="Painel de preferências com switches.">
        <Demo>
          <div style={{ maxWidth: 480 }}>
            <SettingRow
              label="Notificações por e-mail"
              description="Receba lembretes de agendamentos"
              defaultValue={true}
            />
            <SettingRow
              label="Notificações por WhatsApp"
              description="Alertas de manutenção preventiva"
              defaultValue={true}
            />
            <SettingRow
              label="Localização GPS"
              description="Para encontrar oficinas próximas"
              defaultValue={false}
            />
            <SettingRow
              label="Modo escuro"
              description="Alterna entre tema claro e escuro"
              defaultValue={false}
            />
            <SettingRow
              label="Sincronizar automaticamente"
              description="Sincroniza dados ao abrir o app"
              defaultValue={true}
            />
            <SettingRow
              label="Compartilhar dados de uso"
              description="Ajuda a melhorar o GarageHub"
              defaultValue={false}
            />
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default SwitchShowcase
