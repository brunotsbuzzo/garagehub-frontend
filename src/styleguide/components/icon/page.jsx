import { useState } from 'react'
import {
  Space, Typography, Tag, Table, Alert, Row, Col, Input, Segmented,
  Tooltip, Divider, Badge,
} from 'antd'
import * as AntIcons from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Search } = Input

/* ── Paleta ─────────────────────────────────────────────────── */
const G = {
  50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
  400: '#9CA3AF', 500: '#6B7280', 700: '#374151', 800: '#1F2937',
}
const PRIMARY = '#3DD9A4'

/* ── Catálogo de ícones por categoria ───────────────────────── */
const ICON_CATEGORIES = [
  {
    name: 'Direcional',
    icons: [
      'StepBackwardOutlined','StepForwardOutlined','FastBackwardOutlined','FastForwardOutlined',
      'ShrinkOutlined','ArrowsAltOutlined','DownOutlined','UpOutlined','LeftOutlined',
      'RightOutlined','CaretUpOutlined','CaretDownOutlined','CaretLeftOutlined','CaretRightOutlined',
      'UpCircleOutlined','DownCircleOutlined','LeftCircleOutlined','RightCircleOutlined',
      'DoubleRightOutlined','DoubleLeftOutlined','VerticalLeftOutlined','VerticalRightOutlined',
      'VerticalAlignTopOutlined','VerticalAlignMiddleOutlined','VerticalAlignBottomOutlined',
      'ForwardOutlined','BackwardOutlined','RollbackOutlined','EnterOutlined','RetweetOutlined',
      'SwapOutlined','SwapLeftOutlined','SwapRightOutlined','ArrowUpOutlined','ArrowDownOutlined',
      'ArrowLeftOutlined','ArrowRightOutlined','PlayCircleOutlined','UpSquareOutlined',
      'DownSquareOutlined','LeftSquareOutlined','RightSquareOutlined','LoginOutlined','LogoutOutlined',
      'MenuFoldOutlined','MenuUnfoldOutlined','BorderBottomOutlined','BorderHorizontalOutlined',
      'BorderInnerOutlined','BorderOuterOutlined','BorderLeftOutlined','BorderRightOutlined',
      'BorderTopOutlined','BorderVerticleOutlined','PicCenterOutlined','PicLeftOutlined',
      'PicRightOutlined','RadiusBottomleftOutlined','RadiusBottomrightOutlined',
      'RadiusUpleftOutlined','RadiusUprightOutlined','FullscreenOutlined','FullscreenExitOutlined',
    ],
  },
  {
    name: 'Sugestivo',
    icons: [
      'QuestionOutlined','QuestionCircleOutlined','PlusOutlined','PlusCircleOutlined',
      'PauseOutlined','PauseCircleOutlined','MinusOutlined','MinusCircleOutlined',
      'PlusSquareOutlined','MinusSquareOutlined','InfoOutlined','InfoCircleOutlined',
      'ExclamationOutlined','ExclamationCircleOutlined','CloseOutlined','CloseCircleOutlined',
      'CloseSquareOutlined','CheckOutlined','CheckCircleOutlined','CheckSquareOutlined',
      'ClockCircleOutlined','WarningOutlined','IssuesCloseOutlined','StopOutlined',
      'EditOutlined','FormOutlined','CopyOutlined','ScissorOutlined','DeleteOutlined',
      'SnippetsOutlined','DiffOutlined','HighlightOutlined','AlignCenterOutlined',
      'AlignLeftOutlined','AlignRightOutlined','BgColorsOutlined','BoldOutlined',
      'ItalicOutlined','UnderlineOutlined','StrikethroughOutlined','RedoOutlined',
      'UndoOutlined','ZoomInOutlined','ZoomOutOutlined','FontColorsOutlined',
      'FontSizeOutlined','LineHeightOutlined','DashOutlined','SmallDashOutlined',
      'SortAscendingOutlined','SortDescendingOutlined','DragOutlined','OrderedListOutlined',
      'UnorderedListOutlined','RadiusSettingOutlined','ColumnWidthOutlined','ColumnHeightOutlined',
    ],
  },
  {
    name: 'Dados',
    icons: [
      'AreaChartOutlined','PieChartOutlined','BarChartOutlined','DotChartOutlined',
      'LineChartOutlined','RadarChartOutlined','HeatMapOutlined','FallOutlined',
      'RiseOutlined','StockOutlined','BoxPlotOutlined','FundOutlined',
      'SlidersOutlined','TableOutlined','AppstoreOutlined','AppstoreAddOutlined',
    ],
  },
  {
    name: 'Negócios',
    icons: [
      'AccountBookOutlined','AimOutlined','AlertOutlined','ApartmentOutlined',
      'AuditOutlined','BankOutlined','BarcodeOutlined','BarsOutlined',
      'BellOutlined','BlockOutlined','BookOutlined','BorderOutlined',
      'BranchesOutlined','BuildOutlined','BulbOutlined','CalculatorOutlined',
      'CalendarOutlined','CameraOutlined','CarOutlined','CarryOutOutlined',
      'CiCircleOutlined','CiOutlined','ClearOutlined','ClusterOutlined',
      'CodeOutlined','CodeSandboxOutlined','CoffeeOutlined','CommentOutlined',
      'CompassOutlined','CompressOutlined','ConsoleSqlOutlined','ContactsOutlined',
      'ContainerOutlined','ControlOutlined','CopyrightOutlined','CreditCardOutlined',
      'CustomerServiceOutlined','DashboardOutlined','DatabaseOutlined','DeliveredProcedureOutlined',
      'DeploymentUnitOutlined','DesktopOutlined','DisconnectOutlined','DislikeOutlined',
      'DollarCircleOutlined','DollarOutlined','DownloadOutlined','EllipsisOutlined',
      'EnvironmentOutlined','EuroCircleOutlined','EuroOutlined','ExperimentOutlined',
      'ExportOutlined','EyeOutlined','EyeInvisibleOutlined','FieldBinaryOutlined',
      'FieldNumberOutlined','FieldStringOutlined','FieldTimeOutlined','FileOutlined',
      'FileAddOutlined','FileDoneOutlined','FileExcelOutlined','FileExclamationOutlined',
      'FileGifOutlined','FileImageOutlined','FileJpgOutlined','FileMarkdownOutlined',
      'FilePdfOutlined','FilePptOutlined','FileProtectOutlined','FileSearchOutlined',
      'FileSyncOutlined','FileTextOutlined','FileUnknownOutlined','FileWordOutlined',
      'FileZipOutlined','FilterOutlined','FireOutlined','FlagOutlined',
      'FolderOutlined','FolderAddOutlined','FolderOpenOutlined','FolderViewOutlined',
      'ForkOutlined','FormatPainterOutlined','FrownOutlined','FunctionOutlined',
      'FundProjectionScreenOutlined','FundViewOutlined','GiftOutlined','GlobalOutlined',
      'GoldOutlined','GroupOutlined','HddOutlined','HeartOutlined',
      'HistoryOutlined','HomeOutlined','HourglassOutlined','IdcardOutlined',
      'ImportOutlined','InboxOutlined','InsertRowAboveOutlined','InsertRowBelowOutlined',
      'InsertRowLeftOutlined','InsertRowRightOutlined','InsuranceOutlined','InteractionOutlined',
      'KeyOutlined','LaptopOutlined','LayoutOutlined','LikeOutlined',
      'LinkOutlined','Loading3QuartersOutlined','LoadingOutlined','LockOutlined',
      'MacCommandOutlined','MailOutlined','ManOutlined','MedicineBoxOutlined',
      'MehOutlined','MenuOutlined','MergeCellsOutlined','MessageOutlined',
      'MobileOutlined','MoneyCollectOutlined','MonitorOutlined','MoreOutlined',
      'NodeCollapseOutlined','NodeExpandOutlined','NodeIndexOutlined','NotificationOutlined',
      'NumberOutlined','OneToOneOutlined','PaperClipOutlined','PartitionOutlined',
      'PayCircleOutlined','PercentageOutlined','PhoneOutlined','PictureOutlined',
      'PlaySquareOutlined','PoundCircleOutlined','PoweroffOutlined','PrinterOutlined',
      'ProfileOutlined','ProjectOutlined','PropertySafetyOutlined','PullRequestOutlined',
      'PushpinOutlined','QrcodeOutlined','ReadOutlined','ReconciliationOutlined',
      'RedEnvelopeOutlined','ReloadOutlined','RestOutlined','RobotOutlined',
      'RocketOutlined','RotateLeftOutlined','RotateRightOutlined','SafetyCertificateOutlined',
      'SafetyOutlined','SaveOutlined','ScanOutlined','ScheduleOutlined',
      'SearchOutlined','SecurityScanOutlined','SelectOutlined','SendOutlined',
      'SettingOutlined','ShareAltOutlined','ShoppingCartOutlined','ShoppingOutlined',
      'SisternodeOutlined','SkinOutlined','SmileOutlined','SolutionOutlined',
      'SoundOutlined','SplitCellsOutlined','StarOutlined','SubnodeOutlined',
      'SwitcherOutlined','SyncOutlined','TabletOutlined','TagOutlined',
      'TagsOutlined','TeamOutlined','ThunderboltOutlined','ToTopOutlined',
      'ToolOutlined','TrademarkCircleOutlined','TransactionOutlined','TranslationOutlined',
      'TrophyOutlined','TruckOutlined','UnlockOutlined','UploadOutlined',
      'UsbOutlined','UserOutlined','UserAddOutlined','UserDeleteOutlined',
      'UserSwitchOutlined','UsergroupAddOutlined','UsergroupDeleteOutlined','VideoCameraOutlined',
      'WalletOutlined','WifiOutlined','WomanOutlined',
    ],
  },
  {
    name: 'Logos',
    icons: [
      'AndroidOutlined','AndroidFilled','AppleOutlined','AppleFilled',
      'WindowsOutlined','WindowsFilled','ChromeOutlined','ChromeFilled',
      'GithubOutlined','GithubFilled','AliwangwangOutlined','AliwangwangFilled',
      'DingdingOutlined','WeiboCircleOutlined','WeiboSquareOutlined','FacebookOutlined',
      'DropboxOutlined','DropboxSquareFilled','TwitterOutlined','TwitterCircleFilled',
      'TwitterSquareFilled','SlackOutlined','SlackSquareOutlined','SlackSquareFilled',
      'BehanceOutlined','BehanceSquareOutlined','BehanceSquareFilled',
      'GoogleOutlined','GooglePlusOutlined','LinkedinOutlined','LinkedinFilled',
      'TaobaoCircleOutlined','TaobaoCircleFilled','TaobaoSquareFilled',
      'SkypeOutlined','SkypeFilled','YuqueOutlined','YuqueFilled',
      'AliyunOutlined','AlipayCircleOutlined','AlipayCircleFilled','AlipayOutlined',
      'AntCloudOutlined','AntDesignOutlined','Html5Outlined','Html5Filled',
      'CodepenOutlined','CodepenCircleOutlined','CodepenCircleFilled',
      'RedditOutlined','RedditCircleFilled','RedditSquareFilled',
      'ZhihuOutlined','ZhihuCircleFilled','ZhihuSquareFilled',
      'MediumOutlined','MediumWorkmarkOutlined','GitlabOutlined','GitlabFilled',
      'YahooOutlined','YahooFilled','TikTokOutlined','TikTokFilled',
    ],
  },
]

