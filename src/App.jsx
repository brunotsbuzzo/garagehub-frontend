import { ConfigProvider, theme } from 'antd'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import StyleguideLayout from './styleguide/Layout'
import StyleguidePage from './styleguide/page'
import ButtonShowcase from './styleguide/components/button/page'
import FloatButtonShowcase from './styleguide/components/floatbutton/page'
import IconShowcase from './styleguide/components/icon/page'
import TypographyShowcase from './styleguide/components/typography/page'
import DividerShowcase from './styleguide/components/divider/page'
import FormShowcase from './styleguide/components/form/page'
import GridShowcase from './styleguide/components/grid/page'
import Placeholder from './styleguide/components/Placeholder'
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

const componentMap = {
  button:      ButtonShowcase,
  floatbutton: FloatButtonShowcase,
  icon:        IconShowcase,
  typography:  TypographyShowcase,
  divider:     DividerShowcase,
  form:        FormShowcase,
  grid:        GridShowcase,
}

function ComponentPage() {
  const { component } = useParams()
  const Page = componentMap[component?.toLowerCase()]
  return Page ? <Page /> : <Placeholder componentName={component} />
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
          <Route
            path="/styleguide/components/:component"
            element={<StyleguideLayout><ComponentPage /></StyleguideLayout>}
          />
          <Route path="*" element={<Navigate to="/styleguide" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
