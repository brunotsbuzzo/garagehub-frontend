import { useState } from 'react'
import { Input, Space, Divider, Typography, Tag } from 'antd'
import {
  SearchOutlined, UserOutlined, LockOutlined, CarOutlined,
  EyeInvisibleOutlined, EyeTwoTone, PhoneOutlined, MailOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Search, Password, TextArea } = Input

const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 56 }}>
    <div style={{ marginBottom: 20 }}>
      <Title level={4} style={{ margin: 0, color: G[800] }}>{title}</Title>
      {description && (
        <Paragraph style={{ margin: '6px 0 0', color: G[500], fontSize: 13 }}>
          {description}
        </Paragraph>
      )}
    </div>
    {children}
  </section>
)

const Demo = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 8 }}>{label}</Text>}
    <div style={{
      background: G[50], border: `1px solid ${G[200]}`,
      borderRadius: 8, padding: '24px',
    }}>
      {children}
    </div>
  </div>
)

const InputShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Input</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Campo de texto para entrada de dados. Inclui variantes Search, Password e TextArea.
      </Paragraph>
      <Space size={8}>
        <Tag color="blue">antd v6</Tag>
        <Tag color="default">Entrada de Dados</Tag>
      </Space>
    </div>

    <Section title="Básico" description="Input de texto simples.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Input placeholder="Nome completo" style={{ maxWidth: 360 }} />
          <Input placeholder="Placa do veículo (ex: ABC-1234)" style={{ maxWidth: 360 }} />
          <Input placeholder="Quilometragem atual" style={{ maxWidth: 360 }} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="Small, Middle (padrão) e Large.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Input size="small" placeholder="Small — 24px" style={{ maxWidth: 300 }} />
          <Input size="middle" placeholder="Middle — 32px (padrão)" style={{ maxWidth: 300 }} />
          <Input size="large" placeholder="Large — 40px" style={{ maxWidth: 300 }} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com prefixo e sufixo" description="Adicione ícones ou texto antes/depois do input.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Input prefix={<UserOutlined style={{ color: G[400] }} />} placeholder="Usuário" style={{ maxWidth: 320 }} />
          <Input prefix={<MailOutlined style={{ color: G[400] }} />} placeholder="E-mail" style={{ maxWidth: 320 }} />
          <Input prefix={<PhoneOutlined style={{ color: G[400] }} />} placeholder="Telefone" style={{ maxWidth: 320 }} />
          <Input prefix={<CarOutlined style={{ color: '#3DD9A4' }} />} suffix="km" placeholder="Quilometragem" style={{ maxWidth: 320 }} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Antes e depois (adornments)" description="Use Space.Compact para combinar Input com outros elementos.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Space.Compact style={{ maxWidth: 380 }}>
            <span className="ant-input-group-addon" style={{ display:'flex', alignItems:'center', padding:'0 11px', background:G[100], border:`1px solid ${G[200]}`, borderRadius:'6px 0 0 6px', fontSize:14 }}>https://</span>
            <Input placeholder="oficina.com.br" />
          </Space.Compact>
          <Space.Compact style={{ maxWidth: 320 }}>
            <span className="ant-input-group-addon" style={{ display:'flex', alignItems:'center', padding:'0 11px', background:G[100], border:`1px solid ${G[200]}`, borderRadius:'6px 0 0 6px', fontSize:14 }}>+55</span>
            <Input placeholder="(11) 99999-9999" />
          </Space.Compact>
          <Space.Compact style={{ maxWidth: 300 }}>
            <Input placeholder="Velocidade máxima" />
            <span className="ant-input-group-addon" style={{ display:'flex', alignItems:'center', padding:'0 11px', background:G[100], border:`1px solid ${G[200]}`, borderRadius:'0 6px 6px 0', fontSize:14 }}>km/h</span>
          </Space.Compact>
          <Space.Compact style={{ maxWidth: 280 }}>
            <span className="ant-input-group-addon" style={{ display:'flex', alignItems:'center', padding:'0 11px', background:G[100], border:`1px solid ${G[200]}`, borderRadius:'6px 0 0 6px', fontSize:14 }}>R$</span>
            <Input placeholder="Valor do serviço" />
            <span className="ant-input-group-addon" style={{ display:'flex', alignItems:'center', padding:'0 11px', background:G[100], border:`1px solid ${G[200]}`, borderRadius:'0 6px 6px 0', fontSize:14 }}>,00</span>
          </Space.Compact>
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Password" description="Campo com toggle de visibilidade.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Password
            prefix={<LockOutlined style={{ color: G[400] }} />}
            placeholder="Senha"
            style={{ maxWidth: 320 }}
          />
          <Password
            prefix={<LockOutlined style={{ color: G[400] }} />}
            placeholder="Confirmar senha"
            iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            style={{ maxWidth: 320 }}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Search" description="Input com botão de busca integrado.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Search placeholder="Buscar veículo..." style={{ maxWidth: 380 }} />
          <Search
            placeholder="Buscar oficina..."
            enterButton="Buscar"
            size="large"
            style={{ maxWidth: 440 }}
          />
          <Search
            placeholder="Buscar serviços..."
            enterButton={<SearchOutlined />}
            loading={false}
            style={{ maxWidth: 380 }}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="TextArea" description="Área de texto para entrada de conteúdo longo.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <TextArea
            placeholder="Descreva o problema do seu veículo..."
            rows={4}
            style={{ maxWidth: 500 }}
          />
          <TextArea
            placeholder="Observações adicionais para a oficina..."
            showCount
            maxLength={300}
            rows={3}
            style={{ maxWidth: 500 }}
          />
          <TextArea
            placeholder="Auto-resize conforme conteúdo"
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ maxWidth: 500 }}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Estados" description="Padrão, foco, erro, aviso e desabilitado.">
      <Demo>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Input placeholder="Padrão" style={{ maxWidth: 300 }} />
          <Input status="error" placeholder="Placa inválida" style={{ maxWidth: 300 }} />
          <Input status="warning" placeholder="Campo incompleto" style={{ maxWidth: 300 }} />
          <Input disabled value="Desabilitado" style={{ maxWidth: 300 }} />
          <Input readOnly value="Somente leitura — Honda Civic 2022" style={{ maxWidth: 300 }} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="allowClear" description="Botão para limpar o conteúdo do campo.">
      <Demo>
        <Space orientation="vertical" size="middle">
          <Input allowClear placeholder="Digite e limpe o campo" style={{ maxWidth: 300 }} />
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: G[400] }} />}
            placeholder="Buscar componente..."
            style={{ maxWidth: 300 }}
          />
        </Space>
      </Demo>
    </Section>
  </div>
)

export default InputShowcase
