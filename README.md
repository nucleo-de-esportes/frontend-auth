# Frontend Auth - Núcleo de Esportes

Microfrontend centralizado de autenticação para o sistema do Núcleo de Esportes da universidade.

## Descrição

Este projeto centraliza as funcionalidades de login, cadastro e autenticação para todos os tipos de usuários do sistema (admin, aluno, professor). Após o login bem-sucedido, o usuário é automaticamente redirecionado para o frontend apropriado baseado em seu `user_type`.

## Tecnologias Utilizadas

- **React 19** - Biblioteca UI
- **TypeScript 5.7** - Tipagem estática
- **Vite 6** - Build tool e dev server
- **React Router DOM 7** - Roteamento
- **Axios 1.8** - Cliente HTTP com interceptors
- **JWT Decode 4** - Decodificação de tokens
- **Zod 3.24** - Validação de schemas
- **Tailwind CSS 4** - Estilização
- **Material-UI 7** - Componentes UI

## Fluxo de Autenticação

### Login
1. Usuário acessa `/auth/login`
2. Sistema faz POST para `/user/login`
3. Token JWT é salvo no localStorage
4. Token é decodificado para extrair `user_type`
5. Redirecionamento baseado no tipo:
   - `admin` → `/admin/turmas`
   - `aluno` → `/aluno/home`
   - `professor` → `/professor/home`

### Cadastro
1. Usuário acessa `/auth/register`
2. Sistema faz POST para `/user/register`
3. Após sucesso, redireciona para `/auth/login`

## Desenvolvimento

### Instalação
```bash
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:5173/auth/

### Build para produção
```bash
npm run build
```

## Variáveis de Ambiente

Crie um arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

## Deploy

O projeto utiliza GitHub Actions para CI/CD automático. Configure os seguintes secrets:
- `OCI_USER_ID`, `OCI_TENANCY_ID`, `OCI_FINGERPRINT`
- `OCI_API_PRIVATE_KEY`, `OCI_REGION`
- `OCI_BUCKET_NAME_AUTH`, `OCI_NAMESPACE`
- `VITE_API_URL` (variável)

## Integração com Outros Frontends

### Remover páginas de login/cadastro dos outros frontends

### Adicionar redirecionamento para `/auth/login` quando não autenticado

### Copiar interceptor axios para tratamento de 401
