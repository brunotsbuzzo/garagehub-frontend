import { ConfigProvider, theme } from 'antd'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import StyleguideLayout from './styleguide/Layout'
import StyleguidePage from './styleguide/page'
import Placeholder from './styleguide/components/Placeholder'
import { themeConfig } from './theme/themeConfig'
import './index.css'

// General
import ButtonShowcase from './styleguide/components/button/page'
import FloatButtonShowcase from './styleguide/components/floatbutton/page'
import IconShowcase from './styleguide/components/icon/page'
import TypographyShowcase from './styleguide/components/typography/page'

// Layout
import DividerShowcase from './styleguide/components/divider/page'
import GridShowcase from './styleguide/components/grid/page'
import LayoutShowcase from './styleguide/components/layout/page'
import SpaceShowcase from './styleguide/components/space/page'

// Navigation
import AnchorShowcase from './styleguide/components/anchor/page'
import BreadcrumbShowcase from './styleguide/components/breadcrumb/page'
import DropdownShowcase from './styleguide/components/dropdown/page'
import MenuShowcase from './styleguide/components/menu/page'
import PaginationShowcase from './styleguide/components/pagination/page'
import StepsShowcase from './styleguide/components/steps/page'

// Data Entry
import AutoCompleteShowcase from './styleguide/components/autocomplete/page'
import CascaderShowcase from './styleguide/components/cascader/page'
import CheckboxShowcase from './styleguide/components/checkbox/page'
import ColorPickerShowcase from './styleguide/components/colorpicker/page'
import DatePickerShowcase from './styleguide/components/datepicker/page'
import FormShowcase from './styleguide/components/form/page'
import InputShowcase from './styleguide/components/input/page'
import InputNumberShowcase from './styleguide/components/inputnumber/page'
import MentionsShowcase from './styleguide/components/mentions/page'
import RadioShowcase from './styleguide/components/radio/page'
import RateShowcase from './styleguide/components/rate/page'
import SelectShowcase from './styleguide/components/select/page'
import SliderShowcase from './styleguide/components/slider/page'
import SwitchShowcase from './styleguide/components/switch/page'
import TimePickerShowcase from './styleguide/components/timepicker/page'
import TransferShowcase from './styleguide/components/transfer/page'
import TreeSelectShowcase from './styleguide/components/treeselect/page'
import UploadShowcase from './styleguide/components/upload/page'

// Data Display
import AvatarShowcase from './styleguide/components/avatar/page'
import BadgeShowcase from './styleguide/components/badge/page'
import CalendarShowcase from './styleguide/components/calendar/page'
import CardShowcase from './styleguide/components/card/page'
import CarouselShowcase from './styleguide/components/carousel/page'
import CollapseShowcase from './styleguide/components/collapse/page'
import DescriptionsShowcase from './styleguide/components/descriptions/page'
import EmptyShowcase from './styleguide/components/empty/page'
import ImageShowcase from './styleguide/components/image/page'
import ListShowcase from './styleguide/components/list/page'
import PopoverShowcase from './styleguide/components/popover/page'
import QRCodeShowcase from './styleguide/components/qrcode/page'
import StatisticShowcase from './styleguide/components/statistic/page'
import TableShowcase from './styleguide/components/table/page'
import TabsShowcase from './styleguide/components/tabs/page'
import TagShowcase from './styleguide/components/tag/page'
import TimelineShowcase from './styleguide/components/timeline/page'
import TooltipShowcase from './styleguide/components/tooltip/page'
import TourShowcase from './styleguide/components/tour/page'
import TreeShowcase from './styleguide/components/tree/page'

// Feedback
import AlertShowcase from './styleguide/components/alert/page'
import DrawerShowcase from './styleguide/components/drawer/page'
import MessageShowcase from './styleguide/components/message/page'
import ModalShowcase from './styleguide/components/modal/page'
import NotificationShowcase from './styleguide/components/notification/page'
import PopconfirmShowcase from './styleguide/components/popconfirm/page'
import ProgressShowcase from './styleguide/components/progress/page'
import ResultShowcase from './styleguide/components/result/page'
import SkeletonShowcase from './styleguide/components/skeleton/page'
import SpinShowcase from './styleguide/components/spin/page'
import WatermarkShowcase from './styleguide/components/watermark/page'

const componentMap = {
  // General
  button:       ButtonShowcase,
  floatbutton:  FloatButtonShowcase,
  icon:         IconShowcase,
  typography:   TypographyShowcase,
  // Layout
  divider:      DividerShowcase,
  grid:         GridShowcase,
  layout:       LayoutShowcase,
  space:        SpaceShowcase,
  // Navigation
  anchor:       AnchorShowcase,
  breadcrumb:   BreadcrumbShowcase,
  dropdown:     DropdownShowcase,
  menu:         MenuShowcase,
  pagination:   PaginationShowcase,
  steps:        StepsShowcase,
  // Data Entry
  autocomplete: AutoCompleteShowcase,
  cascader:     CascaderShowcase,
  checkbox:     CheckboxShowcase,
  colorpicker:  ColorPickerShowcase,
  datepicker:   DatePickerShowcase,
  form:         FormShowcase,
  input:        InputShowcase,
  inputnumber:  InputNumberShowcase,
  mentions:     MentionsShowcase,
  radio:        RadioShowcase,
  rate:         RateShowcase,
  select:       SelectShowcase,
  slider:       SliderShowcase,
  switch:       SwitchShowcase,
  timepicker:   TimePickerShowcase,
  transfer:     TransferShowcase,
  treeselect:   TreeSelectShowcase,
  upload:       UploadShowcase,
  // Data Display
  avatar:       AvatarShowcase,
  badge:        BadgeShowcase,
  calendar:     CalendarShowcase,
  card:         CardShowcase,
  carousel:     CarouselShowcase,
  collapse:     CollapseShowcase,
  descriptions: DescriptionsShowcase,
  empty:        EmptyShowcase,
  image:        ImageShowcase,
  list:         ListShowcase,
  popover:      PopoverShowcase,
  qrcode:       QRCodeShowcase,
  statistic:    StatisticShowcase,
  table:        TableShowcase,
  tabs:         TabsShowcase,
  tag:          TagShowcase,
  timeline:     TimelineShowcase,
  tooltip:      TooltipShowcase,
  tour:         TourShowcase,
  tree:         TreeShowcase,
  // Feedback
  alert:        AlertShowcase,
  drawer:       DrawerShowcase,
  message:      MessageShowcase,
  modal:        ModalShowcase,
  notification: NotificationShowcase,
  popconfirm:   PopconfirmShowcase,
  progress:     ProgressShowcase,
  result:       ResultShowcase,
  skeleton:     SkeletonShowcase,
  spin:         SpinShowcase,
  watermark:    WatermarkShowcase,
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
        ...themeConfig,
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
