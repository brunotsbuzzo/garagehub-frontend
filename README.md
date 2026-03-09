# GarageHub Frontend

Sistema de design e frontend do GarageHub — plataforma que conecta proprietários de veículos com oficinas de qualidade.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| [React](https://react.dev) | 19 | UI |
| [Vite](https://vite.dev) | 7 | Build / Dev server |
| [Ant Design](https://ant.design) | 6 | Componentes de UI |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utilitários CSS |
| [React Router](https://reactrouter.com) | 7 | Roteamento |
| [pnpm](https://pnpm.io) | — | Gerenciador de pacotes |

---

## Pré-requisitos

- **Node.js** ≥ 20.19 (recomendado: use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** instalado globalmente

```bash
npm install -g pnpm
```

---

## Rodar localmente

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd garagehub-frontend

# 2. Instale as dependências
pnpm install

# 3. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:5173](http://localhost:5173) — você será redirecionado para `/styleguide`.

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento com HMR |
| `pnpm build` | Build de produção em `dist/` |
| `pnpm preview` | Pré-visualiza o build de produção localmente |
| `pnpm lint` | Analisa o código com ESLint |

---

## Estrutura do projeto

```
garagehub-frontend/
├── public/                  # Assets estáticos
├── src/
│   ├── styleguide/
│   │   ├── Layout.jsx       # Layout com sidebar (Ant Design Sider)
│   │   ├── navigation.js    # Configuração de rotas da sidebar
│   │   ├── page.jsx         # Página de tokens de design
│   │   └── components/      # Componentes individuais (Prompt 2)
│   ├── App.jsx              # ConfigProvider + BrowserRouter + rotas
│   ├── index.css            # Tokens CSS globais + Tailwind
│   └── main.jsx             # Entry point
├── index.html               # Template HTML (fonte Inter carregada aqui)
├── vite.config.js           # Config Vite (React + Tailwind plugins)
└── package.json
```

---

## Sistema de Design

O design system foi extraído de um layout de dashboard profissional (TeamHub) e adaptado para a identidade GarageHub.

### Tokens principais

| Token | Valor | Descrição |
|---|---|---|
| `colorPrimary` | `#3DD9A4` | Mint Green — cor da marca |
| `borderRadius` | `8px` | Arredondado padrão |
| `fontFamily` | `Inter` | Fonte sans-serif |
| `colorBgLayout` | `#F5FAF7` | Fundo da aplicação |
| `colorBgContainer` | `#FFFFFF` | Fundo dos cards/painéis |

### Escalas de cor

- **Primária (Mint Green):** 10 tons — `primary-50` a `primary-900`
- **Neutros (Gray):** 10 tons — `gray-50` a `gray-900`
- **Semânticas:** Sucesso `#52C41A`, Aviso `#FAAD14`, Erro `#FF4D4F`, Info `#1677FF`

Todos os tokens estão disponíveis como variáveis CSS em `src/index.css` e como tokens do Ant Design via `ConfigProvider` em `src/App.jsx`.

---

## Roteamento

| Rota | Componente | Descrição |
|---|---|---|
| `/styleguide` | `StyleguidePage` | Tokens de design, paleta, tipografia, componentes |
| `/styleguide/components/*` | Componentes individuais |
| `*` | Redirect | Redireciona para `/styleguide` |

---

## Próximos passos

- Adicionar páginas de componentes individuais em `src/styleguide/components/`
- Construir as páginas da aplicação principal
- Configurar TypeScript (`tsconfig.json`)
- Adicionar testes com Vitest

---

## Contribuindo

1. Crie uma branch a partir de `develop`: `git checkout -b feat/nome-da-feature`
2. Faça as alterações e rode `pnpm lint` antes de commitar
3. Abra um Pull Request para `develop`
