# Conecta Cidadão 🏛️

Um protótipo de aplicativo mobile voltado para facilitar o acesso da população aos serviços públicos e assistenciais do Distrito Federal de forma rápida, intuitiva e centralizada.

Acesse o protótipo online: 

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como um trabalho prático para a disciplina de **Laboratório de Inovação**. 

O objetivo central deste repositório é atuar como um **Produto Mínimo Viável (MVP)** com foco exclusivo na **Experiência do Usuário (UX)** e na **Interface do Usuário (UI)**. A aplicação serve para validar fluxos de navegação, clareza da informação e usabilidade, simulando um ambiente real de aplicativo sem a complexidade de uma infraestrutura de back-end no momento inicial.

---

## 🚀 Funcionalidades Simuladas

Por se tratar de um MVP de interface, o aplicativo possui fluxos visuais completos:

* **Autenticação Visual:** Telas de Login, Cadastro e Recuperação de Senha simuladas através de gerenciamento de estado.
* **Mapa Interativo Nativo:** Renderização de um mapa de serviços utilizando a API nativa `Canvas` do HTML5, eliminando a necessidade de chaves de API externas pagas (como Google Maps) nesta fase de validação.
* **Catálogo de Serviços:** Listagem de unidades de saúde, assistência social, jurídica, psicológica e educacional.
* **Guias e Orientações:** Passo a passo detalhado de como acessar direitos e benefícios públicos (ex: Bolsa Família, Assistência Jurídica).
* **Central de Emergência:** Acesso rápido a telefones de utilidade pública (SAMU, Polícia, CVV) com links diretos para discagem.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído priorizando leveza e ausência de dependências desnecessárias:

* **React (v18):** Biblioteca principal para a construção das interfaces e componentização.
* **Vite:** Ferramenta de *build* moderna e ultra-rápida.
* **JavaScript (JSX):** Lógica e estruturação de templates.
* **CSS Inline:** Estilização desenvolvida nativamente, sem uso de frameworks (como Bootstrap ou Tailwind), garantindo total controle sobre os componentes visuais.
* **GitHub Actions & Pages:** Pipeline de CI/CD configurada para compilar e hospedar o aplicativo automaticamente a cada atualização na branch principal.

---

## ⚠️ Limitações do Escopo (Arquitetura do MVP)

Para fins de avaliação técnica, é importante destacar as fronteiras deste protótipo:

1.  **Ausência de Back-end e Banco de Dados:** Todos os dados (usuários, locais, serviços) estão mocados (hardcoded) diretamente no front-end. Alterações como o envio de avaliações não persistem após o recarregamento da página.
2.  **Segurança Simulada:** A autenticação valida apenas o preenchimento dos campos visualmente. Em uma versão de produção, seria implementada uma arquitetura com validação de tokens JWT via servidor.
3.  **Hospedagem Estática:** O deploy foi otimizado para rodar de forma puramente estática no navegador (Client-Side Rendering).

---
