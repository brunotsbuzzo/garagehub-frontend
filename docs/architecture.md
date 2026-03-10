# GarageHub Frontend — Arquitetura

## Índice

1. [Visão geral](#visão-geral)
2. [Estrutura de pastas](#estrutura-de-pastas)
3. [Store — gerenciamento de estado](#store--gerenciamento-de-estado)
4. [Autenticação e sessão](#autenticação-e-sessão)
5. [Consumo de API (axios)](#consumo-de-api-axios)
6. [Navegação por perfil](#navegação-por-perfil)
7. [Layout base (AppLayout)](#layout-base-applayout)
8. [Criando uma nova página](#criando-uma-nova-página)
9. [Styleguide (dev only)](#styleguide-dev-only)
10. [Roteamento](#roteamento)
11. [Design tokens](#design-tokens)

---

## Visão geral

Stack principal:

| Tecnologia     | Versão  | Papel                          |
|----------------|---------|--------------------------------|
| React          | 19      | UI                             |
| Vite           | 7       | Bundler / dev server           |
| Ant Design     | 6       | Biblioteca de componentes      |
| React Router   | 7       | Roteamento                     |
| localStorage   | —       | Persistência de sessão         |

---

## Estrutura de pastas

```
src/
│
├── components/          # Páginas internas do sistema (rotas /app/*)
│   ├── dashboard/
│   │   └── page.jsx
│   ├── vehicles/
│   │   └── page.jsx
│   └── ...              # Uma subpasta por página
│
├── ui/                  # Componentes de layout reutilizáveis
│   ├── AppLayout.jsx    # Layout base (header + sider + content)
│   └── index.js         # Re-exportações
│
├── config/
│   └── navigation.jsx   # Definição dos itens de menu por perfil
│
├── store/
│   └── AuthContext.jsx  # Context de autenticação + persistência no localStorage
│
├── theme/
│   └── themeConfig.js   # Tokens de design (cores, tipografia, espaçamento)
│
└── styleguide/          # ⚠️ Apenas em desenvolvimento — excluído do build
    ├── StyleguideEntry.jsx
    ├── Layout.jsx
    ├── navigation.js
    └── components/      # Showcases de componentes antd
```

---

## Store — gerenciamento de estado

**Pasta:** `src/store/`

O projeto usa **React Context** como solução de estado global — sem bibliotecas externas (sem Redux, sem Zustand). Cada contexto vive em um arquivo próprio dentro de `src/store/` e segue o padrão abaixo.

### Padrão de um store

Todo store é composto por três partes no mesmo arquivo:

```
src/store/MeuContext.jsx
├── 1. Lógica interna (estado, helpers, efeitos)
├── 2. MeuProvider  — componente que fornece o contexto
└── 3. useMeu       — hook que consome o contexto
```

### Estrutura base para criar um novo store

```jsx
// src/store/MeuContext.jsx
import { createContext, useContext, useState } from 'react'

const MeuContext = createContext(null)

export function MeuProvider({ children }) {
  const [dado, setDado] = useState(null)

  const value = {
    dado,
    setDado,
  }

  return (
    <MeuContext.Provider value={value}>
      {children}
    </MeuContext.Provider>
  )
}

export function useMeu() {
  const ctx = useContext(MeuContext)
  if (!ctx) throw new Error('useMeu deve ser usado dentro de <MeuProvider>')
  return ctx
}
```

### Registrando o provider em `App.jsx`

Os providers devem ser aninhados em `App.jsx`, **de fora para dentro** (o mais externo é o mais global):

```jsx
// App.jsx
import { AuthProvider }         from './store/AuthContext'
import { NotificacoesProvider } from './store/NotificacoesContext'

function App() {
  return (
    <AuthProvider>                    {/* ← mais externo = mais global */}
      <NotificacoesProvider>
        <ConfigProvider ...>
          <BrowserRouter>
            ...
          </BrowserRouter>
        </ConfigProvider>
      </NotificacoesProvider>
    </AuthProvider>
  )
}
```

### Usando um store em qualquer componente ou página

```jsx
import { useMeu } from '../../store/MeuContext'

export default function MinhaPagina() {
  const { dado, setDado } = useMeu()
  // ...
}
```

### Stores existentes

| Arquivo                    | Hook          | Responsabilidade                                  |
|----------------------------|---------------|---------------------------------------------------|
| `store/AuthContext.jsx`    | `useAuth`     | Token JWT, dados do usuário, sessão persistente   |

> Ao criar novos stores, adicione uma linha na tabela acima e documente a API do hook na seção correspondente.

### Quando usar store vs estado local

| Situação                                              | Onde colocar         |
|-------------------------------------------------------|----------------------|
| Dado usado em múltiplas páginas (usuário, tema)       | `src/store/`         |
| Dado usado só em uma página (filtro de tabela, modal) | `useState` local     |
| Dado de formulário                                    | `useState` local     |
| Cache de dados da API reutilizados em várias telas    | `src/store/`         |

---

## Autenticação e sessão

**Arquivo:** `src/store/AuthContext.jsx`

### Como funciona

- Os dados de sessão (`token`, `user`, `expiresAt`) são armazenados no `localStorage` com a chave `gh:auth`.
- Na montagem da aplicação, o contexto lê o storage e restaura a sessão automaticamente.
- Um intervalo de 1 minuto verifica se o token expirou. Se sim, a sessão é limpa sem intervenção do usuário.
- O TTL padrão é **8 horas**. Pode ser customizado no `login()`.

### Envolvendo a aplicação

O `AuthProvider` deve envolver todo o app em `src/App.jsx`:

```jsx
import { AuthProvider } from './store/AuthContext'

function App() {
  return (
    <AuthProvider>
      <ConfigProvider ...>
        <BrowserRouter>
          ...
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  )
}
```

### Usando nas páginas

```jsx
import { useAuth } from '../../store/AuthContext'

export default function MinhaPage() {
  const { user, token, isAuth, login, logout, updateUser } = useAuth()

  // Fazer login (chamar após resposta da API)
  login(responseToken, responseUser)

  // Fazer logout
  logout()

  // Atualizar dados do usuário sem re-login
  updateUser({ name: 'Novo Nome' })
}
```

### API do hook `useAuth`

| Propriedade / Método          | Tipo       | Descrição                                          |
|-------------------------------|------------|----------------------------------------------------|
| `user`                        | `object\|null` | Dados do usuário autenticado                  |
| `token`                       | `string\|null` | JWT / token da API                            |
| `isAuth`                      | `boolean`  | `true` se há sessão válida                         |
| `login(token, user, expiresIn?)` | `function` | Salva sessão. `expiresIn` em ms (default 8h)  |
| `logout()`                    | `function` | Limpa sessão do storage e do estado               |
| `updateUser(partial)`         | `function` | Atualiza campos do usuário sem re-login            |

### Estrutura salva no localStorage

```json
{
  "token": "eyJhbGc...",
  "user": {
    "name": "João Dono",
    "email": "joao@garagehub.com.br",
    "role": "admin"
  },
  "expiresAt": 1741650000000
}
```

---

## Consumo de API (axios)

**Arquivo:** `src/services/api.js`

### Como funciona

A instância do axios (`api`) é configurada uma única vez e reutilizada em todo o projeto. Ela:

1. **Injeta o token automaticamente** em toda requisição via interceptor de request — sem precisar passar o header manualmente em nenhum lugar.
2. **Lê o token direto do `localStorage`** (sem depender do `AuthContext`) para evitar dependência circular.
3. **Trata erros globais** no interceptor de response:
   - `401` — sessão expirada: limpa o storage e redireciona para `/login`
   - `403` — acesso negado: loga um aviso, a página trata localmente se necessário
4. **Normaliza erros** — todo erro rejeitado chega ao `catch` com a mesma estrutura `{ message, status, data, originalError }`.

### Configuração da URL base

A URL da API é lida da variável de ambiente `VITE_API_URL`:

```
# .env.local  (não versionado)
VITE_API_URL=http://localhost:3000/api

# Produção: configure no servidor de deploy (Vercel, Railway, etc.)
VITE_API_URL=https://api.garagehub.com.br
```

> Copie `.env.example` para `.env.local` e preencha com a URL da API. O `.env.local` não deve ser commitado.

### Usando nas páginas e componentes

Importe `api` e chame diretamente:

```js
import { api } from '../../services/api'

// GET
const { data } = await api.get('/vehicles')

// POST
const { data } = await api.post('/vehicles', { plate: 'ABC-1234', model: 'Civic' })

// PUT
const { data } = await api.put(`/vehicles/${id}`, { km: 50000 })

// DELETE
await api.delete(`/vehicles/${id}`)
```

### Tratando erros localmente

O interceptor rejeita com um objeto normalizado `{ message, status, data }`:

```jsx
import { api } from '../../services/api'

async function salvarVeiculo(payload) {
  try {
    const { data } = await api.post('/vehicles', payload)
    return data
  } catch (err) {
    // err = { message, status, data, originalError }
    if (err.status === 422) {
      // Validação — exibe erros do formulário
      console.error('Erros de validação:', err.data?.errors)
    } else {
      // Erro genérico — exibe mensagem ao usuário
      message.error(err.message)
    }
  }
}
```

### Usando com `useEffect` em componentes

```jsx
import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    api.get('/vehicles')
      .then(({ data }) => setVehicles(data))
      .catch((err)     => setError(err.message))
      .finally(()      => setLoading(false))
  }, [])

  // ...
}
```

### Estrutura de erro normalizado

Todo erro que sai do interceptor segue esta estrutura:

```js
{
  message:       'Mensagem legível para o usuário',  // string
  status:        422,                                 // number | null
  data:          { errors: { ... } },                 // objeto da API | null
  originalError: AxiosError { ... },                  // erro original do axios
}
```

### Fluxo completo: request → response

```
Componente chama api.get('/rota')
       ↓
Interceptor de REQUEST
  → lê token do localStorage
  → adiciona header: Authorization: Bearer <token>
       ↓
Servidor processa
       ↓
Interceptor de RESPONSE
  → 2xx  → retorna response normalmente
  → 401  → clearSession() + redirect /login
  → 403  → console.warn, repassa erro normalizado
  → 4xx/5xx → repassa erro normalizado
       ↓
Componente recebe data ou entra no catch
```

### Adicionando serviços por domínio (recomendado)

Para organizar chamadas por entidade, crie arquivos em `src/services/`:

```js
// src/services/vehicles.js
import { api } from './api'

export const vehiclesService = {
  list:    ()         => api.get('/vehicles'),
  get:     (id)       => api.get(`/vehicles/${id}`),
  create:  (payload)  => api.post('/vehicles', payload),
  update:  (id, body) => api.put(`/vehicles/${id}`, body),
  remove:  (id)       => api.delete(`/vehicles/${id}`),
}
```

```js
// Uso na página:
import { vehiclesService } from '../../services/vehicles'

const { data } = await vehiclesService.list()
```

---

## Navegação por perfil

**Arquivo:** `src/config/navigation.jsx`

### Perfis disponíveis

| Perfil        | Acesso                                          |
|---------------|-------------------------------------------------|
| `admin`       | Total — todas as páginas                        |
| `mechanic`    | Dashboard, Veículos, Ordens de Serviço, Perfil  |
| `attendant`   | Dashboard, Veículos, Clientes, Perfil           |

### Adicionando um novo item de menu

```jsx
// src/config/navigation.jsx

const ITEMS = {
  // ... itens existentes ...

  meuNovoItem: {
    key: '/app/minha-rota',
    icon: <MeuIcone />,
    label: <Link to="/app/minha-rota">Minha Página</Link>,
    roles: ['admin', 'mechanic'],   // quais perfis podem ver este item
  },
}

// Adicione o ID na ORDER para controlar a posição no menu
const ORDER = [
  'dashboard',
  'veiculos',
  'meuNovoItem',   // ← posição desejada
  ...
]
```

### Usando nas páginas

```jsx
import { getMenuItems } from '../../config/navigation'
import { useAuth } from '../../store/AuthContext'

const { user } = useAuth()

<AppLayout menuItems={getMenuItems(user?.role)} ...>
```

O `getMenuItems(role)` filtra os itens automaticamente com base no perfil do usuário logado. Se `role` for `undefined`, assume `'admin'` como fallback.

---

## Layout base (AppLayout)

**Arquivo:** `src/ui/AppLayout.jsx`

Envolve todas as páginas internas. Contém:

- **Sider**: logo, menu de navegação configurável, botão de colapso
- **Header**: busca global, ajuda, idioma, notificações (com badge), avatar + dropdown do usuário
- **Content**: área de conteúdo com padding padrão

### Props

| Prop                | Tipo            | Default   | Descrição                                         |
|---------------------|-----------------|-----------|---------------------------------------------------|
| `children`          | `ReactNode`     | —         | Conteúdo da página                                |
| `menuItems`         | `Array`         | `[]`      | Itens do menu lateral (formato antd Menu)         |
| `selectedKey`       | `string`        | `pathname`| Chave do item ativo                               |
| `openKeys`          | `string[]`      | —         | Submenus abertos por padrão                       |
| `user`              | `object`        | —         | `{ name, email, role, initials }`                 |
| `notificationCount` | `number`        | `0`       | Badge de notificações                             |
| `onLogout`          | `function`      | —         | Callback ao clicar em Sair                        |
| `onSearch`          | `function`      | —         | Callback da busca global `(value) => void`        |
| `headerExtra`       | `ReactNode`     | —         | Conteúdo extra no lado direito do header          |
| `siderExtra`        | `ReactNode`     | —         | Conteúdo extra no rodapé do sider                 |

---

## Criando uma nova página

### 1. Criar o arquivo da página

```
src/components/minha-pagina/page.jsx
```

```jsx
import { useLocation } from 'react-router-dom'
import { AppLayout } from '../../ui'
import { useAuth } from '../../store/AuthContext'
import { getMenuItems } from '../../config/navigation'

export default function MinhaPagina() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  return (
    <AppLayout
      menuItems={getMenuItems(user?.role)}
      selectedKey={pathname}
      user={user}
      onLogout={logout}
    >
      {/* conteúdo aqui */}
    </AppLayout>
  )
}
```

### 2. Registrar a rota em `App.jsx`

```jsx
import MinhaPagina from './components/minha-pagina/page'

// Dentro de <Routes>:
<Route path="/app/minha-pagina" element={<MinhaPagina />} />
```

### 3. Adicionar ao menu de navegação (se necessário)

Em `src/config/navigation.jsx`, adicione o item em `ITEMS` e inclua o ID na `ORDER`.

---

## Styleguide (dev only)

O styleguide é uma seção exclusiva para desenvolvedores que documenta todos os componentes do design system.

**Acesso em dev:** `http://localhost:5173/styleguide`

**Por que não aparece em produção?**

O `App.jsx` usa um import dinâmico condicional:

```js
const StyleguideEntry = import.meta.env.DEV
  ? lazy(() => import('./styleguide/StyleguideEntry'))
  : null
```

O Vite substitui `import.meta.env.DEV` por `false` no build de produção. O branch morto é eliminado pelo tree-shaker — **nenhum arquivo do styleguide entra no bundle de produção**.

Para verificar:
```bash
pnpm build
# O bundle de produção não conterá nenhuma string do styleguide
```

---

## Roteamento

| Rota                         | Componente         | Acesso       |
|------------------------------|--------------------|--------------|
| `/app/dashboard`             | DashboardPage      | Autenticado  |
| `/app/vehicles`              | —                  | A criar      |
| `/app/services`              | —                  | A criar      |
| `/app/customers`             | —                  | A criar      |
| `/app/billing`               | —                  | A criar      |
| `/app/reports`               | —                  | A criar      |
| `/app/settings`              | —                  | A criar      |
| `/styleguide/*`              | StyleguideEntry    | Dev only     |
| `*`                          | Redirect           | —            |

> **Nota:** rotas não autenticadas (login, esqueci a senha) devem ser adicionadas fora do grupo `/app/*`.

---

## Design tokens

**Arquivo:** `src/theme/themeConfig.js`

Tokens principais:

| Token            | Valor      | Uso                          |
|------------------|------------|------------------------------|
| `colorPrimary`   | `#3DD9A4`  | Cor principal (mint green)   |
| `colorSuccess`   | `#52C41A`  | Sucesso                      |
| `colorWarning`   | `#FAAD14`  | Aviso                        |
| `colorError`     | `#FF4D4F`  | Erro                         |
| `colorInfo`      | `#1677FF`  | Informação                   |
| `colorBgLayout`  | `#F5FAF7`  | Fundo do layout              |
| `borderRadius`   | `6px`      | Arredondamento padrão        |
| `fontFamily`     | `Inter`    | Tipografia                   |

Cores de destaque usadas diretamente no código:

```js
const PRIMARY    = '#3DD9A4'   // mint green
const PRIMARY_DK = '#0E885F'   // dark green (textos, valores)
const PRIMARY_BG = '#EDFCF7'   // fundo suave (badges, cards)
```

Escala de cinza:

```js
const G = {
  50:  '#F9FAFB',   // fundo de seções
  100: '#F3F4F6',   // bordas suaves
  200: '#E5E7EB',   // bordas padrão
  400: '#9CA3AF',   // texto de ajuda / labels
  500: '#6B7280',   // texto secundário
  700: '#374151',   // texto de conteúdo
  800: '#1F2937',   // títulos
}
```
