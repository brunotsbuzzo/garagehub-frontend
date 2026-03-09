import { useState } from 'react'
import {
  Form, Input, InputNumber, Select, DatePicker, TimePicker,
  Checkbox, Radio, Switch, Button, Space, Divider,
  Tag, Typography, Row, Col, Card, Alert, Segmented,
  Slider, Rate, Upload, AutoComplete, Mentions,
  ColorPicker, TreeSelect, Cascader, Transfer,
} from 'antd'
import {
  UserOutlined, MailOutlined, LockOutlined,
  PhoneOutlined, CarOutlined, ToolOutlined,
  UploadOutlined, InboxOutlined,
} from '@ant-design/icons'


const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

const VARIANT_MAP = {
  default:    'outlined',
  filled:     'filled',
  borderless: 'borderless',
}

/* ── Helpers ───────────────────────────────────────────────── */
const Section = ({ title, description, children }) => (
  <div style={{ marginBottom: 48 }}>
    <Title level={3} style={{ marginBottom: 4, paddingBottom: 12, borderBottom: '2px solid #F3F4F6' }}>
      {title}
    </Title>
    {description && <Paragraph style={{ color: '#6B7280', marginBottom: 24 }}>{description}</Paragraph>}
    {!description && <div style={{ marginBottom: 24 }} />}
    {children}
  </div>
)

