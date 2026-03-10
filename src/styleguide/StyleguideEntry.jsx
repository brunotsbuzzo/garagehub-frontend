import { Routes, Route, useParams } from 'react-router-dom'
import StyleguideLayout from './Layout'
import StyleguidePage from './page'
import Placeholder from './components/Placeholder'

// General
import ButtonShowcase from './components/button/page'
import FloatButtonShowcase from './components/floatbutton/page'
import IconShowcase from './components/icon/page'
import TypographyShowcase from './components/typography/page'

// Layout
import DividerShowcase from './components/divider/page'
import GridShowcase from './components/grid/page'
import LayoutShowcase from './components/layout/page'
import SpaceShowcase from './components/space/page'

// Navigation
import AnchorShowcase from './components/anchor/page'
import BreadcrumbShowcase from './components/breadcrumb/page'
import DropdownShowcase from './components/dropdown/page'
import MenuShowcase from './components/menu/page'
import PaginationShowcase from './components/pagination/page'
import StepsShowcase from './components/steps/page'

// Data Entry
import AutoCompleteShowcase from './components/autocomplete/page'
import CascaderShowcase from './components/cascader/page'
import CheckboxShowcase from './components/checkbox/page'
import ColorPickerShowcase from './components/colorpicker/page'
import DatePickerShowcase from './components/datepicker/page'
import FormShowcase from './components/form/page'
import InputShowcase from './components/input/page'
import InputNumberShowcase from './components/inputnumber/page'
import MentionsShowcase from './components/mentions/page'
import RadioShowcase from './components/radio/page'
import RateShowcase from './components/rate/page'
import SelectShowcase from './components/select/page'
import SliderShowcase from './components/slider/page'
import SwitchShowcase from './components/switch/page'
import TimePickerShowcase from './components/timepicker/page'
import TransferShowcase from './components/transfer/page'
import TreeSelectShowcase from './components/treeselect/page'
import UploadShowcase from './components/upload/page'

// Data Display
import AvatarShowcase from './components/avatar/page'
import BadgeShowcase from './components/badge/page'
import CalendarShowcase from './components/calendar/page'
import CardShowcase from './components/card/page'
import CarouselShowcase from './components/carousel/page'
import CollapseShowcase from './components/collapse/page'
import DescriptionsShowcase from './components/descriptions/page'
import EmptyShowcase from './components/empty/page'
import ImageShowcase from './components/image/page'
import ListShowcase from './components/list/page'
import PopoverShowcase from './components/popover/page'
import QRCodeShowcase from './components/qrcode/page'
import StatisticShowcase from './components/statistic/page'
import TableShowcase from './components/table/page'
import TabsShowcase from './components/tabs/page'
import TagShowcase from './components/tag/page'
import TimelineShowcase from './components/timeline/page'
import TooltipShowcase from './components/tooltip/page'
import TourShowcase from './components/tour/page'
import TreeShowcase from './components/tree/page'

// Feedback
import AlertShowcase from './components/alert/page'
import DrawerShowcase from './components/drawer/page'
import MessageShowcase from './components/message/page'
import ModalShowcase from './components/modal/page'
import NotificationShowcase from './components/notification/page'
import PopconfirmShowcase from './components/popconfirm/page'
import ProgressShowcase from './components/progress/page'
import ResultShowcase from './components/result/page'
import SkeletonShowcase from './components/skeleton/page'
import SpinShowcase from './components/spin/page'
import WatermarkShowcase from './components/watermark/page'

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

export default function StyleguideEntry() {
  return (
    <Routes>
      <Route
        path="/"
        element={<StyleguideLayout><StyleguidePage /></StyleguideLayout>}
      />
      <Route
        path="/components/:component"
        element={<StyleguideLayout><ComponentPage /></StyleguideLayout>}
      />
    </Routes>
  )
}
