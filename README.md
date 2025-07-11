Here's your `README.md` formatted with Markdown:

-----

# Projeto Frontend - Aplicação de Perguntas e Respostas com IA

## Visão Geral

Este projeto frontend é uma aplicação **React** moderna, construída para fornecer uma interface intuitiva, acessível e responsiva para interação com um backend que processa perguntas e gera respostas usando IA. A interface prioriza a experiência do usuário com design **clean**, comunicação clara e performance otimizada.

-----

## Tecnologias Utilizadas

  * **React 18+**: (functional components + hooks)
  * **TypeScript**: Para tipagem estática e segurança.
  * **Tailwind CSS**: Para estilização utilitária e responsiva.
  * **React Query (TanStack Query)**: Para gerenciamento de estado remoto e cache.
  * **Phosphor / Lucide Icons**: Para ícones vetoriais.
  * **dayjs**: Para manipulação de datas e timestamps.
  * **Framer Motion** (opcional): Para animações sutis.
  * **Vite**: Como bundler e dev server para alta performance.

-----

## Estrutura do Projeto

```
/src
├── /components # Componentes React reutilizáveis (botões, formulários, cards)
├── /hooks      # Custom hooks para lógica de negócio e integração API
├── /http       # Abstração de chamadas API (React Query hooks)
├── /lib        # Bibliotecas utilitárias (ex: dayjs config)
├── /pages      # Páginas e layouts
├── /styles     # Arquivos Tailwind customizados ou CSS adicionais
└── main.tsx    # Entrada da aplicação React
```

-----

## Como Rodar Localmente

### Pré-requisitos

  * Node.js 18 ou superior
  * Yarn ou npm instalado

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND>
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure variáveis de ambiente** conforme `.env.example` (ex: URL do backend).

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Abra o navegador** e acesse `http://localhost:5173`.

-----

## Como Usar

  * **Preencha o formulário** para criar novas salas.
  * **Acompanhe a lista** de salas criadas.
  * **Acesse uma sala** para enviar perguntas.
  * **Veja as respostas** geradas pela IA atualizadas em tempo real.
  * **Likes e visitas** são persistidos no `localStorage` para melhor experiência.

-----

## Boas Práticas Adotadas

  * **Componentização fina** para facilitar manutenção e reutilização.
  * **Código limpo, DRY** e com tipagem completa.
  * Uso de **React Query** para otimizar chamadas API e cache inteligente.
  * **UI acessível** com contraste e hierarquia visual clara.
  * **Responsividade mobile-first** com Tailwind CSS.
  * **Feedback visual consistente** (loading states, animações).
  * **Tratamento robusto de erros** na UI.

-----

## Testes

Atualmente o projeto **não possui testes automatizados**. Recomenda-se implementar testes unitários com Jest e testes de integração com React Testing Library.

-----

## Deploy

Pode ser facilmente deployado em serviços como **Vercel, Netlify** ou qualquer host estático com suporte a SPA.

-----

## Contato

Para dúvidas ou contribuições, favor abrir uma **issue** ou **pull request** no repositório.