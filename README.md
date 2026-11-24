# Gerador de Contratos — Alluguel Fácil

Aplicação web desenvolvida para automatizar e simplificar a criação de contratos de locação de imóveis da empresa **Alluguel Fácil**.

O sistema permite que os colaboradores realizem a autenticação, preencham formulários com os dados necessários para a elaboração dos contratos e gerem documentos PDF de maneira prática e automatizada.

## Funcionalidades

- Cadastro e autenticação de usuários com Supabase Auth.
- Criação de contratos de locação por meio de formulários.
- Validação de dados utilizando Zod e React Hook Form.
- Geração de contratos em PDF com `@react-pdf/renderer`.
- Pré-visualização dos documentos utilizando `react-pdf`.
- Recuperação de dados administrativos do contrato: usuários demo recebem dados mockados, enquanto usuários administradores recebem dados reais.

## Tecnologias utilizadas

- **Front-end:** Next.js, React, TypeScript e Tailwind CSS.
- **Componentes:** shadcn/ui.
- **Back-end e banco de dados:** Next.js Server Actions e Supabase (PostgreSQL).
- **Autenticação:** Supabase Auth.
- **Formulários e validação:** React Hook Form e Zod.
- **PDF:** @react-pdf/renderer e react-pdf.
- **Testes:** Vitest, React Testing Library e Cypress.
- **Qualidade de código:** ESLint.

## Executando o projeto localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Projeto Supabase configurado.

### 1. Clone o repositório

```bash
git clone https://github.com/Marjorie-Pereira/gerador-contratos-alluguel-facil
cd gerador-contratos-alluguel-facil
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_supabase
```

Utilize as credenciais do seu projeto Supabase.

### 4. Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível em:

http://localhost:3000

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Executa os testes com Vitest |
| `npm run cypress:open` | Abre a interface do Cypress |

## Testes automatizados

O projeto possui testes para:

- Componentes React.
- Schemas de validação.
- Funções utilitárias.
- Fluxos completos da aplicação com Cypress.

## Credenciais de demonstração

Para experimentar a aplicação, utilize a conta de demonstração:

- **E-mail:** `teste@teste.com`
- **Senha:** `Demouser`

## Deploy

O deploy da aplicação está planejado para a plataforma Vercel.

---

Desenvolvido para otimizar o processo de criação de contratos de locação da Alluguel Fácil.