const FieldGroup = ({ label, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
    }}>
      <Text style={{
        fontSize: 10, fontWeight: 700, color: '#9CA3AF',
        textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>{label}</Text>
      <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
    </div>
    {children}
  </div>
)

const CodeBlock = ({ code }) => (
  <pre style={{
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    padding: '16px 20px',
    fontSize: 12,
    lineHeight: 1.7,
    overflowX: 'auto',
    color: '#374151',
    marginTop: 16,
  }}>
    <code>{code}</code>
  </pre>
)

/* ── Showcase ──────────────────────────────────────────────── */
export default function FormShowcase() {
  const [basicForm]     = Form.useForm()
  const [vehicleForm]   = Form.useForm()
  const [layout, setLayout] = useState('vertical')
  const [variant, setVariant] = useState('default')
  const [submitResult, setSubmitResult] = useState(null)

  const handleVehicleSubmit = (values) => setSubmitResult(values)
  const handleVehicleReset  = () => { vehicleForm.resetFields(); setSubmitResult(null) }

  return (
    <div>
      {/* ── Cabeçalho ─────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Tag color="blue">Ant Design</Tag>
          <Tag color="green">Form</Tag>
        </div>
        <Title level={1} style={{ margin: 0 }}>Form</Title>
        <Text style={{ color: '#6B7280', fontSize: 16 }}>
          Coleta de dados com validação, múltiplos layouts e integração com os tokens do projeto.
        </Text>
      </div>

      {/* ── 1. Layouts ────────────────────────────────────── */}
      <Section
        title="Layouts"
        description="O Form suporta três layouts: vertical (padrão), horizontal e inline."
      >
        <div style={{ marginBottom: 16 }}>
          <Segmented
            value={layout}
            onChange={setLayout}
            options={[
              { label: 'Vertical', value: 'vertical' },
              { label: 'Horizontal', value: 'horizontal' },
              { label: 'Inline', value: 'inline' },
            ]}
          />
        </div>

        <Card style={{ maxWidth: 560 }}>
          <Form
            form={basicForm}
            layout={layout}
            requiredMark="optional"
            labelCol={layout === 'horizontal' ? { span: 6 } : undefined}
            wrapperCol={layout === 'horizontal' ? { span: 18 } : undefined}
          >
            <Form.Item label="Nome completo" name="name">
              <Input prefix={<UserOutlined />} placeholder="Ex: João Silva" />
            </Form.Item>
            <Form.Item label="E-mail" name="email">
              <Input prefix={<MailOutlined />} placeholder="joao@email.com" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Salvar</Button>
            </Form.Item>
          </Form>
        </Card>

        <CodeBlock code={`<Form layout="${layout}">
  <Form.Item label="Nome completo" name="name">
    <Input prefix={<UserOutlined />} placeholder="Ex: João Silva" />
  </Form.Item>
  <Form.Item label="E-mail" name="email">
    <Input prefix={<MailOutlined />} placeholder="joao@email.com" />
  </Form.Item>
</Form>`} />
      </Section>

      <Divider />

      {/* ── 2. Variantes de campo ─────────────────────────── */}
      <Section
        title="Variantes de Campo"
        description="Três estilos visuais para os campos do formulário."
      >
        <div style={{ marginBottom: 16 }}>
          <Segmented
            value={variant}
            onChange={setVariant}
            options={[
              { label: 'Default (outlined)', value: 'default' },
              { label: 'Filled', value: 'filled' },
              { label: 'Borderless', value: 'borderless' },
            ]}
          />
        </div>

        <Card style={{ maxWidth: 400 }}>
          <Form variant={VARIANT_MAP[variant] ?? 'outlined'} requiredMark="optional">
            <Form.Item label="Placa do veículo" name="plate">
              <Input prefix={<CarOutlined />} placeholder="ABC-1234" />
            </Form.Item>
            <Form.Item label="Tipo de serviço" name="service">
              <Select placeholder="Selecione o serviço">
                <Option value="oil">Troca de óleo</Option>
                <Option value="alignment">Alinhamento</Option>
                <Option value="revision">Revisão geral</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </Section>

      <Divider />

      {/* ── 3. Validação ──────────────────────────────────── */}
      <Section
        title="Validação"
        description="Regras nativas, regex e validadores assíncronos personalizados."
      >
        <Card style={{ maxWidth: 560 }}>
          <Form
            name="validation-demo"
            onFinish={(v) => alert(JSON.stringify(v, null, 2))}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'E-mail obrigatório' },
                { type: 'email', message: 'Formato de e-mail inválido' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="usuario@exemplo.com" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                { required: true, message: 'Senha obrigatória' },
                { min: 8, message: 'Mínimo de 8 caracteres' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mínimo 8 caracteres" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="phone"
              rules={[
                { pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/, message: 'Formato: (11) 99999-9999' },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="(11) 99999-9999" />
            </Form.Item>

            <Form.Item
              label="Aceite os termos"
              name="terms"
              valuePropName="checked"
              rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject('Aceite os termos para continuar') }]}
            >
              <Checkbox>Li e aceito os <a href="#">termos de uso</a></Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Validar</Button>
            </Form.Item>
          </Form>
        </Card>

        <CodeBlock code={`<Form.Item
  label="E-mail"
  name="email"
  rules={[
    { required: true, message: 'E-mail obrigatório' },
    { type: 'email',  message: 'Formato de e-mail inválido' },
  ]}
>
  <Input />
</Form.Item>`} />
      </Section>

      <Divider />

      {/* ── 4. Todos os campos ────────────────────────────── */}
      <Section
        title="Tipos de Campo"
        description="Todos os 17 componentes Data Entry do Ant Design compatíveis com Form."
      >
        <Form name="all-fields" requiredMark="optional" initialValues={{ sliderRange: [20, 80] }}>

          {/* ── Texto ──────────────────────────────────────── */}
          <FieldGroup label="Texto">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Input" name="text">
                  <Input placeholder="Texto livre" prefix={<UserOutlined />} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Password" name="password">
                  <Input.Password placeholder="Senha" prefix={<LockOutlined />} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Search" name="search">
                  <Input.Search placeholder="Buscar..." enterButton />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="TextArea" name="textarea">
                  <TextArea rows={3} placeholder="Descrição detalhada..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="OTP" name="otp">
                  <Input.OTP length={6} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="AutoComplete" name="autocomplete">
                  <AutoComplete
                    style={{ width: '100%' }}
                    options={[
                      { value: 'Honda Civic' },
                      { value: 'Honda Fit' },
                      { value: 'Toyota Corolla' },
                      { value: 'Toyota Hilux' },
                      { value: 'Volkswagen Gol' },
                    ]}
                    placeholder="Digite para sugestões..."
                    filterOption={(input, opt) =>
                      opt.value.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Mentions (@)" name="mentions">
                  <Mentions
                    placeholder="Digite @ para mencionar..."
                    options={[
                      { value: 'joao', label: 'João Silva' },
                      { value: 'maria', label: 'Maria Souza' },
                      { value: 'carlos', label: 'Carlos Oliveira' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { Input, AutoComplete, Mentions } from 'antd'

// Input — texto livre
<Form.Item label="Nome" name="name">
  <Input placeholder="Ex: João Silva" prefix={<UserOutlined />} />
</Form.Item>

// Input.Password — oculta o conteúdo
<Form.Item label="Senha" name="password">
  <Input.Password placeholder="Mínimo 8 caracteres" />
</Form.Item>

// Input.Search — com botão de busca integrado
<Form.Item label="Busca" name="search">
  <Input.Search placeholder="Buscar..." enterButton onSearch={(v) => console.log(v)} />
</Form.Item>

// Input.TextArea — múltiplas linhas
<Form.Item label="Observações" name="notes">
  <Input.TextArea rows={4} placeholder="Descrição detalhada..." />
</Form.Item>

// Input.OTP — código de verificação
<Form.Item label="Código OTP" name="otp">
  <Input.OTP length={6} />
</Form.Item>

// AutoComplete — sugestões enquanto digita
<Form.Item label="Modelo do veículo" name="model">
  <AutoComplete
    options={[{ value: 'Honda Civic' }, { value: 'Toyota Corolla' }]}
    placeholder="Digite para sugestões..."
    filterOption={(input, opt) => opt.value.toLowerCase().includes(input.toLowerCase())}
  />
</Form.Item>

// Mentions — menções com @
<Form.Item label="Comentário" name="comment">
  <Mentions
    placeholder="Digite @ para mencionar alguém..."
    options={[{ value: 'joao', label: 'João Silva' }]}
  />
</Form.Item>`} />
          </FieldGroup>

          {/* ── Numérico ───────────────────────────────────── */}
          <FieldGroup label="Numérico">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item label="InputNumber" name="number">
                  <InputNumber style={{ width: '100%' }} min={0} max={999999} placeholder="0" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Slider (simples)" name="slider">
                  <Slider min={0} max={100} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Slider (range)" name="sliderRange">
                  <Slider range min={0} max={100} />
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { InputNumber, Slider } from 'antd'

// InputNumber — número com controles +/−
<Form.Item label="Quilometragem" name="mileage">
  <InputNumber style={{ width: '100%' }} min={0} max={999999} suffix="km" />
</Form.Item>

// Slider — valor único arrastável
<Form.Item label="Desconto (%)" name="discount">
  <Slider min={0} max={100} marks={{ 0: '0%', 50: '50%', 100: '100%' }} />
</Form.Item>

// Slider range — intervalo entre dois valores
<Form.Item label="Faixa de preço (R$)" name="priceRange">
  <Slider range min={0} max={10000} step={100} defaultValue={[500, 3000]} />
</Form.Item>`} />
          </FieldGroup>

          {/* ── Seleção ────────────────────────────────────── */}
          <FieldGroup label="Seleção">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Select (simples)" name="select">
                  <Select placeholder="Selecione">
                    <Option value="car">Carro</Option>
                    <Option value="bike">Moto</Option>
                    <Option value="truck">Caminhão</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Select (múltiplo)" name="selectMulti">
                  <Select mode="multiple" placeholder="Selecione vários">
                    <Option value="oil">Troca de óleo</Option>
                    <Option value="align">Alinhamento</Option>
                    <Option value="brakes">Freios</Option>
                    <Option value="ac">Ar condicionado</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Select (tags)" name="selectTags">
                  <Select mode="tags" placeholder="Digite e pressione Enter" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="TreeSelect" name="treeSelect">
                  <TreeSelect
                    style={{ width: '100%' }}
                    placeholder="Selecione na árvore"
                    treeData={[
                      {
                        title: 'Motor',
                        value: 'motor',
                        children: [
                          { title: 'Óleo do motor', value: 'motor-oil' },
                          { title: 'Filtro de ar', value: 'motor-air' },
                        ],
                      },
                      {
                        title: 'Suspensão',
                        value: 'suspension',
                        children: [
                          { title: 'Amortecedor', value: 'suspension-shock' },
                          { title: 'Mola', value: 'suspension-spring' },
                        ],
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Cascader" name="cascader">
                  <Cascader
                    style={{ width: '100%' }}
                    placeholder="Categoria → Subcategoria"
                    options={[
                      {
                        value: 'preventive',
                        label: 'Preventiva',
                        children: [
                          { value: 'oil_change', label: 'Troca de óleo' },
                          { value: 'revision', label: 'Revisão geral' },
                        ],
                      },
                      {
                        value: 'corrective',
                        label: 'Corretiva',
                        children: [
                          { value: 'brakes', label: 'Freios' },
                          { value: 'engine', label: 'Motor' },
                        ],
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { Select, TreeSelect, Cascader } from 'antd'

// Select simples — uma opção
<Form.Item label="Tipo de veículo" name="vehicleType">
  <Select placeholder="Selecione">
    <Select.Option value="car">Carro</Select.Option>
    <Select.Option value="bike">Moto</Select.Option>
    <Select.Option value="truck">Caminhão</Select.Option>
  </Select>
</Form.Item>

// Select múltiplo — várias opções
<Form.Item label="Serviços" name="services">
  <Select mode="multiple" placeholder="Selecione os serviços">
    <Select.Option value="oil">Troca de óleo</Select.Option>
    <Select.Option value="brakes">Freios</Select.Option>
  </Select>
</Form.Item>

// Select tags — digita e adiciona itens livres
<Form.Item label="Etiquetas" name="tags">
  <Select mode="tags" placeholder="Digite e pressione Enter" />
</Form.Item>

// TreeSelect — seleção em estrutura de árvore
<Form.Item label="Peça" name="part">
  <TreeSelect
    placeholder="Selecione na árvore"
    treeData={[
      { title: 'Motor', value: 'motor', children: [
          { title: 'Filtro de ar', value: 'motor-air' },
      ]},
    ]}
  />
</Form.Item>

// Cascader — seleção em cascata (categoria → subcategoria)
<Form.Item label="Tipo de serviço" name="serviceCategory">
  <Cascader
    placeholder="Categoria → Subcategoria"
    options={[
      { value: 'preventive', label: 'Preventiva', children: [
          { value: 'oil_change', label: 'Troca de óleo' },
      ]},
    ]}
  />
</Form.Item>`} />
          </FieldGroup>

          {/* ── Data e Hora ────────────────────────────────── */}
          <FieldGroup label="Data e Hora">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="DatePicker" name="date">
                  <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Mês" name="month">
                  <DatePicker style={{ width: '100%' }} picker="month" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Ano" name="year">
                  <DatePicker style={{ width: '100%' }} picker="year" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Semana" name="week">
                  <DatePicker style={{ width: '100%' }} picker="week" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="RangePicker (datas)" name="dateRange">
                  <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="TimePicker" name="time">
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { DatePicker, TimePicker } from 'antd'

// DatePicker — seleção de data
<Form.Item label="Data de entrada" name="entryDate">
  <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
</Form.Item>

// DatePicker picker="month" — somente mês/ano
<Form.Item label="Mês de referência" name="refMonth">
  <DatePicker style={{ width: '100%' }} picker="month" />
</Form.Item>

// DatePicker picker="year" — somente ano
<Form.Item label="Ano do modelo" name="modelYear">
  <DatePicker style={{ width: '100%' }} picker="year" />
</Form.Item>

// DatePicker picker="week" — semana do ano
<Form.Item label="Semana" name="week">
  <DatePicker style={{ width: '100%' }} picker="week" />
</Form.Item>

// DatePicker.RangePicker — intervalo entre duas datas
<Form.Item label="Período de garantia" name="warrantyPeriod">
  <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
</Form.Item>

// TimePicker — seleção de hora
<Form.Item label="Horário do agendamento" name="appointmentTime">
  <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={15} />
</Form.Item>`} />
          </FieldGroup>

          {/* ── Escolha ────────────────────────────────────── */}
          <FieldGroup label="Escolha">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Checkbox único" name="singleCheck" valuePropName="checked">
                  <Checkbox>Aceito receber notificações</Checkbox>
                </Form.Item>
                <Form.Item label="Checkbox.Group" name="checks">
                  <Checkbox.Group>
                    <Space orientation="vertical">
                      <Checkbox value="oil">Troca de óleo</Checkbox>
                      <Checkbox value="align">Alinhamento</Checkbox>
                      <Checkbox value="brakes">Freios</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Radio.Group" name="radio">
                  <Radio.Group>
                    <Space orientation="vertical">
                      <Radio value="particular">Particular</Radio>
                      <Radio value="empresa">Empresa</Radio>
                      <Radio value="frota">Frota</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Radio Button" name="radioBtn">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="a">Carro</Radio.Button>
                    <Radio.Button value="b">Moto</Radio.Button>
                    <Radio.Button value="c">Caminhão</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item label="Switch" name="urgent" valuePropName="checked">
                  <Switch checkedChildren="Sim" unCheckedChildren="Não" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Rate" name="rating">
                  <Rate />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="ColorPicker" name="color">
                  <ColorPicker />
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { Checkbox, Radio, Switch, Rate, ColorPicker } from 'antd'

// Checkbox único — use valuePropName="checked"
<Form.Item label="Termos" name="terms" valuePropName="checked">
  <Checkbox>Li e aceito os termos de uso</Checkbox>
</Form.Item>

// Checkbox.Group — múltipla escolha com lista de valores
<Form.Item label="Serviços desejados" name="services">
  <Checkbox.Group options={[
    { label: 'Troca de óleo', value: 'oil' },
    { label: 'Alinhamento',   value: 'align' },
    { label: 'Freios',        value: 'brakes' },
  ]} />
</Form.Item>

// Radio.Group — escolha única em lista
<Form.Item label="Tipo de cliente" name="clientType">
  <Radio.Group>
    <Radio value="particular">Particular</Radio>
    <Radio value="empresa">Empresa</Radio>
  </Radio.Group>
</Form.Item>

// Radio.Button — escolha única no estilo botão
<Form.Item label="Tipo de veículo" name="vehicleType">
  <Radio.Group buttonStyle="solid">
    <Radio.Button value="car">Carro</Radio.Button>
    <Radio.Button value="bike">Moto</Radio.Button>
    <Radio.Button value="truck">Caminhão</Radio.Button>
  </Radio.Group>
</Form.Item>

// Switch — booleano ligado/desligado (valuePropName="checked")
<Form.Item label="Urgente" name="urgent" valuePropName="checked">
  <Switch checkedChildren="Sim" unCheckedChildren="Não" />
</Form.Item>

// Rate — avaliação por estrelas
<Form.Item label="Satisfação" name="rating">
  <Rate count={5} />
</Form.Item>

// ColorPicker — seleção de cor
<Form.Item label="Cor da identificação" name="labelColor">
  <ColorPicker />
</Form.Item>`} />
          </FieldGroup>

          {/* ── Upload ─────────────────────────────────────── */}
          <FieldGroup label="Upload">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Upload (botão)" name="uploadBtn" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}>
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Selecionar arquivo</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Upload.Dragger" name="uploadDrag" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}>
                  <Upload.Dragger beforeUpload={() => false} style={{ padding: '8px 0' }}>
                    <p><InboxOutlined style={{ fontSize: 24, color: '#9CA3AF' }} /></p>
                    <p style={{ fontSize: 13, margin: 0 }}>Arraste ou clique para enviar</p>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Row>
            <CodeBlock code={`import { Upload, Button } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

// Upload com botão — sempre use valuePropName + getValueFromEvent
<Form.Item
  label="Foto do veículo"
  name="photo"
  valuePropName="fileList"
  getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
>
  <Upload beforeUpload={() => false} accept="image/*" maxCount={1}>
    <Button icon={<UploadOutlined />}>Selecionar imagem</Button>
  </Upload>
</Form.Item>

// Upload.Dragger — área de arrastar e soltar
<Form.Item
  label="Documentos"
  name="documents"
  valuePropName="fileList"
  getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
>
  <Upload.Dragger beforeUpload={() => false} multiple accept=".pdf,.doc,.docx">
    <p><InboxOutlined style={{ fontSize: 32 }} /></p>
    <p>Arraste arquivos aqui ou clique para selecionar</p>
    <p style={{ color: '#9CA3AF', fontSize: 12 }}>PDF, DOC até 10 MB</p>
  </Upload.Dragger>
</Form.Item>`} />
          </FieldGroup>

          {/* ── Transfer ───────────────────────────────────── */}
          <FieldGroup label="Transfer">
            <Form.Item
              label="Transfer (lista dupla)"
              name="transfer"
              getValueProps={(value) => ({ targetKeys: value ?? [] })}
            >
              <Transfer
                dataSource={[
                  { key: '1', title: 'Troca de óleo' },
                  { key: '2', title: 'Alinhamento' },
                  { key: '3', title: 'Balanceamento' },
                  { key: '4', title: 'Revisão de freios' },
                  { key: '5', title: 'Ar condicionado' },
                ]}
                titles={['Disponíveis', 'Selecionados']}
                render={item => item.title}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <CodeBlock code={`import { Transfer } from 'antd'
import { useState } from 'react'

// Transfer requer estado controlado para targetKeys
function MyForm() {
  const [targetKeys, setTargetKeys] = useState([])

  return (
    <Form>
      <Form.Item label="Serviços incluídos no pacote" name="packageServices">
        <Transfer
          dataSource={[
            { key: '1', title: 'Troca de óleo' },
            { key: '2', title: 'Alinhamento' },
            { key: '3', title: 'Balanceamento' },
            { key: '4', title: 'Revisão de freios' },
          ]}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          titles={['Disponíveis', 'Selecionados']}
          render={(item) => item.title}
          showSearch
          listStyle={{ width: 220, height: 240 }}
        />
      </Form.Item>
    </Form>
  )
}`} />
          </FieldGroup>

        </Form>
      </Section>

      <Divider />

      {/* ── 5. Form completo (interativo) ─────────────────── */}
      <Section
        title="Demo — Agendamento de Serviço"
        description="Formulário completo com validação e exibição do resultado submetido."
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Card title={<><ToolOutlined style={{ marginRight: 8 }} />Novo Agendamento</>}>
              <Form
                form={vehicleForm}
                name="vehicle-service"
                onFinish={handleVehicleSubmit}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Nome do cliente"
                      name="clientName"
                      rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Nome completo" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Telefone"
                      name="phone"
                      rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                      <Input prefix={<PhoneOutlined />} placeholder="(11) 99999-9999" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Placa"
                      name="plate"
                      rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                      <Input prefix={<CarOutlined />} placeholder="ABC-1234" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Data do serviço" name="serviceDate">
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Tipo de serviço"
                  name="serviceType"
                  rules={[{ required: true, message: 'Selecione o serviço' }]}
                >
                  <Select placeholder="Selecione o tipo de serviço">
                    <Option value="oil_change">Troca de óleo</Option>
                    <Option value="alignment">Alinhamento e balanceamento</Option>
                    <Option value="brakes">Revisão de freios</Option>
                    <Option value="ac">Ar condicionado</Option>
                    <Option value="full_revision">Revisão geral</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Observações" name="notes">
                  <TextArea rows={3} placeholder="Descreva o problema ou observações adicionais..." />
                </Form.Item>

                <Form.Item name="urgent" valuePropName="checked">
                  <Checkbox>Atendimento urgente</Checkbox>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Space>
                    <Button type="primary" htmlType="submit">Agendar serviço</Button>
                    <Button onClick={handleVehicleReset}>Limpar</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            {submitResult ? (
              <Card title="Dados submetidos" style={{ background: '#F0FDF4', borderColor: '#86EFAC' }}>
                <Alert
                  title="Agendamento realizado com sucesso!"
                  type="success"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <pre style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  padding: 16,
                  fontSize: 12,
                  overflowX: 'auto',
                }}>
                  {JSON.stringify(submitResult, null, 2)}
                </pre>
              </Card>
            ) : (
              <Card style={{ background: '#F9FAFB', borderColor: '#E5E7EB', height: '100%' }}>
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
                  <ToolOutlined style={{ fontSize: 32, marginBottom: 12, display: 'block' }} />
                  <Text style={{ color: '#9CA3AF' }}>Preencha o formulário e<br />clique em "Agendar serviço"</Text>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </Section>

      <Divider />

      {/* ── 6. Estados desabilitados ──────────────────────── */}
      <Section
        title="Estados — Desabilitado"
        description="Campos desabilitados não permitem edição e ficam visualmente atenuados."
      >
        <Card style={{ maxWidth: 480 }}>
          <Form name="disabled-demo" requiredMark="optional">
            <Form.Item label="Placa (somente leitura)" name="plate">
              <Input value="ABC-1234" disabled prefix={<CarOutlined />} />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Select value="in_progress" disabled>
                <Option value="in_progress">Em andamento</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Notificações" name="notify" valuePropName="checked">
              <Switch disabled defaultChecked />
            </Form.Item>
            <Form.Item>
              <Button type="primary" disabled>Salvar</Button>
            </Form.Item>
          </Form>
        </Card>
      </Section>

      <Divider />

      {/* ── 7. Documentação ───────────────────────────────── */}
      <Section title="Documentação de Uso">
        <Title level={4}>Import</Title>
        <CodeBlock code={`import { Form } from '@/components/Form'
import { Input, Button } from 'antd'`} />

        <Title level={4} style={{ marginTop: 24 }}>Uso básico</Title>
        <CodeBlock code={`const [form] = Form.useForm()

<Form form={form} requiredMark="optional" onFinish={(values) => console.log(values)}>
  <Form.Item
    label="Nome"
    name="name"
    rules={[{ required: true, message: 'Campo obrigatório' }]}
  >
    <Input placeholder="Seu nome" />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">Enviar</Button>
  </Form.Item>
</Form>`} />

        <Title level={4} style={{ marginTop: 24 }}>Props disponíveis</Title>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Prop', 'Tipo', 'Padrão', 'Descrição'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #E5E7EB', color: '#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['variant',    "'default' | 'filled' | 'borderless'", "'default'",  'Estilo visual dos campos'],
                ['layout',     "'vertical' | 'horizontal' | 'inline'", "'vertical'", 'Disposição dos labels'],
                ['form',       'FormInstance',  '—',          'Instância do form (useForm)'],
                ['onFinish',   '(values) => void', '—',        'Callback ao submeter com sucesso'],
                ['onFinishFailed', '({ values, errorFields }) => void', '—', 'Callback ao submeter com erros'],
                ['initialValues', 'object',     '—',          'Valores iniciais dos campos'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', color: '#1677FF' }}>{prop}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: 12, color: '#6B7280' }}>{type}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: 12, color: '#9CA3AF' }}>{def}</td>
                  <td style={{ padding: '10px 16px', color: '#374151' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Title level={4} style={{ marginTop: 24 }}>Acessibilidade</Title>
        <ul style={{ color: '#6B7280', lineHeight: 2 }}>
          <li>Todos os campos possuem <code>label</code> associado via <code>name</code> — relação <code>htmlFor</code> gerada automaticamente.</li>
          <li>Mensagens de erro são anunciadas por leitores de tela via <code>aria-describedby</code>.</li>
          <li>Navegação por teclado funciona nativamente em todos os campos (Tab / Shift+Tab).</li>
          <li>Campos obrigatórios exibem indicador visual e semântico (<code>aria-required</code>).</li>
        </ul>
      </Section>
    </div>
  )
}
