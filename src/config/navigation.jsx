import {
  DashboardOutlined, CarOutlined, ToolOutlined,
  DollarOutlined, TeamOutlined, BarChartOutlined,
  SettingOutlined, ShopOutlined, UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

// ─── Itens por perfil ─────────────────────────────────────────────────────────
//
// Perfis disponíveis:
//   'admin'      Acesso total
//   'mechanic'   Foco em OS e veículos
//   'attendant'  Foco em clientes e agendamentos
//
// Adicione novos itens aqui. O AppLayout receberá o array filtrado por perfil.

const ITEMS = {
  dashboard: {
    key: '/app/dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/app/dashboard">Dashboard</Link>,
    roles: ['admin', 'mechanic', 'attendant'],
  },

  veiculos: {
    key: 'veiculos',
    icon: <CarOutlined />,
    label: 'Veículos',
    roles: ['admin', 'mechanic', 'attendant'],
    children: [
      { key: '/app/vehicles',     label: <Link to="/app/vehicles">Lista de Veículos</Link> },
      { key: '/app/vehicles/new', label: <Link to="/app/vehicles/new">Cadastrar Veículo</Link> },
    ],
  },

  servicos: {
    key: 'servicos',
    icon: <ToolOutlined />,
    label: 'Ordens de Serviço',
    roles: ['admin', 'mechanic'],
    children: [
      { key: '/app/services',     label: <Link to="/app/services">Todas as OS</Link> },
      { key: '/app/services/new', label: <Link to="/app/services/new">Nova OS</Link> },
    ],
  },

  clientes: {
    key: '/app/customers',
    icon: <TeamOutlined />,
    label: <Link to="/app/customers">Clientes</Link>,
    roles: ['admin', 'attendant'],
  },

  financeiro: {
    key: '/app/billing',
    icon: <DollarOutlined />,
    label: <Link to="/app/billing">Financeiro</Link>,
    roles: ['admin'],
  },

  relatorios: {
    key: '/app/reports',
    icon: <BarChartOutlined />,
    label: <Link to="/app/reports">Relatórios</Link>,
    roles: ['admin'],
  },

  oficina: {
    key: '/app/workshop',
    icon: <ShopOutlined />,
    label: <Link to="/app/workshop">Minha Oficina</Link>,
    roles: ['admin'],
  },

  // ── Separador + itens de conta ────────────────────────────────────────────
  divider: {
    type: 'divider',
    roles: ['admin', 'mechanic', 'attendant'],
  },

  perfil: {
    key: '/app/profile',
    icon: <UserOutlined />,
    label: <Link to="/app/profile">Meu Perfil</Link>,
    roles: ['admin', 'mechanic', 'attendant'],
  },

  configuracoes: {
    key: '/app/settings',
    icon: <SettingOutlined />,
    label: <Link to="/app/settings">Configurações</Link>,
    roles: ['admin'],
  },
}

// ─── Ordem de exibição ────────────────────────────────────────────────────────
const ORDER = [
  'dashboard',
  'veiculos',
  'servicos',
  'clientes',
  'financeiro',
  'relatorios',
  'oficina',
  'divider',
  'perfil',
  'configuracoes',
]

/**
 * getMenuItems(role)
 *
 * Retorna o array de itens de menu filtrado pelo perfil do usuário.
 * Compatível com a prop `items` do antd <Menu />.
 *
 * @param {string} role  'admin' | 'mechanic' | 'attendant'
 * @returns {Array}
 */
export function getMenuItems(role = 'admin') {
  return ORDER
    .map(id => ITEMS[id])
    .filter(item => item.roles?.includes(role))
    .map(({ roles, ...item }) => item)  // remove a prop `roles` antes de passar ao antd
}
