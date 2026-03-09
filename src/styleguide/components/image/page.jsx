import { Image, Space, Divider, Typography, Tag } from 'antd'

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

const placeholderSrc = (w, h, label = '', bg = 'EDFCF7', fg = '0E885F') =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label || `${w}x${h}`)}`

const ImageShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Image</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Componente de imagem com preview, lazy loading, fallback e grupo de imagens com navegação.
      </Paragraph>
      <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Exibição de Dados</Tag></Space>
    </div>

    <Section title="Básico" description="Imagem com preview ao clicar.">
      <Demo>
        <Image
          width={200}
          src={placeholderSrc(400, 300, 'Honda Civic')}
          alt="Honda Civic 2022"
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com fallback" description="Imagem alternativa quando a original falha.">
      <Demo>
        <Image
          width={200}
          src="https://url-invalida.com/imagem.jpg"
          fallback={placeholderSrc(400, 300, 'Sem foto', 'F3F4F6', '9CA3AF')}
          alt="Fallback"
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Preview desabilitado" description="preview={false} remove o zoom ao clicar.">
      <Demo>
        <Space>
          <div style={{ textAlign: 'center' }}>
            <Image
              width={150}
              src={placeholderSrc(300, 200, 'Com preview')}
              alt="Com preview"
            />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Com preview</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image
              width={150}
              src={placeholderSrc(300, 200, 'Sem preview', 'E5E7EB', '374151')}
              preview={false}
              alt="Sem preview"
            />
            <Text style={{ fontSize: 11, color: G[400], display: 'block', marginTop: 6 }}>Sem preview</Text>
          </div>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Grupo (Preview.Group)" description="Navegação entre imagens em preview.">
      <Demo label="Fotos do dano no veículo">
        <Image.PreviewGroup>
          <Space wrap>
            {[
              ['Frente', '3DD9A4', '0E885F'],
              ['Lateral esquerda', '1677FF', '0958D9'],
              ['Traseira', 'FAAD14', 'D48806'],
              ['Interior', 'FF4D4F', 'CF1322'],
            ].map(([label, bg, fg]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Image
                  width={120}
                  height={90}
                  src={placeholderSrc(240, 180, label, bg, fg)}
                  alt={label}
                  style={{ objectFit: 'cover', borderRadius: 6 }}
                />
                <Text style={{ fontSize: 11, color: G[500], display: 'block', marginTop: 4 }}>{label}</Text>
              </div>
            ))}
          </Space>
        </Image.PreviewGroup>
      </Demo>
    </Section>

    <Divider />

    <Section title="Placeholder de carregamento" description="placeholder exibe conteúdo enquanto a imagem carrega.">
      <Demo>
        <Image
          width={200}
          src={placeholderSrc(400, 300, 'Foto carregada')}
          placeholder={
            <div style={{
              width: 200, height: 150, background: G[100], borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: G[400], fontSize: 12 }}>Carregando...</Text>
            </div>
          }
        />
      </Demo>
    </Section>
  </div>
)

export default ImageShowcase
