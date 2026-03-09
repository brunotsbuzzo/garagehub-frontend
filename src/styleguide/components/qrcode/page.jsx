import { QRCode, Space, Divider, Typography, Tag, Segmented, Button } from 'antd'
import { useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons'

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

const QRCodeShowcase = () => {
  const [errorLevel, setErrorLevel] = useState('M')

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>QRCode</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Geração de QR Code a partir de uma URL ou texto. Suporta logo, cores e nível de correção de erros.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
      </div>

      <Section title="Básico" description="QR Code simples com URL.">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br" />
              <Text style={{ fontSize: 12, color: G[500], display: 'block', marginTop: 8 }}>garagehub.com.br</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Tipo SVG e Canvas" description="type='svg' ou 'canvas' (padrão).">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br/app" type="canvas" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Canvas</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br/app" type="svg" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>SVG</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Cores personalizadas" description="color (foreground) e bgColor (background).">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br" color="#0E885F" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Dark Green</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br" color="#3DD9A4" bgColor="#1F2937" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Dark bg</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <QRCode value="https://garagehub.com.br" color="#1677FF" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Blue</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Com logo" description="Insira um logo no centro do QR Code.">
        <Demo label="QR Code do GarageHub com logo">
          <Space>
            <QRCode
              value="https://garagehub.com.br"
              color="#0E885F"
              size={160}
              icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSIjM0REOUEiLz48dGV4dCB4PSI1IiB5PSIyMiIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiPkc8L3RleHQ+PC9zdmc+"
              iconSize={32}
            />
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Nível de correção de erros" description="L, M, Q, H — quanto maior, mais robusto e mais denso.">
        <Demo>
          <Space direction="vertical" size="middle">
            <Segmented
              options={['L', 'M', 'Q', 'H']}
              value={errorLevel}
              onChange={setErrorLevel}
            />
            <Space size="large">
              <div style={{ textAlign: 'center' }}>
                <QRCode value="https://garagehub.com.br/agendamento/ABC-1234" errorLevel={errorLevel} color="#0E885F" />
                <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Nível: {errorLevel}</Text>
              </div>
            </Space>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Estados" description="Loading e Expired.">
        <Demo>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <QRCode value="loading" status="loading" />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Loading</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <QRCode
                value="expired"
                status="expired"
                onRefresh={() => {}}
              />
              <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 8 }}>Expired</Text>
            </div>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Check-in de serviço" description="QR Code para check-in rápido na oficina.">
        <Demo>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <QRCode
              value="https://garagehub.com.br/checkin/SRV-2026-0148"
              color="#0E885F"
              size={140}
            />
            <div>
              <Text strong style={{ display: 'block', fontSize: 15, marginBottom: 6 }}>Check-in do Serviço</Text>
              <Text style={{ fontSize: 13, color: G[500], display: 'block', marginBottom: 4 }}>ID: SRV-2026-0148</Text>
              <Text style={{ fontSize: 13, color: G[500], display: 'block', marginBottom: 4 }}>Revisão Geral — Honda Civic</Text>
              <Text style={{ fontSize: 13, color: G[500], display: 'block', marginBottom: 16 }}>Oficina Silva · 20/03/2026</Text>
              <Text style={{ fontSize: 12, color: G[400] }}>
                Apresente este QR Code na recepção da oficina para realizar o check-in automaticamente.
              </Text>
            </div>
          </div>
        </Demo>
      </Section>
    </div>
  )
}

export default QRCodeShowcase
