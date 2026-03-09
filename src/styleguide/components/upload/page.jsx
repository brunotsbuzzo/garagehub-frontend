import { useState } from 'react'
import { Upload, Button, Space, Divider, Typography, Tag, message } from 'antd'
import {
  UploadOutlined, InboxOutlined, PlusOutlined, CameraOutlined, FileTextOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Dragger } = Upload

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

const demoFileList = [
  {
    uid: '1',
    name: 'nota-fiscal-revisao.pdf',
    status: 'done',
    size: 84231,
  },
  {
    uid: '2',
    name: 'foto-dano-parachoque.jpg',
    status: 'done',
    size: 1240580,
  },
  {
    uid: '3',
    name: 'laudo-tecnico.pdf',
    status: 'uploading',
    percent: 60,
  },
]

const UploadShowcase = () => {
  const [fileList, setFileList] = useState(demoFileList)

  const uploadProps = {
    beforeUpload: () => false,
    onChange: ({ fileList: newList }) => setFileList(newList),
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>Upload</Title>
        <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
          Componente de envio de arquivos. Suporta drag & drop, preview de imagens, múltiplos arquivos e validação.
        </Paragraph>
        <Space size={8}><Tag color="blue">antd v6</Tag><Tag color="default">Entrada de Dados</Tag></Space>
      </div>

      <Section title="Botão de upload" description="Upload disparado por botão.">
        <Demo>
          <Space wrap>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Enviar arquivo</Button>
            </Upload>
            <Upload {...uploadProps} accept=".pdf">
              <Button icon={<FileTextOutlined />}>Enviar PDF</Button>
            </Upload>
            <Upload {...uploadProps} multiple>
              <Button icon={<UploadOutlined />}>Múltiplos arquivos</Button>
            </Upload>
          </Space>
        </Demo>
      </Section>

      <Divider />

      <Section title="Drag & Drop (Dragger)" description="Área de arraste para envio de arquivos.">
        <Demo>
          <Dragger
            beforeUpload={() => false}
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ maxWidth: 500 }}
          >
            <p style={{ fontSize: 32, color: '#3DD9A4', margin: 0 }}>
              <InboxOutlined />
            </p>
            <p style={{ fontSize: 14, marginTop: 8, fontWeight: 600 }}>
              Clique ou arraste arquivos aqui
            </p>
            <p style={{ fontSize: 12, color: G[500] }}>
              Suporta JPG, PNG, PDF — máx. 10 MB por arquivo
            </p>
          </Dragger>
        </Demo>
      </Section>

      <Divider />

      <Section title="Lista de arquivos com progresso" description="Upload com listagem e estado de progresso.">
        <Demo>
          <Upload
            fileList={fileList}
            onChange={({ fileList: newList }) => setFileList(newList)}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Adicionar arquivo</Button>
          </Upload>
        </Demo>
      </Section>

      <Divider />

      <Section title="Upload de foto (picture-card)" description="Grid de preview de imagens — ideal para fotos de veículos.">
        <Demo label="Fotos do veículo (máx. 4)">
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={4}
            accept="image/*"
            defaultFileList={[
              { uid: 'p1', name: 'frente.jpg', status: 'done', url: 'https://via.placeholder.com/80x80/EDFCF7/0E885F?text=🚗' },
            ]}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8, fontSize: 12 }}>Adicionar foto</div>
            </div>
          </Upload>
        </Demo>
      </Section>

      <Divider />

      <Section title="Upload de avatar" description="Upload circular para foto de perfil.">
        <Demo>
          <Upload
            listType="picture-circle"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            showUploadList={false}
          >
            <div style={{ textAlign: 'center' }}>
              <CameraOutlined style={{ fontSize: 18, color: G[400] }} />
              <div style={{ fontSize: 11, color: G[500], marginTop: 4 }}>Foto</div>
            </div>
          </Upload>
        </Demo>
      </Section>

      <Divider />

      <Section title="Contexto GarageHub — Documentos do veículo" description="Upload de documentos obrigatórios no cadastro.">
        <Demo>
          <Space direction="vertical" style={{ width: '100%', maxWidth: 460 }} size="middle">
            {[
              { label: 'CRLV / Documento do veículo', accept: '.pdf,.jpg,.jpeg,.png' },
              { label: 'CNH do proprietário', accept: '.pdf,.jpg,.jpeg,.png' },
              { label: 'Nota fiscal de compra (opcional)', accept: '.pdf' },
            ].map(doc => (
              <div key={doc.label} style={{
                padding: '12px 16px', background: '#fff',
                border: `1px solid ${G[200]}`, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <Text strong style={{ fontSize: 13, display: 'block' }}>{doc.label}</Text>
                  <Text style={{ fontSize: 11, color: G[400] }}>PDF, JPG ou PNG — máx. 5 MB</Text>
                </div>
                <Upload beforeUpload={() => false} accept={doc.accept} showUploadList={false}>
                  <Button size="small" icon={<UploadOutlined />}>Enviar</Button>
                </Upload>
              </div>
            ))}
          </Space>
        </Demo>
      </Section>
    </div>
  )
}

export default UploadShowcase
