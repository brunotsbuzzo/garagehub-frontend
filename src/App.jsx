import { ConfigProvider, theme } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StyleguideLayout from './styleguide/Layout'
import StyleguidePage from './styleguide/page'
import FormShowcase from './styleguide/components/form/page'
import './index.css'

const designTokens = {
  colorPrimary: '#3DD9A4',
  colorSuccess: '#52C41A',
  colorWarning: '#FAAD14',
  colorError: '#FF4D4F',
  colorInfo: '#1677FF',
  colorBgLayout: '#F5FAF7',
  colorBgContainer: '#FFFFFF',
  colorBorder: '#E5E7EB',
  colorTextBase: '#1F2937',
  colorTextSecondary: '#6B7280',
  borderRadius: 8,
  borderRadiusLG: 12,
  borderRadiusSM: 4,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: 14,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  lineHeight: 1.5714,
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -2px rgba(0,0,0,.05)',
  boxShadowSecondary: '0 1px 2px 0 rgba(0,0,0,.05)',
}

function App() {
  return (
    <ConfigProvider
      theme={{
        token: designTokens,
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/styleguide" element={<StyleguideLayout><StyleguidePage /></StyleguideLayout>} />
          <Route path="/styleguide/components/form" element={<StyleguideLayout><FormShowcase /></StyleguideLayout>} />
          <Route path="*" element={<Navigate to="/styleguide" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
