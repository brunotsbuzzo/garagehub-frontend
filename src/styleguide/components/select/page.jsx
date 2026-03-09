import { useState } from 'react'
import { Select, Space, Divider, Typography, Tag, Row, Col } from 'antd'
import { CarOutlined, ToolOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

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

const SelectShowcase = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <Title level={2} style={{ margin: 0 }}>Select</Title>
      <Paragraph style={{ color: G[500], marginTop: 8, fontSize: 15 }}>
        Selector de opções com suporte a busca, múltipla seleção, agrupamentos e opções customizadas.
      </Paragraph>
      <Space size={8}>
        <Tag color="blue">antd v6</Tag>
        <Tag color="default">Entrada de Dados</Tag>
      </Space>
    </div>

    <Section title="Básico" description="Select simples com opções estáticas.">
      <Demo>
        <Space wrap>
          <Select
            style={{ width: 220 }}
            placeholder="Selecione o veículo"
            options={[
              { value: 'civic', label: 'Honda Civic 2022' },
              { value: 'corolla', label: 'Toyota Corolla 2021' },
              { value: 'ka', label: 'Ford Ka 2020' },
              { value: 'gol', label: 'Volkswagen Gol 2019' },
            ]}
          />
          <Select
            style={{ width: 200 }}
            defaultValue="review"
            options={[
              { value: 'oil', label: 'Troca de Óleo' },
              { value: 'review', label: 'Revisão Geral' },
              { value: 'align', label: 'Alinhamento' },
            ]}
          />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Tamanhos" description="Small, Middle (padrão) e Large.">
      <Demo>
        <Space orientation="vertical" size="middle">
          <Select size="small" defaultValue="civic" style={{ width: 220 }}
            options={[{ value: 'civic', label: 'Honda Civic 2022' }]} />
          <Select size="middle" defaultValue="civic" style={{ width: 220 }}
            options={[{ value: 'civic', label: 'Honda Civic 2022' }]} />
          <Select size="large" defaultValue="civic" style={{ width: 220 }}
            options={[{ value: 'civic', label: 'Honda Civic 2022' }]} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Com busca" description="Permite filtrar as opções digitando.">
      <Demo>
        <Select
          showSearch
          style={{ width: 280 }}
          placeholder="Buscar veículo..."
          optionFilterProp="label"
          options={[
            { value: 'civic', label: 'Honda Civic' },
            { value: 'fit', label: 'Honda Fit' },
            { value: 'hrv', label: 'Honda HR-V' },
            { value: 'corolla', label: 'Toyota Corolla' },
            { value: 'yaris', label: 'Toyota Yaris' },
            { value: 'ka', label: 'Ford Ka' },
            { value: 'ranger', label: 'Ford Ranger' },
            { value: 'gol', label: 'Volkswagen Gol' },
            { value: 'polo', label: 'Volkswagen Polo' },
            { value: 'onix', label: 'Chevrolet Onix' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Múltipla seleção" description="Permite selecionar múltiplos valores.">
      <Demo label="Selecione os serviços desejados">
        <Select
          mode="multiple"
          style={{ width: '100%', maxWidth: 500 }}
          placeholder="Selecione serviços..."
          defaultValue={['oil', 'review']}
          options={[
            { value: 'oil', label: 'Troca de Óleo' },
            { value: 'review', label: 'Revisão Geral' },
            { value: 'align', label: 'Alinhamento e Balanceamento' },
            { value: 'tires', label: 'Troca de Pneus' },
            { value: 'brakes', label: 'Freios' },
            { value: 'ac', label: 'Ar Condicionado' },
            { value: 'suspension', label: 'Suspensão' },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Tags (livre)" description="Permite criar novas opções não listadas.">
      <Demo label="Adicione palavras-chave ao veículo">
        <Select
          mode="tags"
          style={{ width: '100%', maxWidth: 450 }}
          placeholder="Digite e pressione Enter para adicionar"
          options={[
            { value: 'revisado', label: 'Revisado' },
            { value: 'documentado', label: 'Documentado' },
            { value: 'ipva-pago', label: 'IPVA Pago' },
          ]}
          defaultValue={['revisado']}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Com agrupamentos" description="Opções organizadas por grupos (OptGroup).">
      <Demo>
        <Select
          style={{ width: 260 }}
          placeholder="Selecione o tipo de serviço"
          options={[
            {
              label: 'Mecânica',
              options: [
                { value: 'oil', label: 'Troca de Óleo' },
                { value: 'review', label: 'Revisão Geral' },
                { value: 'brakes', label: 'Freios' },
                { value: 'suspension', label: 'Suspensão' },
              ],
            },
            {
              label: 'Elétrica',
              options: [
                { value: 'battery', label: 'Bateria' },
                { value: 'alternator', label: 'Alternador' },
                { value: 'injection', label: 'Injeção Eletrônica' },
              ],
            },
            {
              label: 'Estética',
              options: [
                { value: 'wash', label: 'Lavagem' },
                { value: 'polish', label: 'Polimento' },
                { value: 'film', label: 'Película' },
              ],
            },
          ]}
        />
      </Demo>
    </Section>

    <Divider />

    <Section title="Estados" description="Padrão, carregando, desabilitado e com erro.">
      <Demo>
        <Space wrap>
          <Select style={{ width: 200 }} placeholder="Padrão"
            options={[{ value: 'a', label: 'Opção A' }]} />
          <Select style={{ width: 200 }} loading placeholder="Carregando..."
            options={[]} />
          <Select style={{ width: 200 }} disabled defaultValue="a"
            options={[{ value: 'a', label: 'Desabilitado' }]} />
          <Select style={{ width: 200 }} status="error" placeholder="Erro"
            options={[{ value: 'a', label: 'Opção A' }]} />
          <Select style={{ width: 200 }} status="warning" placeholder="Aviso"
            options={[{ value: 'a', label: 'Opção A' }]} />
        </Space>
      </Demo>
    </Section>

    <Divider />

    <Section title="Opções com ícones" description="Customize a renderização de cada opção.">
      <Demo>
        <Select
          style={{ width: 260 }}
          placeholder="Selecione..."
          optionRender={(option) => (
            <Space>
              {option.data.icon}
              {option.data.label}
            </Space>
          )}
          options={[
            { value: 'car', label: 'Carro', icon: <CarOutlined style={{ color: '#3DD9A4' }} /> },
            { value: 'service', label: 'Serviço', icon: <ToolOutlined style={{ color: '#1677FF' }} /> },
          ]}
        />
      </Demo>
    </Section>
  </div>
)

export default SelectShowcase
