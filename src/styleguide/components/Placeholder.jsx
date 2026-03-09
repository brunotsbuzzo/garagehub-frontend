import { Typography, Tag, Space } from 'antd'
import { AppstoreOutlined, ToolOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

function Placeholder({ componentName = 'Componente' }) {
  const display = componentName.charAt(0).toUpperCase() + componentName.slice(1)

  return (
    <div>
      <Space align="center" size={12} style={{ marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8,
          background: '#EDFCF7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <AppstoreOutlined style={{ color: '#3DD9A4', fontSize: 20 }} />
        </div>
        <div>
          <Title level={3} style={{ margin: 0 }}>{display}</Title>
          <Text type="secondary" style={{ fontSize: 13 }}>Ant Design · GarageHub Design System</Text>
        </div>
      </Space>

      <Tag color="processing" icon={<ToolOutlined />} style={{ marginBottom: 32 }}>
        Em desenvolvimento
      </Tag>

      <div style={{
        border: '2px dashed #E5E7EB',
        borderRadius: 12,
        padding: '64px 40px',
        textAlign: 'center',
        background: '#FAFAFA',
      }}>
        <AppstoreOutlined style={{ fontSize: 48, color: '#D1D5DB', marginBottom: 16, display: 'block' }} />
        <Title level={4} style={{ color: '#9CA3AF', marginBottom: 8 }}>
          Página em desenvolvimento
        </Title>
        <Paragraph style={{ color: '#9CA3AF', maxWidth: 420, margin: '0 auto' }}>
          A documentação e exemplos do componente{' '}
          <Text strong style={{ color: '#6B7280' }}>{display}</Text>{' '}
          estão sendo preparados. Em breve esta página estará disponível com
          exemplos interativos e documentação completa.
        </Paragraph>
      </div>
    </div>
  )
}

export default Placeholder