/* ── Helpers ───────────────────────────────────────────────── */
const Section = ({ title, description, children, id }) => (
  <section id={id} style={{ marginBottom: 56 }}>
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

const CodeBlock = ({ code }) => (
  <pre style={{
    background: '#1E293B',
    borderRadius: '0 0 8px 8px',
    padding: '16px 20px',
    fontSize: 12,
    lineHeight: 1.8,
    overflowX: 'auto',
    color: '#94A3B8',
    margin: 0,
  }}>
    <code>{code}</code>
  </pre>
)

const DemoCard = ({ children, code }) => (
  <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
    <div style={{
      background: G[50], border: 'none',
      borderBottom: `1px solid ${G[200]}`,
      padding: '24px 20px',
    }}>
      {children}
    </div>
    <CodeBlock code={code} />
  </div>
)

/* Grid de ícones clicáveis */
const IconGrid = ({ icons, variant = 'Outlined', color, spin = false }) => {
  const [copied, setCopied] = useState(null)

  const handleCopy = (name) => {
    navigator.clipboard?.writeText(`<${name} />`).catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  const validIcons = icons.filter(name => {
    const resolved = name in AntIcons
    if (!resolved) return false
    const suffix = variant === 'Filled' ? 'Filled' : variant === 'TwoTone' ? 'TwoTone' : 'Outlined'
    return name.endsWith(suffix)
  })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: 8,
    }}>
      {validIcons.slice(0, 60).map(name => {
        const IconComp = AntIcons[name]
        if (!IconComp) return null
        const isCopied = copied === name
        const iconProps = variant === 'TwoTone'
          ? { twoToneColor: color || PRIMARY }
          : color
            ? { style: { color } }
            : {}

        return (
          <Tooltip key={name} title={isCopied ? '✓ Copiado!' : `<${name} />`} mouseEnterDelay={0.3}>
            <div
              onClick={() => handleCopy(name)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 6, padding: '12px 6px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${isCopied ? PRIMARY : 'transparent'}`,
                background: isCopied ? '#EDFCF7' : 'transparent',
                transition: 'all .15s',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                if (!isCopied) e.currentTarget.style.background = G[100]
              }}
              onMouseLeave={e => {
                if (!isCopied) e.currentTarget.style.background = 'transparent'
              }}
            >
              <IconComp
                spin={spin}
                style={{ fontSize: 20, color: color || (isCopied ? PRIMARY : G[700]) }}
                {...(variant === 'TwoTone' ? iconProps : {})}
              />
              <Text style={{
                fontSize: 10, color: G[400], lineHeight: 1.2,
                textAlign: 'center', wordBreak: 'break-all',
                maxWidth: 100,
              }}>
                {name.replace('Outlined', '').replace('Filled', '').replace('TwoTone', '')}
              </Text>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}

/* ── API table ──────────────────────────────────────────────── */
const apiColumns = [
  { title: 'Prop', dataIndex: 'prop', width: 140, render: v => <Text code style={{ color: '#1677FF', fontSize: 12 }}>{v}</Text> },
  { title: 'Tipo', dataIndex: 'type', width: 240, render: v => <Text code style={{ color: '#7C3AED', fontSize: 12 }}>{v}</Text> },
  { title: 'Padrão', dataIndex: 'default', width: 100, render: v => <Text code style={{ color: G[500], fontSize: 12 }}>{v}</Text> },
  { title: 'Descrição', dataIndex: 'description', render: v => <Text style={{ fontSize: 13, color: G[700] }}>{v}</Text> },
]

const apiData = [
  { key: 'style',        prop: 'style',        type: 'CSSProperties',          default: '—',     description: 'Estilos inline, incluindo color e fontSize para tamanho' },
  { key: 'className',    prop: 'className',    type: 'string',                 default: '—',     description: 'Classe CSS customizada' },
  { key: 'spin',         prop: 'spin',         type: 'boolean',                default: 'false', description: 'Rotação contínua — útil para estados de loading' },
  { key: 'rotate',       prop: 'rotate',       type: 'number',                 default: '—',     description: 'Rotação em graus (0–360)' },
  { key: 'twoToneColor', prop: 'twoToneColor', type: 'string | [string, string]', default: '—', description: 'Cor(es) para ícones TwoTone. Aceita cor única ou [primaryColor, secondaryColor]' },
  { key: 'component',    prop: 'component',    type: 'ComponentType<SVGProps>', default: '—',     description: 'SVG customizado como componente React' },
]

/* ── Showcase ──────────────────────────────────────────────── */
export default function IconShowcase() {
  const [variant, setVariant] = useState('Outlined')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Negócios')

  /* filtra o catálogo conforme busca e variante */
  const filteredCategory = ICON_CATEGORIES.find(c => c.name === activeCategory)
  const suffix = variant === 'Filled' ? 'Filled' : variant === 'TwoTone' ? 'TwoTone' : 'Outlined'

  const filteredIcons = (filteredCategory?.icons || []).filter(name => {
    const nameOnly = name.replace('Outlined', '').replace('Filled', '').replace('TwoTone', '').toLowerCase()
    const matchesSearch = !search || nameOnly.includes(search.toLowerCase())
    const matchesSuffix = name.endsWith(suffix) && name in AntIcons
    return matchesSearch && matchesSuffix
  })

  return (
    <div style={{ maxWidth: 900 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <Space size={6} style={{ marginBottom: 12 }}>
          <Tag color="blue" style={{ borderRadius: 4 }}>antd</Tag>
          <Tag color="green" style={{ borderRadius: 4 }}>General</Tag>
          <Tag color="default" style={{ borderRadius: 4 }}>v6</Tag>
        </Space>

        <Title style={{ margin: '0 0 8px', fontSize: 32, color: G[800] }}>Icon</Title>

        <Paragraph style={{ fontSize: 15, color: G[500], margin: '0 0 16px', lineHeight: 1.7 }}>
          Mais de 800 ícones SVG prontos em três variantes: <strong>Outlined</strong>,{' '}
          <strong>Filled</strong> e <strong>TwoTone</strong>. Todos são componentes React
          tree-shakeable — apenas os ícones importados são incluídos no bundle.
        </Paragraph>

        <Alert
          type="info"
          showIcon
          style={{ borderRadius: 8 }}
          message="Clique em qualquer ícone para copiar o JSX"
          description={
            <span>
              Navegue pelas categorias abaixo, filtre por nome e clique no ícone para copiar{' '}
              <Text code>{'<NomeDoIcone />'}</Text> para o clipboard.
            </span>
          }
        />
      </div>

      {/* ── 1. Variantes ────────────────────────────────────── */}
      <Section
        id="variants"
        title="Variantes"
        description="Todos os ícones existem nas três variantes. O sufixo do nome indica o tipo."
      >
        <DemoCard code={`import {
  HomeOutlined,   // Outlined — linha
  HomeFilled,     // Filled — preenchido
  HomeTwoTone,    // TwoTone — duas cores
} from '@ant-design/icons'

<HomeOutlined />
<HomeFilled />
<HomeTwoTone twoToneColor="#3DD9A4" />`}>
          <Space size={40} wrap>
            {[
              { comp: AntIcons.HomeOutlined,  label: 'Outlined', color: G[700] },
              { comp: AntIcons.HomeFilled,    label: 'Filled',   color: G[700] },
              { comp: null,                   label: 'TwoTone',  color: null, twoTone: true },
            ].map(({ comp: Comp, label, color, twoTone }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: G[100], display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 8px',
                }}>
                  {twoTone
                    ? <AntIcons.HomeTwoTone style={{ fontSize: 28 }} twoToneColor={PRIMARY} />
                    : <Comp style={{ fontSize: 28, color }} />
                  }
                </div>
                <Text strong style={{ fontSize: 13, color: G[800], display: 'block' }}>{label}</Text>
                <Text style={{ fontSize: 11, color: G[400] }}>
                  {label === 'TwoTone' ? 'HomeTwoTone' : `Home${label}`}
                </Text>
              </div>
            ))}
          </Space>
        </DemoCard>
      </Section>

      {/* ── 2. Tamanho e cor ────────────────────────────────── */}
      <Section
        id="size-color"
        title="Tamanho e Cor"
        description="Controle tamanho via style.fontSize e cor via style.color (ou twoToneColor para TwoTone)."
      >
        <DemoCard code={`// Tamanhos via fontSize
<CarOutlined style={{ fontSize: 12 }} />
<CarOutlined style={{ fontSize: 20 }} />
<CarOutlined style={{ fontSize: 32 }} />
<CarOutlined style={{ fontSize: 48 }} />

// Cores customizadas
<ToolOutlined style={{ color: '#3DD9A4' }} />
<ToolOutlined style={{ color: '#FAAD14' }} />
<ToolOutlined style={{ color: '#FF4D4F' }} />

// TwoTone com cor customizada
<StarTwoTone twoToneColor="#FAAD14" />
<HeartTwoTone twoToneColor="#FF4D4F" />
<CheckCircleTwoTone twoToneColor="#52C41A" />`}>
          <Space direction="vertical" size={24}>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 12 }}>Tamanhos</Text>
              <Space align="center" size={20}>
                {[12, 20, 32, 48].map(size => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <AntIcons.CarOutlined style={{ fontSize: size, color: G[700] }} />
                    <div style={{ fontSize: 10, color: G[400], marginTop: 4 }}>{size}px</div>
                  </div>
                ))}
              </Space>
            </div>

            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 12 }}>Cores</Text>
              <Space size={16} wrap>
                {[
                  { color: PRIMARY,    label: 'Primary' },
                  { color: '#FAAD14',  label: 'Warning' },
                  { color: '#FF4D4F',  label: 'Error' },
                  { color: '#52C41A',  label: 'Success' },
                  { color: '#1677FF',  label: 'Info' },
                  { color: G[400],     label: 'Muted' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <AntIcons.ToolOutlined style={{ fontSize: 24, color }} />
                    <div style={{ fontSize: 10, color: G[400], marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </Space>
            </div>

            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 12 }}>TwoTone</Text>
              <Space size={16} wrap>
                {[
                  { Comp: AntIcons.StarTwoTone,         color: '#FAAD14', label: 'Star' },
                  { Comp: AntIcons.HeartTwoTone,        color: '#FF4D4F', label: 'Heart' },
                  { Comp: AntIcons.CheckCircleTwoTone,  color: '#52C41A', label: 'Check' },
                  { Comp: AntIcons.ThunderboltTwoTone,  color: '#FAAD14', label: 'Thunder' },
                  { Comp: AntIcons.CrownTwoTone,        color: PRIMARY,   label: 'Crown' },
                  { Comp: AntIcons.SmileTwoTone,        color: PRIMARY,   label: 'Smile' },
                ].map(({ Comp, color, label }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <Comp style={{ fontSize: 24 }} twoToneColor={color} />
                    <div style={{ fontSize: 10, color: G[400], marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </Space>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 3. Spin e Rotate ────────────────────────────────── */}
      <Section
        id="spin-rotate"
        title="Spin e Rotate"
        description="spin anima o ícone em rotação contínua. rotate define uma rotação estática em graus."
      >
        <DemoCard code={`// Loading com spin
<LoadingOutlined spin style={{ fontSize: 24 }} />
<SyncOutlined spin style={{ fontSize: 24, color: '#3DD9A4' }} />
<ReloadOutlined spin style={{ fontSize: 24, color: '#1677FF' }} />

// Rotação estática
<ArrowUpOutlined rotate={45} />   // 45°
<ArrowUpOutlined rotate={90} />   // 90° → aponta para direita
<ArrowUpOutlined rotate={135} />  // 135°
<ArrowUpOutlined rotate={180} />  // 180° → aponta para baixo`}>
          <Space direction="vertical" size={24}>
            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 12 }}>Spin</Text>
              <Space size={24} align="center">
                {[
                  { Comp: AntIcons.LoadingOutlined, color: G[700],   label: 'Loading' },
                  { Comp: AntIcons.SyncOutlined,    color: PRIMARY,   label: 'Sync' },
                  { Comp: AntIcons.ReloadOutlined,  color: '#1677FF', label: 'Reload' },
                  { Comp: AntIcons.SettingOutlined, color: '#FAAD14', label: 'Setting' },
                ].map(({ Comp, color, label }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <Comp spin style={{ fontSize: 28, color }} />
                    <div style={{ fontSize: 10, color: G[400], marginTop: 6 }}>{label}</div>
                  </div>
                ))}
              </Space>
            </div>

            <div>
              <Text style={{ fontSize: 12, color: G[400], display: 'block', marginBottom: 12 }}>Rotate</Text>
              <Space size={20} align="center">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                  <div key={deg} style={{ textAlign: 'center' }}>
                    <AntIcons.ArrowUpOutlined rotate={deg} style={{ fontSize: 22, color: PRIMARY }} />
                    <div style={{ fontSize: 10, color: G[400], marginTop: 6 }}>{deg}°</div>
                  </div>
                ))}
              </Space>
            </div>
          </Space>
        </DemoCard>
      </Section>

      {/* ── 4. SVG customizado ──────────────────────────────── */}
      <Section
        id="custom-svg"
        title="SVG Customizado"
        description="Passe um componente SVG via prop component para usar ícones que não estão no catálogo."
      >
          <DemoCard code={`import Icon from '@ant-design/icons'

// 1. Defina o SVG como componente funcional
const GarageIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M2 20V9l10-7 10 7v11h-6v-5H8v5H2z" />
  </svg>
)

// 2. Use via prop component
<Icon component={GarageIcon} style={{ fontSize: 32, color: '#3DD9A4' }} />
<Icon component={GarageIcon} style={{ fontSize: 32, color: '#1677FF' }} />
<Icon component={GarageIcon} style={{ fontSize: 32, color: '#FF4D4F' }} />

// 3. Iconfont (ícones externos via CDN)
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})
<IconFont type="icon-tuijian" />
<IconFont type="icon-network" />`}>
          <Space size={32} align="center" wrap>
            {[
              { color: PRIMARY,   label: 'Primary' },
              { color: '#1677FF', label: 'Info' },
              { color: '#FF4D4F', label: 'Error' },
              { color: '#FAAD14', label: 'Warning' },
              { color: G[700],    label: 'Default' },
            ].map(({ color, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                }}>
                  {/* Representa um SVG customizado via Icon.component */}
                  <svg viewBox="0 0 24 24" width="28" height="28" fill={color}>
                    <path d="M2 20V9l10-7 10 7v11h-6v-5H8v5H2z" />
                  </svg>
                </div>
                <Text strong style={{ fontSize: 12, color: G[800], display: 'block' }}>{label}</Text>
                <Text code style={{ fontSize: 10, color: G[400] }}>{color}</Text>
              </div>
            ))}
          </Space>
        </DemoCard>
      </Section>

      {/* ── 5. Casos de uso GarageHub ───────────────────────── */}
      <Section
        id="examples"
        title="Ícones no contexto GarageHub"
        description="Ícones recomendados para as principais funcionalidades da plataforma."
      >
        <Row gutter={[12, 12]}>
          {[
            { icon: <AntIcons.CarOutlined />,           label: 'Veículo',      desc: 'CarOutlined' },
            { icon: <AntIcons.ToolOutlined />,          label: 'Serviço',      desc: 'ToolOutlined' },
            { icon: <AntIcons.CalendarOutlined />,      label: 'Agendamento',  desc: 'CalendarOutlined' },
            { icon: <AntIcons.ShopOutlined />,          label: 'Oficina',      desc: 'ShopOutlined' },
            { icon: <AntIcons.DashboardOutlined />,     label: 'Dashboard',    desc: 'DashboardOutlined' },
            { icon: <AntIcons.FileTextOutlined />,      label: 'Ordem serviço',desc: 'FileTextOutlined' },
            { icon: <AntIcons.CheckCircleOutlined />,   label: 'Concluído',    desc: 'CheckCircleOutlined' },
            { icon: <AntIcons.ClockCircleOutlined />,   label: 'Pendente',     desc: 'ClockCircleOutlined' },
            { icon: <AntIcons.ExclamationCircleOutlined />, label: 'Alerta',   desc: 'ExclamationCircleOutlined' },
            { icon: <AntIcons.UserOutlined />,          label: 'Cliente',      desc: 'UserOutlined' },
            { icon: <AntIcons.DollarCircleOutlined />,  label: 'Pagamento',    desc: 'DollarCircleOutlined' },
            { icon: <AntIcons.StarOutlined />,          label: 'Avaliação',    desc: 'StarOutlined' },
          ].map(({ icon, label, desc }) => (
            <Col xs={12} sm={8} md={6} key={label}>
              <div style={{
                border: `1px solid ${G[200]}`, borderRadius: 8,
                padding: '16px 12px', textAlign: 'center',
                background: '#fff',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: '#EDFCF7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', fontSize: 20, color: PRIMARY,
                }}>
                  {icon}
                </div>
                <Text strong style={{ fontSize: 12, color: G[800], display: 'block' }}>{label}</Text>
                <Text style={{ fontSize: 10, color: G[400] }}>{desc}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Section>

      {/* ── 6. Catálogo interativo ──────────────────────────── */}
      <Section
        id="catalog"
        title="Catálogo de Ícones"
        description="Clique em qualquer ícone para copiar o JSX. Filtre por nome ou mude a variante."
      >
        {/* Controls */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          marginBottom: 16, alignItems: 'center',
        }}>
          <Segmented
            value={variant}
            onChange={setVariant}
            options={['Outlined', 'Filled', 'TwoTone']}
          />
          <Search
            placeholder="Filtrar por nome…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 220 }}
            allowClear
          />
          <Badge count={filteredIcons.length} color={PRIMARY} showZero>
            <Tag style={{ margin: 0 }}>resultados</Tag>
          </Badge>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginBottom: 16,
        }}>
          {ICON_CATEGORIES.map(cat => (
            <Tag
              key={cat.name}
              style={{
                cursor: 'pointer',
                borderRadius: 4,
                padding: '2px 10px',
                background: activeCategory === cat.name ? PRIMARY : G[100],
                color: activeCategory === cat.name ? '#fff' : G[700],
                borderColor: activeCategory === cat.name ? PRIMARY : G[200],
                transition: 'all .15s',
                userSelect: 'none',
              }}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </Tag>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          border: `1px solid ${G[200]}`, borderRadius: 8,
          padding: 16, background: '#fff',
          minHeight: 200,
        }}>
          {filteredIcons.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <AntIcons.SearchOutlined style={{ fontSize: 32, color: G[300] }} />
              <Text style={{ display: 'block', color: G[400], marginTop: 8 }}>
                Nenhum ícone encontrado para "{search}"
              </Text>
            </div>
          ) : (
            <IconGrid icons={filteredIcons} variant={variant} />
          )}
        </div>
        <Text style={{ fontSize: 11, color: G[400], marginTop: 8, display: 'block' }}>
          Exibindo até 60 ícones por categoria. Para ver todos, consulte a documentação oficial.
        </Text>
      </Section>

      <Divider style={{ margin: '8px 0 48px' }} />

      {/* ── 7. Import ───────────────────────────────────────── */}
      <Section id="import" title="Como importar">
        <div style={{ border: `1px solid ${G[200]}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '12px 16px', background: G[50], borderBottom: `1px solid ${G[200]}` }}>
            <Text strong style={{ fontSize: 12, color: G[700] }}>Importação individual (recomendado)</Text>
          </div>
          <CodeBlock code={`// Importe apenas os ícones que vai usar — mantém o bundle pequeno
import {
  CarOutlined,
  ToolOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  StarTwoTone,
} from '@ant-design/icons'`} />
        </div>

        <Alert
          type="warning"
          showIcon
          style={{ borderRadius: 8, marginBottom: 24 }}
          message="Evite importação wildcard"
          description={
            <span>
              <Text code>import * as AntIcons from '@ant-design/icons'</Text> importa{' '}
              <strong>todos</strong> os ícones e aumenta significativamente o tamanho do bundle.
              Prefira sempre importações nomeadas.
            </span>
          }
        />
      </Section>

      {/* ── 8. API ──────────────────────────────────────────── */}
      <Section id="api" title="API — Props comuns">
        <Table
          columns={apiColumns}
          dataSource={apiData}
          pagination={false}
          size="small"
          style={{ fontSize: 13 }}
          bordered={false}
        />
      </Section>

      {/* ── 9. Acessibilidade ───────────────────────────────── */}
      <Section id="a11y" title="Acessibilidade">
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {[
            ['Ícone decorativo', 'Se o ícone apenas complementa um texto já visível, adicione aria-hidden="true" para evitar que leitores de tela o anunciem.'],
            ['Ícone funcional', 'Quando o ícone é o único elemento visível (ex: botão somente ícone), forneça aria-label descritivo no elemento pai.'],
            ['Contraste', 'Garanta ao menos 3:1 de contraste entre o ícone e o fundo ao usar tamanhos pequenos (< 18px).'],
            ['spin para loading', 'Adicione aria-live="polite" no contêiner quando usar spin para indicar loading — o AT anunciará a mudança de estado.'],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              background: G[50], borderRadius: 8, border: `1px solid ${G[200]}`,
            }}>
              <Text code style={{ flexShrink: 0, fontSize: 12, color: '#1677FF', whiteSpace: 'nowrap' }}>{title}</Text>
              <Text style={{ fontSize: 13, color: G[700] }}>{desc}</Text>
            </div>
          ))}
        </Space>
      </Section>

    </div>
  )
}
